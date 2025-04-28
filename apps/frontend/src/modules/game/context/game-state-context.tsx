'use client'

/* eslint-disable react/jsx-no-useless-fragment */

import { usePathname, useRouter } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'

import { useCurrentLocale } from '@/i18n/client'
import { EventBus } from '@/lib/phaser'
import {
  EventBusEvents,
  gameEndEmiter,
  gameEndListener,
  gamePauseEmiter,
  gamePauseListener,
  gameRestartEmiter,
  gameRestartListener,
  gameResumeEmiter,
  loadConfigurationCallbackEmiter,
  loadConfigurationEmiter,
  loadConfigurationListener,
  loadProgressListener,
  saveLogsListener,
} from '@/lib/phaser/events'
import { getGameStateContext, initGameStateContext } from '@/lib/phaser/singletons'
import type { SaveGameLogsDto } from '@/lib/socket-io'
import { getSocketContext } from '@/lib/socket-io'
import { SOCKET_EVENTS } from '@/lib/socket-io/events'
import { GAME_INITIATED_STORAGE_KEY, routes, useRouteChange } from '@/shared'
import { SocketSnackbar } from '@/shared/components'
import { useGameConfiguration, useSnackbarContext } from '@/shared/context'
import { setItem } from '@/utils'

import {
  ADD_SNACKBAR_EVENT,
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

// OUTER METHODS
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

const socketErrorCalback = () => {
  gameEndEmiter()
  gamePauseEmiter()
  const stateSingleton = getGameStateContext()
  stateSingleton.reset()
}

const saveLogsHandler = (request: SaveGameLogsDto) => {
  const socketContext = getSocketContext()
  if (socketContext?.socket?.connected) {
    socketContext.socket.emit('game-log-save', request)
  }
}

// COMPONENT
export const GameStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { config } = useGameConfiguration()
  const locale = useCurrentLocale()
  const { addSnackbar } = useSnackbarContext()
  const navigation = useRouter()
  const path = usePathname()

  useRouteChange((path, previousPath) => {
    if (previousPath === `/${locale}${routes.game}`) {
      const stateSingleton = getGameStateContext()
      stateSingleton.reset()
      gameEndEmiter()
      gamePauseEmiter()
    }
  })

  const endGameHandler = () => {
    setItem(GAME_INITIATED_STORAGE_KEY, 'true')
    navigation.push(routes.home)
  }

  const prematureGameEndHandler = () => {
    navigation.push(routes.home)
  }

  const addSnackbarHandler = (event: Event) => {
    addSnackbar(<SocketSnackbar message={(event as CustomEvent).detail as string} />)
  }

  useEffect(() => {
    // SOCKET
    const connectErrorHandler = () => {
      if (path === `/${locale}${routes.game}`) {
        socketErrorCalback()
      }
    }
    window.addEventListener(SOCKET_EVENTS.CONNECT_ERROR, connectErrorHandler)
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
    saveLogsListener(saveLogsHandler)
    EventBus.addListener(EventBusEvents.PrematureGameEnd, prematureGameEndHandler)
    window.addEventListener(GAME_RESTART_EVENT, restartGameHandler)
    window.addEventListener(GAME_RESUME_EVENT, resumeGameHandler)
    window.addEventListener(GAME_QUIT_EVENT, gameEndEmiter)
    window.addEventListener(ADD_SNACKBAR_EVENT, addSnackbarHandler)
    return () => {
      EventBus.removeAllListeners()
      window.removeEventListener(GAME_RESTART_EVENT, restartGameHandler)
      window.removeEventListener(GAME_RESUME_EVENT, resumeGameHandler)
      window.removeEventListener(LOAD_ANIMATION_END_EVENT, loadConfigurationEmiter)
      window.removeEventListener(ADD_SNACKBAR_EVENT, addSnackbarHandler)
      window.removeEventListener(SOCKET_EVENTS.CONNECT_ERROR, connectErrorHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initGameStateContext(config)
  }, [config])

  return <>{children}</>
}
