import { Eventhelper } from "../helpers/_index"
import { MapTypeExtended, TranslationResult } from "./Common"

export type IPlatformDatabase = {
    eventHelper: Eventhelper
    chunk: number
    generateInitialChunk: () => TranslationResult
    translateMapTypes: (map: MapTypeExtended[], xStartPosition: number) => TranslationResult
    translateMapType: (jsonMap: MapTypeExtended, xStartPosition: number) => TranslationResult
}