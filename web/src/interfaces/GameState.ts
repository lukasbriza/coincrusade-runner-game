export type IGameState = {
    incrementPickedCoin: () => void
    incrementGeneratedCoin: () => void
    incrementOvercomedSlopes: () => void
    incrementLostLives: () => void
    incrementElapsedSeconds: () => void
    incrementGainedSeconds: (by?: number) => void
    logMapDifficulty: (diff: number) => void
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
}

export type IChunkLog = {
    lostLives: number
    elapsedSeconds: number
    gainedSeconds: number
    pickedCoins: number
    generatedCoins: number,
    created: Date
    mapDifficulties: number[]
}