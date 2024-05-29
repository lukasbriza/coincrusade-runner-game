import { GameObjects, Scene } from "phaser";
import { EVENTS, FONT_KEYS } from "../../constants";
import { Coin } from "./Coin";
import { AssetHelper, Eventhelper } from "../../helpers/_index";
import { ICoinCounter } from "../../interfaces/_index";

export class CoinCounter implements ICoinCounter {
    private scene: Scene;
    public count: number = 0;
    public textTexture: GameObjects.BitmapText;
    public nearTextCoin: Coin;
    private eventHelper: Eventhelper;

    constructor(scene: Scene, y?: number) {
        const assetHelper = new AssetHelper(scene)
        this.eventHelper = new Eventhelper(scene)

        this.scene = scene
        this.textTexture = assetHelper.addText(FONT_KEYS.MAIN, 0, 0, "0")
        this.textTexture.setOrigin(1, 0)
        this.textTexture.setScale(2, 2)
        this.textTexture.setPosition(scene.renderer.width - 25, y ?? 0)
        this.nearTextCoin = new Coin(scene, 0, y ?? 0, false)
        this.nearTextCoin.setOrigin(0.5, 0.5)
        this.nearTextCoin.inCoinCounter = true
        this.setActualCoinPosition()

        this.eventHelper.addListener(EVENTS.COIN_PICKED, this.increment, this)
    }

    private setActualCoinPosition(): void {
        const x = this.scene.renderer.width - 30 - this.textTexture.width - (this.nearTextCoin.width / 2)
        const y = this.textTexture.y + (this.textTexture.height / 2) + 3
        this.nearTextCoin.setPosition(x, y)
    }

    public increment(): void {
        this.count++
        this.textTexture.setText(this.count.toString())
        this.setActualCoinPosition()
    }

    public reset(): void {
        this.count = 0
        this.textTexture.setText(this.count.toString())
        this.setActualCoinPosition()
    }
}