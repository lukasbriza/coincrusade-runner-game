'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { EventBus, EventBusEvents } from '@/lib/phaser'

const GameElement: FC = () => {
  useEffect(() => {
    EventBus.emit(EventBusEvents.GameElementInitialization)
  }, [])

  return <div id="game-container" />
}

export default GameElement
