/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-console */

'use client'

import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import { getApiCredentials } from '@/actions/get-api-credentials'

import type { ClientToServerEvents, ServerToClientEvents } from './api'
import { SOCKET_EVENTS } from './events'

export type CoincrusadeSocket = Socket<ServerToClientEvents, ClientToServerEvents> & {
  emitWithAck: <T>(event: string, data: unknown) => Promise<T>
}

export type SocketContextSingleton = {
  socket: CoincrusadeSocket | null
  loaded: boolean
  connectionFailed: boolean

  initConnection: () => Promise<void>
}

// eslint-disable-next-line prefer-const
let socketContext: SocketContextSingleton | null = null

class SocketContext implements SocketContextSingleton {
  public socket: CoincrusadeSocket | null = null
  public loaded: boolean = false
  public connectionFailed: boolean = false

  constructor() {
    if (this.socket === null) {
      this.initConnection()
    }

    window.addEventListener(SOCKET_EVENTS.CONNECTED, () => {
      this.initListenners()
    })
  }

  public initConnection = async () => {
    const credentials = await getApiCredentials()

    this.socket = io(credentials.API_URL, {
      path: '',
      transports: ['websocket'],
      auth: {
        apiKey: credentials.API_KEY,
      },
    })

    if (!this.socket.hasListeners('connect')) {
      this.socket.on('connect', () => {
        this.loaded = true
        window.dispatchEvent(
          new CustomEvent(SOCKET_EVENTS.CONNECTED, {
            detail: {
              socket: this.socket,
            },
          }),
        )
      })
    }

    if (!this.socket.hasListeners('connect_error')) {
      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error', error)
        this.connectionFailed = true
        window.dispatchEvent(
          new CustomEvent(SOCKET_EVENTS.CONNECT_ERROR, {
            detail: {
              socket: this.socket,
              error,
            },
          }),
        )
      })
    }

    if (!this.socket.hasListeners('error')) {
      this.socket.on('error', (error) => {
        window.dispatchEvent(
          new CustomEvent(SOCKET_EVENTS.ERROR, {
            detail: {
              socket: this.socket,
              message: error.message,
            },
          }),
        )
      })
    }
  }

  private initListenners = () => {
    if (this.socket === null) {
      console.error('Socket not initialized.')
      return
    }

    if (this.loaded === false) {
      console.error('Socket not loaded.')
      return
    }

    if (!this.socket.hasListeners('game-log-save-response')) {
      this.socket.on('game-log-save-response', (response) => {
        window.dispatchEvent(
          new CustomEvent(SOCKET_EVENTS.GAME_LOG_SAVE_RESPONSE, {
            detail: {
              response,
              socket: this.socket,
            },
          }),
        )
      })
    }

    if (!this.socket.hasListeners('mail-send-response')) {
      this.socket.on('mail-send-response', (response) => {
        window.dispatchEvent(
          new CustomEvent(SOCKET_EVENTS.MAIL_SEND_RESPONSE, {
            detail: {
              response,
              socket: this.socket,
            },
          }),
        )
      })
    }
  }
}

export const initSocketContext = () => {
  if (socketContext) {
    return
  }
  socketContext = new SocketContext()
}

export const getSocketContext = () => socketContext
