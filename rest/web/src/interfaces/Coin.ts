import { Physics } from "phaser";
import { Coin, CoinCounter } from "../objects/_index";

export type ICoin = {
    isPicked: boolean
    onScene: boolean
    inCoinCounter: boolean
    pickCoin: (coinCounter: CoinCounter, target: Coin) => void
} & Physics.Arcade.Sprite