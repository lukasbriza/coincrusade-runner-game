/* eslint-disable react/function-component-definition */

'use client'

import { Game, Scale, Types, WEBGL } from 'phaser'
import { useEffect, useRef, useState } from 'react'


import { GameStateProvider } from '../context'

const TILE = { width: 90, height: 90 }
const screenSizes = {
  width: 15 * TILE.width,
  height: 7 * TILE.height,
}

const phaserConfig: Types.Core.GameConfig = {
  type: WEBGL,
  scale: {
    mode: Scale.ScaleModes.NONE,
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
      height: parentElement.current.offsetHeight,
    })

    setGame(newGame)

    return () => {
      newGame?.destroy(true, true)
      console.log('🐲 DESTROY 🐲')
    }
  }, [])

  return (
    <GameStateProvider>
      <div ref={parentElement} id="game-container" />
    </GameStateProvider>
  )
}
