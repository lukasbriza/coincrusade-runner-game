/* eslint-disable @typescript-eslint/no-floating-promises */

'use client'

import { Button } from '@lukasbriza/components'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState, type FC } from 'react'

import { useRouter } from '@/i18n/routing'
import { routes } from '@/shared'
import { Pergamen } from '@/shared/components'

import { GAME_PAUSE_EVENT, GAME_RESTART_EVENT, GAME_RESUME_EVENT } from '../../constants'

import { fadeIn, fadeOff } from './animation'
import { settingsPergamen } from './classes'
import { Root, SettingsPergamenContent } from './styles'

enum ACTION {
  RESTART = 'restart',
  RESUME = 'resume',
}

export const SettingsPergamen: FC = () => {
  const [show, setShow] = useState(false)
  const [action, setAction] = useState<ACTION | null>(null)
  const [rolled, setRolled] = useState<boolean>(true)
  const content = useRef<HTMLDivElement>(null)
  const pergamen = useRef<HTMLDivElement>(null)
  const t = useTranslations('game.settinngsPergamen')
  const router = useRouter()

  const showElement = () => setShow(true)
  const showPergamenContent = () => fadeIn(content.current)
  const closePergamen = () => fadeOff(content.current).then(() => setRolled(true))
  const openPergamen = () => fadeIn(pergamen.current).then(() => setRolled(false))

  const handleRestart = () => {
    if (content.current) {
      closePergamen()
      setAction(ACTION.RESTART)
    }
  }

  const handleResume = () => {
    if (content.current) {
      closePergamen()
      setAction(ACTION.RESUME)
    }
  }

  const handleQuit = () => {
    setShow(false)
    router.push(routes.home)
  }

  const resolveAction = useCallback(
    (rolled: boolean) => {
      // OPEN LOGIC END
      if (!rolled && content.current) {
        showPergamenContent()
        return
      }

      // CLOSE LOGIC END
      if (rolled && pergamen.current) {
        fadeOff(pergamen.current).then(() => {
          setShow(false)
          setAction(null)
          if (action === ACTION.RESTART) {
            window.dispatchEvent(new Event(GAME_RESTART_EVENT))
          }
          if (action === ACTION.RESUME) {
            window.dispatchEvent(new Event(GAME_RESUME_EVENT))
          }
        })
      }
    },
    [action],
  )

  useEffect(() => {
    window.addEventListener(GAME_PAUSE_EVENT, showElement)

    return () => {
      window.removeEventListener(GAME_PAUSE_EVENT, showElement)
    }
  }, [])

  useEffect(() => {
    if (show && pergamen.current) {
      openPergamen()
    }
  }, [show])

  if (!show) {
    return null
  }

  return (
    <Root>
      <Pergamen
        ref={pergamen}
        className={settingsPergamen.root}
        defaultPosition="rolled"
        rolled={rolled}
        onAnimationStateChange={resolveAction}
      >
        <SettingsPergamenContent ref={content}>
          <Button text={t('resume')} onClick={handleResume} />
          <Button text={t('restart')} onClick={handleRestart} />
          <Button text={t('quit')} onClick={handleQuit} />
        </SettingsPergamenContent>
      </Pergamen>
    </Root>
  )
}
