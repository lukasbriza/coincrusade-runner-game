import { Physics, Tilemaps, Types } from "phaser"
import { FONT_KEYS, KEYS, PLATFORM_MAP_KEYS, SPRITE_KEYS } from "../constants"
import { Coin } from "../objects/_index"

export type Generators = "NoAiAdaptive" | "HamletSystem" | "LinearGenerator" | "NeuralNetworkGenerator" | "ReinforcementLearningGenerator"

export type ChangeTypes = "IncreasePlatformSpeed" |
    "DecreasePlatformSpeed" |
    "IncreaseCoinChance" |
    "DecreaseCoinChance" |
    "IncreaseMapDifficulty" |
    "DecreaseMapDifficulty" |
    "IncreaseChestChance" |
    "DecreaseChestChance"

export type AppParameters = {
    debug: boolean
    playerGravityY: number
    powerJumpLoadDelay: number
    powerJumpMaxCap: number
    powerMultiplicator: number
    platformStartSpeed: number
    minimalPlatformSpeed: number

    knightStartFramerate: number
    knightMoveVelocityRightX: number
    knightMoveVelocityLeftX: number

    timeAdditionInSeconds: number
    addTimeEveryNumberOfCoins: number
    maxPlayerLives: number
    playerHealRateInSeconds: number
    onHitImmortalityDuration: number
    baseTimeInMinutes: number
    difficultyChangeBorderMinGap: number

    sendLogs: boolean
}

export type Image = { path: string }
export type Sprite = { atlas: string, sheet: string }

export type ImagesType = {
    [key in KEYS]: Image
}

export type SpriteTypes = {
    [key in SPRITE_KEYS]: Sprite
}

export type SpriteWithDynamicBody = Types.Physics.Arcade.SpriteWithDynamicBody | Physics.Arcade.Sprite
export type ImageWithDynamicBody = Types.Physics.Arcade.ImageWithDynamicBody
export type ColliderObject = Tilemaps.Tile | Types.Physics.Arcade.GameObjectWithBody

export type TranslationResult = {
    decorations: ImageWithDynamicBody[],
    platforms: SpriteWithDynamicBody[],
    coins: Coin[],
    obstacles: SpriteWithDynamicBody[],
    slopeTriggers: SpriteWithDynamicBody[]
}

export type PlatformMapType = {
    [key in PLATFORM_MAP_KEYS]: { path: string }
}

export type FontTypes = {
    [key in FONT_KEYS]: { sheet: string, bitmap: string }
}

export type MapTypeMember = string | number

export type MapType = {
    width: number
    difficulty: number
    map: MapTypeMember[][]
}

export type MapTypeExtended = { coins: (string | null)[] } & MapType

export type NeuralPredictionRepsonse = {
    data: [number, number, number]
}