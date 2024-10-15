/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
import { saveGameLogs } from '@/actions'
import type { GameConfiguration } from '@/shared/context'
import { initChances, initLastChunk, initPlayerState } from '@/utils'

import {
  MAX_COIN_GENERATION_CHANCE,
  MIN_COIN_GENERATION_CHANCE,
  MINIMAL_PLATFORM_SPEED,
  PLATFORM_DIFFICULTY_PICK_STEP_FACTOR,
  SKILL_FACTOR_DEFAULT,
} from '../constants'
import {
  generateMethodEmiter,
  knightDeadEmiter,
  knightHitCallbackEmiter,
  playerRelocateEmiter,
  reasignPlatformSpeedCallbackEmiter,
} from '../events'
import type { ColliderObject } from '../factories'
import type { Chances, ChunkLog, LastChunk, PlayerState } from '../types'
import { ChangeTypes, SuggestedAction } from '../types'

import type { GameStateContextSingleton } from './types'

class GameStateContext implements GameStateContextSingleton {
  public state: PlayerState = initPlayerState()
  public lastChunk: LastChunk = initLastChunk()
  public chunksData: ChunkLog[] = []
  public chances: Chances = initChances()

  public config: GameConfiguration

  constructor(config: GameConfiguration) {
    this.state.actualLives = config.maxPlayerLifes
    this.config = config
  }

  public saveLogs = async () => {
    const { data } = await saveGameLogs({
      logs: this.chunksData.map((chunkLog) => ({
        ...chunkLog,
        engineSuggestedAction: chunkLog.engineSuggestedAction?.toString() ?? '',
        gameEngine: this.config.currentGenerator.toString() ?? '',
        chunkMapDifficulties: chunkLog.chunkMapDifficulties.map((difficulty) => difficulty.toString()),
        chunkCreated: chunkLog.chunkCreated.toString(),
      })),
    })
    if (!data) {
      // TODO error handle
    }
  }

  public lifeAddAction = () => {
    this.state = {
      ...this.state,
      actualLives: this.state.actualLives + 1,
      lostLives: this.state.lostLives - 1,
    }
  }

  public leftSideCollisionAction = (knight: IKnight) => {
    this.onKnightHit(knight)

    if (!this.state.playerIsDead) {
      playerRelocateEmiter(knight)
    }
  }

  public onKnightHit = (knight: IKnight, obstacle?: ColliderObject) => {
    if (!knight.immortalAnimation) {
      this.onHitAction()
      knightHitCallbackEmiter(knight, obstacle)

      if (this.state.playerIsDead) {
        knightDeadEmiter(knight)
        this.nullifyPlatformSpeedAction()
        reasignPlatformSpeedCallbackEmiter()
      }
    }
  }

  public onHitAction = () => {
    this.state = {
      ...this.state,
      actualLives: this.state.actualLives - 1,
      lostLives: this.state.lostLives + 1,
    }
    this.state.playerIsDead = this.state.actualLives === 0

    this.lastChunk = {
      ...this.lastChunk,
      lastChunkLostLives: this.lastChunk.lastChunkLostLives + 1,
    }
  }

  public addSecondAction = () => {
    this.state = {
      ...this.state,
      elapsedSeconds: this.state.elapsedSeconds + 1,
    }
    this.lastChunk = {
      ...this.lastChunk,
      lastChunkElapsedSeconds: this.lastChunk.lastChunkElapsedSeconds + 1,
    }
  }

  public coinPickedAction = () => {
    this.state = {
      ...this.state,
      pickedCoins: this.state.pickedCoins + 1,
    }
    this.lastChunk = {
      ...this.lastChunk,
      lastChunkPickedCoins: this.lastChunk.lastChunkPickedCoins + 1,
    }
  }

  public coinGeneratedAction = () => {
    this.state = {
      ...this.state,
      generatedCoins: this.state.generatedCoins + 1,
    }
    this.lastChunk = {
      ...this.lastChunk,
      lastChunkElapsedSeconds: this.lastChunk.lastChunkElapsedSeconds + 1,
    }
  }

  public logMapDifficultyAction = (mapDifficulty: number) => {
    this.lastChunk.lastChunkMapDifficulties.push(mapDifficulty)
  }

  public chunkEndAction = () => {
    this.chunksData.push({
      chunkCreated: new Date(),
      chunkElapsedSeconds: this.lastChunk.lastChunkElapsedSeconds,
      chunkGainedSeconds: this.lastChunk.lastChunkGainedSeconds,
      chunkPickedCoins: this.lastChunk.lastChunkPickedCoins,
      chunkGeneratedCoins: this.lastChunk.lastChunkGeneratedCoins,
      chunkMapDifficulties: this.lastChunk.lastChunkMapDifficulties,
      chunkPlatformSpeed: this.lastChunk.lastChunkPlatformSpeed,
      chunkLostLives: this.lastChunk.lastChunkLostLives,
      engineSuggestedAction: this.lastChunk.lastChunkSuggestedAction,
      chunkDifficultySkore: this.state.difficultyScore,
      gameTotalElapsedSeconds: this.state.elapsedSeconds,
      gameTotalGainedSeconds: this.state.gainedSeconds,
    })
    this.lastChunk = initLastChunk()
    generateMethodEmiter()
  }

