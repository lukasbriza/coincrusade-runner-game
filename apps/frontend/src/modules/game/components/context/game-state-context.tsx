/* eslint-disable react/jsx-no-useless-fragment */

'use client'

import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'

import { EventBus, EventBusEvents } from '@/lib/phaser'
import { gameRestartListener, loadConfigurationCallbackEmiter, loadConfigurationListener } from '@/lib/phaser/events'
import { getGameStateContext, initGameStateContext } from '@/lib/phaser/singletons'
import { useGameConfiguration } from '@/shared/components'

export const GameStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { config } = useGameConfiguration()

  useEffect(() => {
    // INIT SINGLETON
    initGameStateContext(config)
    const stateSingleton = getGameStateContext()
    // GAME END ACTIONS
    EventBus.on(EventBusEvents.EndGame, () => console.log('endgame'))

    gameRestartListener(stateSingleton.reset)

    loadConfigurationListener(() => {
      loadConfigurationCallbackEmiter(config)
    })

    return () => {
      EventBus.removeAllListeners()
    }
  }, [config])

  return <>{children}</>
}
