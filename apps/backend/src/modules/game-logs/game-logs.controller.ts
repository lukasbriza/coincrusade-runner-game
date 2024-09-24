import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { GameLogDto } from '../../dto'

import { GameLogsService } from './game-logs.service'
import { GameLogsResponse } from './types'

@ApiTags('Log')
@Controller('log')
export class GameLogsController {
  private readonly gameLogsService: GameLogsService

  constructor(gameLogsService: GameLogsService) {
    this.gameLogsService = gameLogsService
  }

  @ApiResponse({ status: 201, type: GameLogsResponse })
  @UseGuards(AuthGuard('api-key'))
  @Post()
  saveGameLogs(@Body() gameLogDto: GameLogDto) {
    return this.gameLogsService.saveGameLogs(gameLogDto)
  }
}
