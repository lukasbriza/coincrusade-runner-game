import { Physics, Scene } from "phaser";
import { ANIMATION_KEYS, SPRITE_KEYS } from "../../constants";
import { CoinCounter } from "./CoinCounter";
import { AssetHelper, Eventhelper } from "../../helpers/_index";
import { ICoin } from "../../interfaces/_index";

export class Coin extends Physics.Arcade.Sprite implements ICoin {
    private eventHelper: Eventhelper;
    public isPicked: boolean = false;
    public onScene: boolean = false;
    public inCoinCounter: boolean = false;

    constructor(scene: Scene, x: number, y: number, gravity: boolean = true) {
        super(scene, x, y, SPRITE_KEYS.SPRITE_COIN)
        this.eventHelper = new Eventhelper(scene)
        const assetHelper = new AssetHelper(scene)
        assetHelper.addExistingSprite(this)

        gravity && this.setGravityY(350)
        this.setDepth(0)
        this.anims.play({ key: ANIMATION_KEYS.ANIMATION_SPRITE_COIN, repeat: -1 })
        this.on("addedtoscene", () => { console.log("at scene") })
    }
    public pickCoin(coinCounter: CoinCounter, target: Coin): void {
        const cb = () => {
            target.setGravityY(0)
            target.setImmovable(false)
            target.setCollideWorldBounds(false)
            target.setVelocityX(0)
            this.isPicked = true

            const b = Math.pow((this.scene.renderer.width - target.body!.x), 2)
            const a = Math.pow((this.scene.renderer.height - coinCounter.nearTextCoin.body!.y), 2)
            const speed = Math.sqrt(a + b)
            this.scene.physics.moveToObject(target, coinCounter.nearTextCoin, speed * 0.8)
        }
        this.eventHelper.timer(300, cb, this, undefined, false)
    }
}