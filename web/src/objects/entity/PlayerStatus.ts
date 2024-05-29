import { Scene } from "phaser";
import { CoinCounter } from "./CoinCounter";
import { TimeCounter } from "./TimeCounter";
import { LifeCounter } from "./LifeCounter";
import { IPlayerStatus } from "../../interfaces/_index";

export class PlayerStatus implements IPlayerStatus {
    public coinCounter: CoinCounter;
    public timeCounter: TimeCounter;
    public lifeCounter: LifeCounter;

    constructor(scene: Scene) {
        this.coinCounter = new CoinCounter(scene, 0)
        this.timeCounter = new TimeCounter(scene, this.coinCounter.nearTextCoin.height)
        this.lifeCounter = new LifeCounter(scene)
    }
}