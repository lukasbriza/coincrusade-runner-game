import { GameObjects, Scene } from "phaser";
import { FONT_KEYS } from "../constants";
import { Coin } from "./Coin";
import { AssetHelper } from "../helpers/_index";

export class CoinCounter {
    private scene: Scene;
    public count: number = 0;
    public textTexture: GameObjects.BitmapText;
    public nearTextCoin: Coin;

    constructor(scene: Scene, y?: number) {
        const assetHelper = new AssetHelper(scene)
        this.scene = scene
        this.textTexture = assetHelper.addText(FONT_KEYS.MAIN, 0, 0, "0")
        this.textTexture.setOrigin(1, 0)
        this.textTexture.setScale(2, 2)
        this.textTexture.setPosition(scene.renderer.width - 25, y ?? 0)
        this.nearTextCoin = new Coin(scene, 0, y ?? 0, false)
        this.nearTextCoin.setOrigin(0.5, 0.5)
        this.setActualCoinPosition()
    }

    private setActualCoinPosition() {
        const x = this.scene.renderer.width - 30 - this.textTexture.width - (this.nearTextCoin.width / 2)
        const y = this.textTexture.y + (this.textTexture.height / 2) + 3
        this.nearTextCoin.setPosition(x, y)
    }

    public increment() {
        this.count++
        this.textTexture.setText(this.count.toString())
        this.setActualCoinPosition()
    }

    public reset() {
        this.count = 0
        this.textTexture.setText(this.count.toString())
        this.setActualCoinPosition()
    }
}