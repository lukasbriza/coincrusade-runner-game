'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useScopedI18n } from '@/i18n/client'
import type { GameLogsRto, CoincrusadeSocket } from '@/lib/socket-io'
import { initSocketContext } from '@/lib/socket-io'
import { SOCKET_EVENTS } from '@/lib/socket-io/events'

import { SocketSnackbar } from '../components/snackbars'

import { useSnackbarContext } from './snackbar-context'

export type SocketContextProps = {
  socket: CoincrusadeSocket | null
}

const defaultValues: SocketContextProps = {
  socket: null,
}

export const SocketContext = createContext<SocketContextProps>(defaultValues)

export const SocketContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const tSnackbar = useScopedI18n('snackbars')
  const { addSnackbar } = useSnackbarContext()
  const [socket, setSocket] = useState<CoincrusadeSocket | null>(defaultValues.socket)

  const context: SocketContextProps = useMemo(() => ({ socket }), [socket])

  useEffect(() => {
    initSocketContext()

    const connectionHandler = (event: Event) => {
      const customEvent = event as CustomEvent<{ socket: CoincrusadeSocket }>
      setSocket(customEvent.detail.socket)
    }

    const errorHandler = (event: Event) => {
      const customEvent = event as CustomEvent<{ socket: CoincrusadeSocket; message: string }>
      addSnackbar(<SocketSnackbar message={customEvent.detail.message} />)
    }

    const saveLogsResponseHandler = (event: Event) => {
      const customEvent = event as CustomEvent<{ socket: CoincrusadeSocket; response: GameLogsRto }>
      // eslint-disable-next-line no-console
      console.log(`Game logs saved with object id ${customEvent.detail.response.id}`)
      addSnackbar(<SocketSnackbar message={tSnackbar('gameLogSaveSuccess')} />)
    }

    window.addEventListener(SOCKET_EVENTS.GAME_LOG_SAVE_RESPONSE, saveLogsResponseHandler)
    window.addEventListener(SOCKET_EVENTS.CONNECTED, connectionHandler)
    window.addEventListener(SOCKET_EVENTS.ERROR, errorHandler)
    return () => {
      window.removeEventListener(SOCKET_EVENTS.GAME_LOG_SAVE_RESPONSE, saveLogsResponseHandler)
      window.removeEventListener(SOCKET_EVENTS.CONNECTED, connectionHandler)
      window.removeEventListener(SOCKET_EVENTS.ERROR, errorHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
}

export const useSocketContext = () => {
  const context = useContext(SocketContext)
  return context
}
