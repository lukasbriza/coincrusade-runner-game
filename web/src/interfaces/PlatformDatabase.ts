import { PLATFORM_MAP_KEYS } from "../constants"
import { MapType, MapTypeExtended, TranslationResult } from "./Common"

export type IPlatformDatabase = {
    avaliablePlatformMaps: MapType[]
    chunk: number
    generateInitialChunk: () => TranslationResult
    getPlatformMapByKey: (key: PLATFORM_MAP_KEYS) => MapType
    getPlatformMapsByDifficulty: (difficulty: number) => MapType[]
    getAllMaps: () => MapType[]
    translateMaptypes: (map: MapTypeExtended[], xStartPosition?: number) => TranslationResult
    translateMaptype: (jsonMap: MapTypeExtended, xStartPosition: number) => TranslationResult
}