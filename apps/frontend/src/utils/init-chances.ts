import type { Chances } from '@/lib/phaser'
import {
  COIN_GENERATION_CHANCE,
  MAX_PLATAU_COUNT,
  MAX_STUMPS_AND_TREES_ON_PLATAU,
  MIN_PLATAU_COUNT,
  PLATAU_GRASS_CHANCE,
  PLATAU_TENT_CHANCE,
  PLATAU_TREE_OR_STUMP_CHANCE,
  SKILL_FACTOR_DEFAULT,
} from '@/lib/phaser/constants'

export const initChances = (): Chances => ({
  maxPlatauCount: MAX_PLATAU_COUNT,
  minPlatauCount: MIN_PLATAU_COUNT,
  coinGenerationChance: COIN_GENERATION_CHANCE,
  platauTentChance: PLATAU_TENT_CHANCE,
  platauGrassChance: PLATAU_GRASS_CHANCE,
  platauTreeOrStumpChance: PLATAU_TREE_OR_STUMP_CHANCE,
  maxStumpsAndTreesOnPlatau: MAX_STUMPS_AND_TREES_ON_PLATAU,
  skillFactor: SKILL_FACTOR_DEFAULT,
})
