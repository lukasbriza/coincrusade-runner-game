import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from '../prisma/prisma.module'

import { NeuralNetworkController } from './neural-network.controller'
import { NeuralNetworkService } from './neural-network.service'

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [NeuralNetworkService],
  controllers: [NeuralNetworkController],
})
export class NeuralNetworkModule {}
