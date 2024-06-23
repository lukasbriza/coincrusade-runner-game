import { PLATFORM_MAP_KEYS } from "../constants";
import { MapType, MapTypeExtended, MapTypeMember } from "./_index";

export type IPlatformGenerator = {
    generate: () => Promise<MapTypeExtended[]>
    getChance: (chance: number) => boolean
    computeCoinChances: (mapType: MapTypeMember[][], coinDropChance: number) => (string | null)[]
    addRandomPlatau: (map: MapTypeExtended) => MapTypeExtended
    getPlatformMapByKey: (key: PLATFORM_MAP_KEYS) => MapType
    getPlatformMapsByDifficulty: (difficulty: number) => MapType[]
    getAllMaps: () => MapType[]
    weightedMapDifficultyPick: () => number
    increaseCoinGenerationChance: () => void
    decreaseCoinGenerationChance: () => void
    increasePlatformSpeed: (by: number) => void
    decreasePlatformSpeed: (by: number) => void
    increasePickedPlatformDifficulty: () => void
    decreasePickedPlatformDifficulty: () => void

    applyDifficultyIncreasePolicy: (pickIndex: number) => void
    applyDifficultyDecreasePolicy: (pickIndex: number) => void
} 