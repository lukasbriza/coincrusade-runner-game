'use client'

/* eslint-disable react/jsx-no-useless-fragment */

import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'

import { EventBus, EventBusEvents } from '@/lib/phaser'
import {
  gamePauseListener,
  gameRestartEmiter,
  gameRestartListener,
  gameResumeEmiter,
  loadConfigurationCallbackEmiter,
  loadConfigurationEmiter,
  loadConfigurationListener,
  loadProgressListener,
} from '@/lib/phaser/events'
import { getGameStateContext, initGameStateContext } from '@/lib/phaser/singletons'
import { useGameConfiguration } from '@/shared/components'

import { hideGameUIOverlay, showGameUiOverlay } from './animation'
import {
  GAME_PAUSE_EVENT,
  GAME_RESTART_EVENT,
  GAME_RESUME_EVENT,
  LOAD_ANIMATION_END_EVENT,
  LOAD_END_EVENT,
  LOAD_PROGRESS_EVENT,
  LOAD_START_EVENT,
} from './constants'

const pauseGameHandler = () => {
  showGameUiOverlay()
  window.dispatchEvent(new Event(GAME_PAUSE_EVENT))
}

const resumeGameHandler = () => {
  hideGameUIOverlay()
  gameResumeEmiter()
}

const restartGameHandler = () => {
  hideGameUIOverlay()
  gameRestartEmiter()
}

const handleLoadProgress = (progress: number) => {
  window.dispatchEvent(new CustomEvent(LOAD_PROGRESS_EVENT, { detail: { progress } }))
  if (progress === 0) {
    window.dispatchEvent(new Event(LOAD_START_EVENT))
  }
  if (progress === 1) {
    window.dispatchEvent(new Event(LOAD_END_EVENT))
  }
}

export const GameStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { config } = useGameConfiguration()

  useEffect(() => {
    // GAME LOADING
    loadProgressListener(handleLoadProgress)
    window.addEventListener(LOAD_ANIMATION_END_EVENT, loadConfigurationEmiter)
    // INIT SINGLETON
    initGameStateContext(config)
    const stateSingleton = getGameStateContext()

    // GAME ACTIONS
    EventBus.on(EventBusEvents.EndGame, () => console.log('endgame'))
    gameRestartListener(stateSingleton.reset)
    loadConfigurationListener(() => {
      loadConfigurationCallbackEmiter(config)
    })
    gamePauseListener(pauseGameHandler)
    window.addEventListener(GAME_RESTART_EVENT, restartGameHandler)
    window.addEventListener(GAME_RESUME_EVENT, resumeGameHandler)
    return () => {
      EventBus.removeAllListeners()
      window.removeEventListener(GAME_RESTART_EVENT, restartGameHandler)
      window.removeEventListener(GAME_RESUME_EVENT, resumeGameHandler)
      window.removeEventListener(LOAD_ANIMATION_END_EVENT, loadConfigurationEmiter)
    }
  }, [config])

  return <>{children}</>
}
