import { Physics, Scene } from "phaser";
import { ANIMATION_KEYS, SPRITE_KEYS } from "../constants";
import { CoinCounter } from "./CoinCounter";
import { AssetHelper } from "../helpers/_index";

export class Coin extends Physics.Arcade.Sprite {
    constructor(scene: Scene, x: number, y: number, gravity: boolean = true) {
        super(scene, x, y, SPRITE_KEYS.SPRITE_COIN)
        const assetHelper = new AssetHelper(scene)
        assetHelper.addExistingSprite(this)

        gravity && this.setGravityY(350)
        this.setDepth(0)
        this.init()
    }
    private init() {
        if (!this.anims.animationManager.get(ANIMATION_KEYS.ANIMATION_SPRITE_COIN)) {
            this.scene.anims.create({
                key: ANIMATION_KEYS.ANIMATION_SPRITE_COIN,
                frames: this.scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_COIN, {
                    prefix: "coin-",
                    end: 5,
                }),
                frameRate: 10
            })
        }
        this.anims.play({ key: ANIMATION_KEYS.ANIMATION_SPRITE_COIN, repeat: -1 })
    }
    public pickCoin(coinCounter: CoinCounter, target: Coin) {
        setTimeout(() => {
            target.setGravityY(0)
            target.setImmovable(false)
            target.setCollideWorldBounds(false)
            target.setVelocityX(0)
            this.scene.physics.moveToObject(target, coinCounter.nearTextCoin, 60, 1500)

        }, 300)
    }
}