'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Text } from '@lukasbriza/components'
import { useRouter } from 'next/navigation'
import type { FC, MouseEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useCurrentLocale, useScopedI18n } from '@/i18n/client'
import { getSocketContext } from '@/lib/socket-io'
import { engines, routes } from '@/shared'
import { Arrow, MobileVerificationSnackbar, Pergamen, SocketSnackbar } from '@/shared/components'
import { useGameConfiguration, useSnackbarContext } from '@/shared/context'
import { isMobile } from '@/utils'

import { useApertureContext } from '../../context'
import { EngineSettingsModal } from '../engine-settings-modal'

import { fadeInText, fadeOffText, hideArrows, minimizeScroll, showArrows, unminimizeScroll } from './animation'
import { engineSelectorClasses } from './classes'
import { ContentText, PergamenContentRoot, Root } from './styles'

export const EngineSelector: FC = () => {
  const pergamen = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const locale = useCurrentLocale()

  const { loaded } = useApertureContext()
  const { changeGenerator } = useGameConfiguration()
  const { addSnackbar } = useSnackbarContext()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [rolled, setRolled] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [selectedEngine, setSelectedEngine] = useState<number>(0)
  const t = useScopedI18n('home')
  const tSnackbar = useScopedI18n('snackbars')

  const handleSettingsModal = () => setSettingsOpen((state) => !state)

  const startGame = () => {
    // GAME NOT SUPPORTED ON MOBILE DEVICES
    if (isMobile()) {
      addSnackbar(<MobileVerificationSnackbar />)
      return
    }

    // VERIFY IF SOCKET IS CONNECTED
    const socketContext = getSocketContext()
    if (!socketContext?.socket?.connected) {
      addSnackbar(<SocketSnackbar message={tSnackbar('serverConnectionError')} />)
      return
    }

    router.push(`/${locale}${routes.game}`)
  }

  const handleLeftclick = () =>
    fadeOffText(() => {
      if (!rolled && selectedEngine > 0) {
        setRolled(true)
        setSelectedEngine((value) => value - 1)
      }
    })

  const handleRightClick = () =>
    fadeOffText(() => {
      if (!rolled && selectedEngine < engines.length - 1) {
        setRolled(true)
        setSelectedEngine((value) => value + 1)
      }
    })

  const animationStateChangeHandler = (endedInScrolledState: boolean) => {
    if (minimized && endedInScrolledState && pergamen.current && root.current) {
      minimizeScroll({ pergamen: pergamen.current, root: root.current })
      return
    }
    if (endedInScrolledState) {
      setRolled(false)
    }
    if (!endedInScrolledState) {
      fadeInText()
    }
  }

  const handlePergamenMinimizeAnimation = () => {
    setMinimized(true)
    hideArrows()
    fadeOffText(() => setRolled(true))
  }

  const handleUnminimizePergamen: MouseEventHandler = (event) => {
    const tag = (event.target as Element).tagName
    if (minimized && tag === 'IMG' && pergamen.current && root.current) {
      unminimizeScroll({ pergamen: pergamen.current, root: root.current }, () => {
        setMinimized(false)
        showArrows(selectedEngine)
        setRolled(false)
      })
    }
  }

  useEffect(() => {
    changeGenerator(engines[selectedEngine])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEngine])

  return (
    <Root ref={root} className={engineSelectorClasses.root} ownerState={{ render: loaded, minimized }}>
      <Arrow
        animated
        className={engineSelectorClasses.leftArrow}
        height={70}
        left
        show={selectedEngine !== 0}
        sizes="(max-width: 498px) 41px, 56px"
        width={70}
        onClick={handleLeftclick}
      />
      <Pergamen
        ref={pergamen}
        allowAdjustment={!minimized}
        bottomSizes="(max-width: 676px) calc(60vw + 40px), 580px"
        className={minimized ? engineSelectorClasses.pergamen : undefined}
        closePergamen={handlePergamenMinimizeAnimation}
        defaultPosition="unrolled"
        pergamenSizes="(max-width: 676px) 60vw, 500px"
        rolled={rolled}
        topSizes="(max-width: 676px) calc(60vw + 40px), 580px"
        onAnimationStateChange={animationStateChangeHandler}
        onClick={handleUnminimizePergamen}
      >
        <PergamenContentRoot className={engineSelectorClasses.content}>
          <Text className={engineSelectorClasses.header} paddingBottom={2} variant="h3">
            {t(`engines.${engines[selectedEngine]}.header` as any)}
          </Text>
          <ContentText className={engineSelectorClasses.text} variant="M">
            {t(`engines.${engines[selectedEngine]}.content` as any)}
          </ContentText>
          <Button className={engineSelectorClasses.playButton} text={t('engines.button')} onClick={startGame} />
          <Button
            className={engineSelectorClasses.configButton}
            text={t('engines.config')}
            onClick={handleSettingsModal}
          />
        </PergamenContentRoot>
      </Pergamen>
      <Arrow
        animated
        className={engineSelectorClasses.rightArrow}
        height={70}
        show={selectedEngine !== engines.length - 1}
        sizes="(max-width: 498px) 41px, 56px"
        width={70}
        onClick={handleRightClick}
      />
      <EngineSettingsModal open={settingsOpen} onClose={handleSettingsModal} />
    </Root>
  )
}
