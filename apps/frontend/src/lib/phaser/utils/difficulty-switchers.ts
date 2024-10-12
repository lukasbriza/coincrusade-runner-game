import type { GameConfiguration } from '@/shared/context'

import { POLICY, DEFAULT_PLATFORM_SPEED_CHANGE } from '../constants'
import { noteAddedEmiter } from '../events'
import { getGameStateContext } from '../singletons'
import { ChangeTypes, SuggestedAction } from '../types'

import { getTranslation } from './get-translation'

export const increaseCoinGenerationChance = (message: string) => {
  const stateSingleton = getGameStateContext()
  stateSingleton.setAppliedChangeAction(ChangeTypes.IncreaseCoinChance)
  noteAddedEmiter(message)
}

export const decreaseCoinGenerationChance = (message: string) => {
  const stateSingleton = getGameStateContext()
  stateSingleton.setAppliedChangeAction(ChangeTypes.DecreaseCoinChance)
  noteAddedEmiter(message)
}

export const increasePlatformSpeed = (by: number, message: string) => {
  const stateSingleton = getGameStateContext()
  stateSingleton.setAppliedChangeAction(ChangeTypes.IncreasePlatformSpeed, by)
  noteAddedEmiter(message)
}

export const decreasePlatformSpeed = (by: number, message: string) => {
  const stateSingleton = getGameStateContext()
  stateSingleton.setAppliedChangeAction(ChangeTypes.DecreasePlatformSpeed, by)
  noteAddedEmiter(message)
}

export const increasePickedPlatformDifficulty = (message: string) => {
  const stateSingleton = getGameStateContext()
  stateSingleton.setAppliedChangeAction(ChangeTypes.IncreaseMapDifficulty)
  noteAddedEmiter(message)
}

export const decreasePickedPlatformDifficulty = (message: string) => {
  const stateSingleton = getGameStateContext()
  stateSingleton.setAppliedChangeAction(ChangeTypes.DecreaseMapDifficulty)
  noteAddedEmiter(message)
}

export const applyDifficultyIncreasePolicy = (
  pickIndex: POLICY,
  config: GameConfiguration,
  platformSpeedChange = DEFAULT_PLATFORM_SPEED_CHANGE,
) => {
  const { notes } = getTranslation(config.lng)
  const stateSingleton = getGameStateContext()
  stateSingleton.changeDifficultyScoreAction(SuggestedAction.increase)

  switch (pickIndex) {
    case POLICY.COIN: {
      decreaseCoinGenerationChance(notes.decreaseCoinGenerationChance)
      break
    }
    case POLICY.PLATFORM: {
      increasePlatformSpeed(platformSpeedChange, notes.increasePlatformSpeed)
      break
    }
    case POLICY.PLATFORM_DIFFICULTY: {
      increasePickedPlatformDifficulty(notes.increasePickedPlatformDifficulty)
      break
    }
  }
}

export const applyDifficultyDecreasePolicy = (
  pickIndex: POLICY,
  config: GameConfiguration,
  platformSpeedChange = DEFAULT_PLATFORM_SPEED_CHANGE,
) => {
  const { notes } = getTranslation(config.lng)
  const stateSingleton = getGameStateContext()
  stateSingleton.changeDifficultyScoreAction(SuggestedAction.decrease)

  switch (pickIndex) {
    case POLICY.COIN: {
      increaseCoinGenerationChance(notes.increaseCoinGenerationChance)
      break
    }
    case POLICY.PLATFORM: {
      decreasePlatformSpeed(platformSpeedChange, notes.decreasePlatformSpeed)
      break
    }
    case POLICY.PLATFORM_DIFFICULTY: {
      decreasePickedPlatformDifficulty(notes.decreasePickedPlatformDifficulty)
      break
    }
  }
}
