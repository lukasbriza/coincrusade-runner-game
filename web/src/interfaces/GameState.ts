import { ChangeTypes, Generators } from "./_index"

export type IGameState = {
    chunksData: IChunkLog[]
    playerIsDead: boolean
    elapsedSeconds: number
    gainedSeconds: number
    actualLives: number
    incrementDifficultyScore: () => void
    decreaseDifficultyScore: () => void
    incrementPickedCoin: () => void
    incrementGeneratedCoin: () => void
    incrementOvercomedSlopes: () => void
    incrementLostLives: () => void
    incrementElapsedSeconds: () => void
    incrementGainedSeconds: (by?: number) => void
    logSuggestedAction: (action: "increase" | "decrease" | "neutral") => void
    logMapDifficulty: (diff: number) => void
    setParameterChange: (change: ChangeTypes) => void
    saveChunk: () => void
    getState: () => {
        pickedCoins: number,
        generatedCoins: number,
        overcomedSlopes: number,
        lostLives: number,
        elapsedSeconds: number,
        gainedSeconds: number,
        lastChunkElapsedSeconds: number,
        lastChunkGainedSeconds: number,
        lastChunkLostLives: number,
        lastChunkPickedCoins: number,
        lastChunkGeneratedCoins: number,
        chunksData: IChunkLog[]
    }
    getLastChunk: () => IChunkLog | undefined
    getLastTwoChunks: () => IChunkLog[] | undefined
    setPlayerDead: () => void
    gameStateRestart: () => void
}

export type IChunkLog = {
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