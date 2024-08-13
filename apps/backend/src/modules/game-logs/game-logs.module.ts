import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma'

import { GameLogsController } from './game-logs.controller'
import { GameLogsService } from './game-logs.service'

@Module({
  imports: [PrismaModule],
  providers: [GameLogsService],
  controllers: [GameLogsController],
})
export class GameLogsModule {}
