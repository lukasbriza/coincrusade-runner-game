import { ObjectId } from "mongoose"

type Generators = "Endless" | "AllTest" | "NoAiAdaptive" | "HamletSystem"

export type ChangeTypes = "IncreasePlatformSpeed" |
    "DecreasePlatformSpeed" |
    "IncreaseCoinChance" |
    "DecreaseCoinChance" |
    "IncreaseMapDifficulty" |
    "DecreaseMapDifficulty" |
    "IncreaseChestChance" |
    "DecreaseChestChance"

export type ChunkLog = {
    lostLives: number
    elapsedSeconds: number
    gainedSeconds: number
    pickedCoins: number
    generatedCoins: number,
    created: Date
    mapDifficulties: number[]
    mapSkillFactor: number
    platformSpeed: number
    totalElapsedSeconds: number
    totalGainedSeconds: number
    suggestedAction?: "increase" | "decrease" | "neutral"
    engine: Generators
    changed?: ChangeTypes
    actualDifficultySkore: number
}

export type GameDataRequestBody = {
    data: ChunkLog[]
}

export type GameDataSchemaType = {
    _id?: ObjectId
    created?: Date
    logs: ChunkLog[]
}