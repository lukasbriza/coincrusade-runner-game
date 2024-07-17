import { ChangeTypes, Generators } from "./_index"

export type ActionType = "increase" | "decrease" | "neutral"

export type IGameState = {
    chunksData: IChunkLog[]
    playerIsDead: boolean
    elapsedSeconds: number
    gainedSeconds: number
    actualLives: number
    difficultyScore: number
    incrementDifficultyScore: () => void
    decreaseDifficultyScore: () => void
    incrementPickedCoin: () => void
    incrementGeneratedCoin: () => void
    incrementOvercomedSlopes: () => void
    incrementLostLives: () => void
    incrementElapsedSeconds: () => void
    incrementGainedSeconds: (by?: number) => void
    logSuggestedAction: (action: ActionType) => void
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
    platformSpeed: number //run speed
    totalElapsedSeconds: number
    totalGainedSeconds: number
    suggestedAction?: ActionType
    engine: Generators
    changed?: ChangeTypes
    actualDifficultySkore: number
}