import { Scene } from "phaser";
import { CoinCounter } from "./CoinCounter";
import { TimeCounter } from "./TimeCounter";
import { LifeCounter } from "./LifeCounter";
import { GAME_PARAMETERS } from "../configurations/_index";
import { IPlayerStatus } from "../interfaces/_index";

export class PlayerStatus implements IPlayerStatus {
    public coinCounter: CoinCounter;
    public timeCounter: TimeCounter;
    public lifeCounter: LifeCounter;

    constructor(scene: Scene) {
        this.coinCounter = new CoinCounter(scene, 0)
        this.timeCounter = new TimeCounter(scene, this.coinCounter.nearTextCoin.height)
        this.lifeCounter = new LifeCounter(scene)
    }

    public incrementCoinCounter(): void {
        this.coinCounter.increment()
        this.timeCounter.addTimeCounter++

        if (this.timeCounter.addTimeCounter >= GAME_PARAMETERS.addTimeEveryNumberOfCoins) {
            this.timeCounter.addTime()
            this.timeCounter.addTimeCounter = 0
        }
    }
}