'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Text } from '@lukasbriza/components'
import { useTranslations } from 'next-intl'
import type { FC, MouseEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useRouter } from '@/i18n/routing'
import { engines, routes } from '@/shared'
import { Arrow, Pergamen } from '@/shared/components'
import { useGameConfiguration } from '@/shared/components/context'

import { useApertureContext } from '../context'
import { EngineSettingsModal } from '../engine-settings-modal'

import { fadeInText, fadeOffText, hideArrows, minimizeScroll, showArrows, unminimizeScroll } from './animation'
import { engineSelectorClasses } from './classes'
import { PergamenContentRoot, Root } from './styles'

export const EngineSelector: FC = () => {
  const pergamen = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { loaded } = useApertureContext()
  const { changeGenerator } = useGameConfiguration()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [rolled, setRolled] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [selectedEngine, setSelectedEngine] = useState<number>(0)
  const t = useTranslations('home')

  const handleSettingsModal = () => setSettingsOpen((state) => !state)

  const startGame = () => {
    router.push(routes.game)
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
        width={70}
        onClick={handleLeftclick}
      />
      <Pergamen
        ref={pergamen}
        allowAdjustment={!minimized}
        className={minimized ? engineSelectorClasses.pergamen : undefined}
        closePergamen={handlePergamenMinimizeAnimation}
        defaultPosition="unrolled"
        rolled={rolled}
        onAnimationStateChange={animationStateChangeHandler}
        onClick={handleUnminimizePergamen}
      >
        <PergamenContentRoot className={engineSelectorClasses.content}>
          <Text className={engineSelectorClasses.header} paddingBottom={2} variant="h3">
            {t(`engines.${engines[selectedEngine]}.header` as any)}
          </Text>
          <Text className={engineSelectorClasses.text} variant="h4">
            {t(`engines.${engines[selectedEngine]}.content` as any)}
          </Text>
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
        width={70}
        onClick={handleRightClick}
      />
      <EngineSettingsModal open={settingsOpen} onClose={handleSettingsModal} />
    </Root>
  )
}
