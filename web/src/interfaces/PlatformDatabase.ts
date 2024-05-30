import { Eventhelper } from "../helpers/_index"
import { MapTypeExtended, TranslationResult } from "./Common"

export type IPlatformDatabase = {
    eventHelper: Eventhelper
    chunk: number
    generateInitialChunk: () => TranslationResult
    translateMaptypes: (map: MapTypeExtended[], xStartPosition: number) => TranslationResult
    translateMaptype: (jsonMap: MapTypeExtended, xStartPosition: number) => TranslationResult
}