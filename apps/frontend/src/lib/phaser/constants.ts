export const TILE_HEIGHT = 90
export const TILE_WIDTH = 90
export const CHUNK_SIZE = 15 * TILE_WIDTH

export const COIN_GENERATION_CHANCE = 0.5
export const MAX_COIN_GENERATION_CHANCE = 0.9
export const MIN_COIN_GENERATION_CHANCE = 0.2

export const SKILL_FACTOR_DEFAULT = 1
export const PLATFORM_DIFFICULTY_PICK_STEP_FACTOR = 0.3

export const MAX_PLATAU_COUNT = 4
export const MIN_PLATAU_COUNT = 2
export const PLATAU_GRASS_CHANCE = 0.5
export const PLATAU_TENT_CHANCE = 0.1
export const PLATAU_TREE_OR_STUMP_CHANCE = 0.3
export const MAX_STUMPS_AND_TREES_ON_PLATAU = 2

export const MINIMAL_PLATFORM_SPEED = 50
export const DEFAULT_PLATFORM_SPEED_CHANGE = 20

export const STATUS_FONT_SIZE = 30

export const CHANGE_DISTRIBUTION = {
  coinChance: 2,
  platformSpeed: 5,
  platformDifficulty: 3,
}

export const FACTOR_DISTRIBUTIONS = [
  CHANGE_DISTRIBUTION.coinChance,
  CHANGE_DISTRIBUTION.platformSpeed,
  CHANGE_DISTRIBUTION.platformDifficulty,
]

export const POOL_CONFIG = {
  CRITICAL_WIDTH: 1 * CHUNK_SIZE,
  MAX_PACKAGE_WIDTH: 2 * CHUNK_SIZE,
}

export enum CHECKER_PROPS {
  SLOPE = 'isSlopperTrigger',
  CHECKED = 'checked',
  MAP_DIFFICULTY = 'mapDifficulty',
  CHUNK_END = 'chunkEnd',
}

export enum DIFF_POLICY {
  DECREASE = 0,
  NOTHING = 1,
  INCREASE = 2,
}

export enum POLICY {
  COIN = 0,
  PLATFORM = 1,
  PLATFORM_DIFFICULTY = 2,
}
