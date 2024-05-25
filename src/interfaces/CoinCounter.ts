import { GameObjects } from "phaser"
import { Coin } from "../objects/_index"

export type ICoinCounter = {
    count: number
    textTexture: GameObjects.BitmapText
    nearTextCoin: Coin

    increment: () => void
    reset: () => void
}