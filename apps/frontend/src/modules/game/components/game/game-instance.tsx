'use client'

import { Game } from 'phaser'
import { useLayoutEffect, useRef } from 'react'

import { usePathname } from '@/i18n/routing'
import { routes } from '@/shared'

import { GameStateProvider } from '../../context/game-state-context'

import { gameConfig } from './game-config'
import { ParentElement } from './styles'

export const GameInstance = () => {
  const game = useRef<Phaser.Game | null>(null)
  const path = usePathname()

  useLayoutEffect(() => {
    if (path === routes.game) {
      const startGame = (parent: HTMLDivElement) => new Game({ ...gameConfig, parent, width: parent.offsetWidth })
      // eslint-disable-next-line unicorn/prefer-query-selector
      const parent = document.getElementById('game-container')

      if (!parent) {
        return
      }

      if (game.current === null) {
        game.current = startGame(parent as HTMLDivElement)
      }

      if (parent.children.length === 0) {
        parent.append(game.current.context.canvas as Node)
      }
    }
  }, [path])

  return (
    <GameStateProvider>
      <ParentElement id="game-container" />
    </GameStateProvider>
  )
}
