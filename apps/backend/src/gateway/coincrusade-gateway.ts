/* eslint-disable no-console */
import { ConfigService } from '@nestjs/config'
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { AsyncApi, AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi'
import { Server, Socket } from 'socket.io'

import { GameLogDto, HealthCheckDto, MailDto, NeuralNetworkDto } from '../dto'
import { GameLogsService } from '../modules/game-logs'
import { MailService } from '../modules/mail'
import { NeuralNetworkService } from '../modules/neural-network'
import { HealthCheckRto, NeuralNetworkRto, GameLogsRto, MailRto, ErrorRto } from '../rto'

const EventPatterns = {
  GameLogSave: 'game-log-save',
  GameLogSaveResponse: 'game-log-save-response',
  NnPredict: 'nn-predict',
  HealthCheck: 'health-check',
  HealthCheckResponse: 'health-check-response',
  MailSend: 'mail-send',
  MailSendResponse: 'mail-send-response',
  Error: 'error',
}

@AsyncApi()
@WebSocketGateway()
export class CoincrusadeGateway implements OnGatewayInit, OnGatewayDisconnect {
  constructor(
    private readonly gameLogsService: GameLogsService,
    private readonly neuralNetworkService: NeuralNetworkService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @WebSocketServer()
  server: Server

  afterInit(@ConnectedSocket() socket: Socket) {
    // Secure connection with api key
    socket.on('connection', (socket: Socket) => {
      const apiKey = socket.handshake.auth.apiKey as string | null
      const expectedApiKey = this.configService.get<string>('API_KEY')

      if (apiKey !== expectedApiKey) {
        console.log(`Client with id ${socket.id} has invalid or missing API key.`)
        socket.emit('error', { message: 'Invalid or missing API key' })
        socket.disconnect()
        console.log(`Client with id ${socket.id} disconnected.`)
        return
      }

      console.log(`Client with id ${socket.id} connected.`)
    })

    console.log(`Websocket gateway initialised.`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  // Game logs
  @AsyncApiSub({
    channel: EventPatterns.GameLogSave,
    message: { payload: GameLogDto },
  })
  @AsyncApiPub({
    channel: EventPatterns.GameLogSaveResponse,
    message: { payload: GameLogsRto },
  })
  @SubscribeMessage(EventPatterns.GameLogSave)
  async onGameLogSave(@MessageBody() gameLogDto: GameLogDto): Promise<WsResponse<ErrorRto | GameLogsRto>> {
    try {
      const response = await this.gameLogsService.saveGameLogs(gameLogDto)
      return { event: EventPatterns.GameLogSaveResponse, data: response }
    } catch (error) {
      return {
        event: EventPatterns.Error,
        data: { message: error instanceof Error ? error.message : 'Unexpected server error.' },
      }
    }
  }

  // Neural network
  @AsyncApiSub({
    channel: EventPatterns.NnPredict,
    message: { payload: NeuralNetworkDto },
  })
  @SubscribeMessage(EventPatterns.NnPredict)
  async onNnPredict(@MessageBody() neuralNetworkDto: NeuralNetworkDto): Promise<NeuralNetworkRto> {
    const response = await this.neuralNetworkService.predict(neuralNetworkDto)
    return response
  }

  // Mail
  @AsyncApiSub({
    channel: EventPatterns.MailSend,
    message: { payload: MailDto },
  })
  @AsyncApiPub({
    channel: EventPatterns.MailSendResponse,
    message: { payload: MailRto },
  })
  @SubscribeMessage(EventPatterns.MailSend)
  async onMailSend(@MessageBody() mailDto: MailDto): Promise<WsResponse<MailRto>> {
    const response = await this.mailService.sendMail(mailDto.subject, mailDto.text)
    return { event: EventPatterns.MailSendResponse, data: response }
  }

  // Health check
  @AsyncApiSub({
    channel: EventPatterns.HealthCheck,
    message: { payload: HealthCheckDto },
  })
  @AsyncApiPub({
    channel: EventPatterns.HealthCheckResponse,
    message: { payload: HealthCheckRto },
  })
  @SubscribeMessage(EventPatterns.HealthCheck)
  onHealthCheck(): WsResponse<HealthCheckRto> {
    const response = { health: 'ok' }
    return { event: EventPatterns.HealthCheckResponse, data: response }
  }
}
