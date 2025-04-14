import { Injectable } from '@nestjs/common'

import { GameLogDto } from '../../dto'
import { PrismaService } from '../prisma'

import { GameLogsResponse } from './types'

@Injectable()
export class GameLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async saveGameLogs(sessionLogs: GameLogDto): Promise<GameLogsResponse> {
    const { id } = await this.prisma.gameSession.create({
      data: {
        logs: {
          create: sessionLogs.logs.map((log) => ({
            chunkLostLives: log.chunkLostLives,
            chunkElapsedSeconds: log.chunkElapsedSeconds,
            chunkGainedSeconds: log.chunkGainedSeconds,
            chunkPickedCoins: log.chunkPickedCoins,
            chunkGeneratedCoins: log.chunkGeneratedCoins,
            chunkMapDifficulties: log.chunkMapDifficulties,
            chunkPlatformSpeed: log.chunkPlatformSpeed,
            chunkDifficultySkore: log.chunkDifficultySkore,
            gameTotalElapsedSeconds: log.gameTotalElapsedSeconds,
            gameTotalGainedSeconds: log.gameTotalGainedSeconds,
            engineSuggestedAction: log.engineSuggestedAction ?? null,
            chunkCreated: log.chunkCreated,
          })),
        },
        gameEngine: sessionLogs.logs[0].gameEngine,
        createdAt: new Date(),
      },
    })
    return { id }
  }
}