  public secondsGainAction = (seconds: number) => {
    this.lastChunk = {
      ...this.lastChunk,
      lastChunkElapsedSeconds: this.lastChunk.lastChunkElapsedSeconds + seconds,
    }
  }

  public nullifyPlatformSpeedAction = () => {
    this.state.platformSpeed = 0
  }

  public increasePlatformSpeedAction = (by?: number) => {
    this.state = {
      ...this.state,
      platformSpeed: this.state.platformSpeed + (by ?? 20),
    }
    reasignPlatformSpeedCallbackEmiter()
  }

  public decreasePlatformSpeedAction = (by?: number) => {
    this.state = {
      ...this.state,
      platformSpeed:
        this.state.platformSpeed <= MINIMAL_PLATFORM_SPEED
          ? MINIMAL_PLATFORM_SPEED
          : this.state.platformSpeed - (by ?? 20),
    }
    reasignPlatformSpeedCallbackEmiter()
  }

  public changeDifficultyScoreAction = (action: SuggestedAction) => {
    this.lastChunk = {
      ...this.lastChunk,
      lastChunkSuggestedAction: action,
    }

    if (action === SuggestedAction.neutral) {
      return
    }

    const difficultyScore =
      action === SuggestedAction.increase ? this.state.difficultyScore + 1 : this.state.difficultyScore - 1

    this.state = {
      ...this.state,
      difficultyScore,
    }
  }

  public setAppliedChangeAction = (change: ChangeTypes, speedChange?: number) => {
    switch (change) {
      case ChangeTypes.IncreasePlatformSpeed: {
        this.increasePlatformSpeedAction(speedChange)
        break
      }
      case ChangeTypes.DecreasePlatformSpeed: {
        this.decreasePlatformSpeedAction(speedChange)
        break
      }
      case ChangeTypes.IncreaseCoinChance: {
        const newChance = this.chances.coinGenerationChance + 0.1
        this.chances = {
          ...this.chances,
          coinGenerationChance: newChance > MAX_COIN_GENERATION_CHANCE ? MAX_COIN_GENERATION_CHANCE : newChance,
        }
        break
      }
      case ChangeTypes.DecreaseCoinChance: {
        const newChance = this.chances.coinGenerationChance - 0.1

        if (newChance < MIN_COIN_GENERATION_CHANCE) {
          this.increasePlatformSpeedAction(20)
          return
        }

        this.chances = {
          ...this.chances,
          coinGenerationChance: newChance,
        }
        break
      }
      case ChangeTypes.IncreaseMapDifficulty: {
        this.chances = {
          ...this.chances,
          skillFactor: this.chances.skillFactor + PLATFORM_DIFFICULTY_PICK_STEP_FACTOR,
        }
        break
      }
      case ChangeTypes.DecreaseMapDifficulty: {
        const newSkillFactor = this.chances.skillFactor - PLATFORM_DIFFICULTY_PICK_STEP_FACTOR

        this.chances = {
          ...this.chances,
          skillFactor: newSkillFactor < SKILL_FACTOR_DEFAULT ? SKILL_FACTOR_DEFAULT : newSkillFactor,
        }
        break
      }
    }

    this.lastChunk = {
      ...this.lastChunk,
      lastChunkChange: change,
    }
  }

  public increaseOvercomedSlopesAction = () => {
    this.state = {
      ...this.state,
      overcomedSlopes: this.state.overcomedSlopes + 1,
    }
  }

  public getLastTwoChunks() {
    if (this.chunksData.length < 2) {
      return
    }
    return [this.chunksData.at(-2), this.chunksData.at(-1)] as ChunkLog[]
  }

  public getLastChunk() {
    if (this.chunksData.length === 0) {
      return
    }
    return this.chunksData.at(-1)
  }

  public reset = () => {
    this.state = initPlayerState()
    this.lastChunk = initLastChunk()
    this.chunksData = []
    this.chances = initChances()
    this.state.actualLives = this.config.maxPlayerLifes
  }
}

// eslint-disable-next-line prefer-const
let gameStateContext: GameStateContextSingleton

export const initGameStateContext = (config: GameConfiguration) => {
  gameStateContext = new GameStateContext(config)
}

export const getGameStateContext = () => gameStateContext
