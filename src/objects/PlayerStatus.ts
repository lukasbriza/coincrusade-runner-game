import { Scene } from "phaser";
import { CoinCounter } from "./CoinCounter";
import { TimeCounter } from "./TimeCounter";
import { GAME_PARAMETERS } from "../configurations/_index";

export class PlayerStatus {
    public coinCounter: CoinCounter;
    public timeCounter: TimeCounter;
    private addTimeCounter: number = 0;

    constructor(scene: Scene) {
        this.coinCounter = new CoinCounter(scene, 0)
        this.timeCounter = new TimeCounter(scene, this.coinCounter.nearTextCoin.height)
    }

    public incrementCoinCounter() {
        this.coinCounter.increment()
        this.addTimeCounter++

        if (this.addTimeCounter >= GAME_PARAMETERS.addTimeEveryNumberOfCoins) {
            this.timeCounter.addTime()
            this.addTimeCounter = 0
        }
    }
}