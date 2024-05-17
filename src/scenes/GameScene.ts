import { Scene } from "phaser"
import { FONT_KEYS, KEYS, PLATFORM_MAP_KEYS, SCENE_KEYS, SPRITE_KEYS } from "../constants"
import { Knight, PlatformManager, CoinCounter, Coin } from "../objects/_index"
import { spreadImageOnScene } from "../utils/_index";
import { AssetHelper } from "../helpers/_index";
import { ColliderObject } from "../interfaces/_index";

export class GameScene extends Scene {
    public knight: Knight;
    public coinCounter: CoinCounter
    public assetHelper: AssetHelper;
    public platformManager: PlatformManager;

    constructor() {
        super(SCENE_KEYS.MAIN)
        this.assetHelper = new AssetHelper(this)
    }
    preload() {
        this.physics.world.setFPS(50)
        //LOAD ASSETS
        this.assetHelper.loadSprites([
            SPRITE_KEYS.SPRITE_KNIGHT_RUN,
            SPRITE_KEYS.SPRITE_KNIGHT_ATTACK,
            SPRITE_KEYS.SPRITE_KNIGHT_JUMP,
            SPRITE_KEYS.SPRITE_COIN
        ])
        this.assetHelper.loadImages([
            KEYS.GROUND,
            KEYS.BACKGROUND,
            KEYS.KNIGHT_POWERBAR,
            KEYS.KNIGHT_SLIDE
        ])
        this.assetHelper.loadPlatformMaps([
            PLATFORM_MAP_KEYS.BASE
        ])
        this.assetHelper.loadFont(FONT_KEYS.MAIN)

    }
    create() {
        //BACKGROUND SETUP
        const background = this.assetHelper.addImage(KEYS.BACKGROUND, window.game.renderer.width / 2, window.game.renderer.height * 0.60)
        spreadImageOnScene(background)
        //PLATFORM MANAGER SETUP
        this.platformManager = new PlatformManager(this)
        //KNIGHT SETUP
        this.knight = new Knight(this)
        //COIN COUNTER
        this.coinCounter = new CoinCounter(this)

        //COLLIDERS
        this.physics.add.collider(this.knight, this.platformManager.activeGroup, this.knight.onCollideWithWorld, undefined, this.knight)
        this.physics.add.collider(this.platformManager.coinGroup, this.platformManager.activeGroup)
        this.physics.add.collider(
            this.knight,
            this.platformManager.coinGroup,
            undefined,
            (_, coin: ColliderObject) => {
                (coin as Coin)?.pickCoin(this.coinCounter, coin as Coin)
                return false
            }
        )
        this.physics.add.collider(this.coinCounter.nearTextCoin, this.platformManager.coinGroup, undefined, (_, coin: ColliderObject) => {
            this.coinCounter.increment()
            this.platformManager.removeCoinFromGroup(coin as Coin)
            coin.destroy()
            return false
        })
    }
    update() {
        this.knight.update()
    }
}