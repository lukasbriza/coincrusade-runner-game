import { Scene } from "phaser";
import { CoinCounter } from "./CoinCounter";
import { TimeCounter } from "./TimeCounter";

export class PlayerStatus {
    public coinCounter: CoinCounter;
    public timeCounter: TimeCounter;

    constructor(scene: Scene) {
        this.timeCounter = new TimeCounter(scene, 0)
        this.coinCounter = new CoinCounter(scene, this.timeCounter.timeText.height)
    }

    public incrementCoinCounter() {
        this.coinCounter.increment()
    }
}