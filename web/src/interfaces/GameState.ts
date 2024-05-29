export type IGameState = {
    incrementPickedCoin: () => void
    incrementGeneratedCoin: () => void
    incrementOvercomedSlopes: () => void
    incrementLostLives: () => void
    getState: () => {
        pickedCoins: number,
        generatedCoins: number,
        overcomedSlopes: number,
        lostLives: number
    }
}