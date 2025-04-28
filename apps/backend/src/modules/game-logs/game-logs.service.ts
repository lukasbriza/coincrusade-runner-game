import { Injectable } from '@nestjs/common'

import { GameLogDto } from '../../dto'
import { GameLogsRto } from '../../rto'
import { PrismaService } from '../prisma'

@Injectable()
export class GameLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async saveGameLogs(sessionLogs: GameLogDto): Promise<GameLogsRto> {
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
