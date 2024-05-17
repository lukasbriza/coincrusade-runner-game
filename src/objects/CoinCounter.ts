import { GameObjects } from "phaser";
import { FONT_KEYS } from "../constants";
import { GameScene } from "../scenes/_index";
import { Coin } from "./Coin";

export class CoinCounter {
    private scene: GameScene;
    public count: number = 0;
    public textTexture: GameObjects.BitmapText;
    public nearTextCoin: Coin;

    constructor(scene: GameScene) {
        this.scene = scene

        this.textTexture = scene.assetHelper.addText(FONT_KEYS.MAIN, 0, 0, "0")
        this.textTexture.setOrigin(1, 0)
        this.textTexture.setScale(2, 2)
        this.textTexture.setPosition(scene.renderer.width - 25, 0)
        this.nearTextCoin = new Coin(scene, 0, 0, false)
        this.nearTextCoin.setOrigin(1, 0)
        this.setActualCoinPosition()
    }

    private setActualCoinPosition() {
        const x = this.scene.renderer.width - 30 - this.textTexture.width
        const y = (this.textTexture.height - this.nearTextCoin.height) / 1.5
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