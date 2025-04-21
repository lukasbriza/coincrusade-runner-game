import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma'

import { GameLogsService } from './game-logs.service'

@Module({
  imports: [PrismaModule],
  providers: [GameLogsService],
  exports: [GameLogsService],
})
export class GameLogsModule {}
