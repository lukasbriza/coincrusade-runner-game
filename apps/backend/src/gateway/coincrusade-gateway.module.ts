import { Module } from '@nestjs/common'

import { GameLogsModule } from '../modules/game-logs'
import { MailModule } from '../modules/mail'
import { NeuralNetworkModule } from '../modules/neural-network'

import { CoincrusadeGateway } from './coincrusade-gateway'

@Module({
  imports: [GameLogsModule, NeuralNetworkModule, MailModule],
  providers: [CoincrusadeGateway],
})
export class CoincrusadeGatewayModule {}
