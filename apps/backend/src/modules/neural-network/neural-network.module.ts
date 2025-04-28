import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from '../prisma/prisma.module'

import { NeuralNetworkService } from './neural-network.service'

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [NeuralNetworkService],
  exports: [NeuralNetworkService],
})
export class NeuralNetworkModule {}
