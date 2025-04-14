'use client'

/* eslint-disable react/jsx-no-useless-fragment */

import { useRouter } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'

import { EventBus } from '@/lib/phaser'
import {
  gameEndEmiter,
  gameEndListener,
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
import { GAME_INITIATED_STORAGE_KEY, routes } from '@/shared'
import { useGameConfiguration } from '@/shared/context'
import { setItem } from '@/utils'

import {
  GAME_PAUSE_EVENT,
  GAME_QUIT_EVENT,
  GAME_RESTART_EVENT,
  GAME_RESUME_EVENT,
  LOAD_ANIMATION_END_EVENT,
  LOAD_END_EVENT,
  LOAD_PROGRESS_EVENT,
  LOAD_START_EVENT,
} from '../constants'

import { hideGameUIOverlay, showGameUiOverlay } from './animation'

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
  const router = useRouter()

  const endGameHandler = () => {
    setItem(GAME_INITIATED_STORAGE_KEY, 'true')
    router.push(routes.home)
  }

  useEffect(() => {
    // GAME LOADING
    loadProgressListener(handleLoadProgress)
    window.addEventListener(LOAD_ANIMATION_END_EVENT, loadConfigurationEmiter)
    // INIT SINGLETON
    initGameStateContext(config)

    // GAME ACTIONS
    gameEndListener(endGameHandler)
    gameRestartListener(() => {
      const stateSingleton = getGameStateContext()
      stateSingleton.reset()
    })
    loadConfigurationListener(() => {
      loadConfigurationCallbackEmiter(config)
    })
    gamePauseListener(pauseGameHandler)
    window.addEventListener(GAME_RESTART_EVENT, restartGameHandler)
    window.addEventListener(GAME_RESUME_EVENT, resumeGameHandler)
    window.addEventListener(GAME_QUIT_EVENT, gameEndEmiter)
    return () => {
      EventBus.removeAllListeners()
      window.removeEventListener(GAME_RESTART_EVENT, restartGameHandler)
      window.removeEventListener(GAME_RESUME_EVENT, resumeGameHandler)
      window.removeEventListener(LOAD_ANIMATION_END_EVENT, loadConfigurationEmiter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initGameStateContext(config)
  }, [config])

  return <>{children}</>
}
