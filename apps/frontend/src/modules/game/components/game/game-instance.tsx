'use client'

import { usePathname } from 'next/navigation'
import { Game } from 'phaser'
import { useLayoutEffect, useRef } from 'react'

import { useCurrentLocale } from '@/i18n/client'
import { routes } from '@/shared'

import { GameStateProvider } from '../../context/game-state-context'

import { gameConfig } from './game-config'
import { ParentElement } from './styles'

export const GameInstance = () => {
  const game = useRef<Phaser.Game | null>(null)
  const path = usePathname()
  const locale = useCurrentLocale()

  useLayoutEffect(() => {
    if (path === `/${locale}${routes.game}`) {
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
  }, [locale, path])

  return (
    <GameStateProvider>
      <ParentElement id="game-container" />
    </GameStateProvider>
  )
}
