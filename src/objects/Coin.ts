import { Physics } from "phaser";
import { ANIMATION_KEYS, SPRITE_KEYS } from "../constants";
import { GameScene } from "../scenes/GameScene";
import { CoinCounter } from "./CoinCounter";

export class Coin extends Physics.Arcade.Sprite {
    constructor(scene: GameScene, x: number, y: number, gravity: boolean = true) {
        super(scene, x, y, SPRITE_KEYS.SPRITE_COIN)
        scene.assetHelper.addExistingSprite(this)

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