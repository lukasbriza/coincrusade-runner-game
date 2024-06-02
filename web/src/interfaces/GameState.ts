export type IGameState = {
    chunksData: IChunkLog[]
    playerIsDead: boolean
    elapsedSeconds: number
    gainedSeconds: number
    incrementPickedCoin: () => void
    incrementGeneratedCoin: () => void
    incrementOvercomedSlopes: () => void
    incrementLostLives: () => void
    //decreaseLastchunkLostLives: () => void
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
    getLastChunk: () => IChunkLog | undefined
    getLastTwoChunks: () => IChunkLog[] | undefined
    setPlayerDead: () => void
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
}