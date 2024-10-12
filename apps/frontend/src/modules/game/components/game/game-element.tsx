/* eslint-disable react/function-component-definition */

'use client'

import type { Types } from 'phaser'
import { Game, Scale, WEBGL } from 'phaser'
import { useEffect, useRef, useState } from 'react'

import { GameScene, LoadingScene, TILE_HEIGHT, TILE_WIDTH } from '@/lib/phaser'

import { GameStateProvider } from '../../context'
import { LoadingScreen } from '../loading-screen'
import { SettingsPergamen } from '../settings-pergamen'

import { gameClasses } from './classes'
import { GameUiOverlay, ParentElement } from './styles'

const screenSizes = {
  width: 15 * TILE_WIDTH,
  height: 7 * TILE_HEIGHT,
}

const phaserConfig: Types.Core.GameConfig = {
  type: WEBGL,
  scale: {
    mode: Scale.ScaleModes.FIT,
    width: screenSizes.width,
    height: screenSizes.height,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  autoFocus: true,
  scene: [LoadingScene, GameScene],
}

export default function GameElement() {
  const parentElement = useRef<HTMLDivElement>(null)
  const [, setGame] = useState<Game | null>(null)

  useEffect(() => {
    if (!parentElement.current) {
      return
    }

    const newGame = new Game({
      ...phaserConfig,
      parent: parentElement.current,
      width: parentElement.current.offsetWidth,
    })

    setGame(newGame)

    return () => {
      newGame?.destroy(true, true)
      console.log('🐲 DESTROY 🐲')
    }
  }, [])

  return (
    <GameStateProvider>
      <GameUiOverlay className={gameClasses.gameUiOverlay}>
        <SettingsPergamen />
      </GameUiOverlay>
      <ParentElement ref={parentElement} />
      <LoadingScreen />
    </GameStateProvider>
  )
}
