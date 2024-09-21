/* eslint-disable react/jsx-no-useless-fragment */

'use client'

import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'

import { EventBus, EventBusEvents } from '@/lib/phaser'
import { gameRestartListener } from '@/lib/phaser/events'
import { getGameStateContext, initGameStateContext } from '@/lib/phaser/singletons'
import { useGameConfiguration } from '@/shared/components'

const GameStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { config } = useGameConfiguration()

  useEffect(() => {
    // INIT SINGLETON
    initGameStateContext(config)
    const stateSingleton = getGameStateContext()
    // GAME END ACTIONS
    EventBus.on(EventBusEvents.EndGame, () => console.log('endgame'))
    gameRestartListener(stateSingleton.reset)

    EventBus.on(EventBusEvents.LoadConfiguration, () => {
      EventBus.emit(EventBusEvents.LoadConfigurationCallback, config)
    })

    EventBus.emit(EventBusEvents.GameStateInitialization)

    return () => {
      EventBus.removeAllListeners()
    }
  }, [config])

  return <>{children}</>
}

export default GameStateProvider
