import { Physics, Scene } from "phaser"
import { ANIMATION_KEYS, EVENTS, FONT_KEYS, KEYS, PLATFORM_MAP_KEYS, SCENE_KEYS, SPRITE_KEYS } from "../constants"
import { Knight, PlatformManager, Coin, PlayerStatus, StateBridge } from "../objects/_index"
import { spreadImageOnScene } from "../utils/_index";
import { AssetHelper, Eventhelper } from "../helpers/_index";
import { ColliderObject } from "../interfaces/_index";
import { GAME_PARAMETERS } from "../configurations/_index";

export class GameScene extends Scene {
    public knight: Knight;
    public playerStatus: PlayerStatus;
    public assetHelper: AssetHelper;
    public platformManager: PlatformManager;
    public eventHelper: Eventhelper;

    constructor() {
        super(SCENE_KEYS.MAIN)
        this.assetHelper = new AssetHelper(this)
        this.eventHelper = new Eventhelper(this)
    }
    preload() {
        this.physics.world.setFPS(50)
        //LOAD ASSETS
        const sprites = Object.keys(SPRITE_KEYS).map(key => SPRITE_KEYS[key as keyof typeof SPRITE_KEYS])
        const keys = Object.keys(KEYS).map(key => KEYS[key as keyof typeof KEYS])
        const platforms = Object.keys(PLATFORM_MAP_KEYS).map(key => PLATFORM_MAP_KEYS[key as keyof typeof PLATFORM_MAP_KEYS])
        this.assetHelper.loadSprites(sprites)
        this.assetHelper.loadImages(keys)
        this.assetHelper.loadPlatformMaps(platforms)
        this.assetHelper.loadFont(FONT_KEYS.MAIN)
    }
    create() {
        new StateBridge(this)
        this.initAnimaitons()
        this.initCheckers()
        //BACKGROUND SETUP
        const background = this.assetHelper.addImage(KEYS.BACKGROUND, window.game.renderer.width / 2, window.game.renderer.height * 0.60)
        spreadImageOnScene(background)
        //PLATFORM MANAGER SETUP
        this.platformManager = new PlatformManager(this)
        //PLAYER STATUS
        this.playerStatus = new PlayerStatus(this)
        //KNIGHT SETUP
        this.knight = new Knight(this)

        //COLLIDERS
        const statusCoin = this.playerStatus.coinCounter.nearTextCoin
        const activeGroup = this.platformManager.activeGroup
        const coinGroup = this.platformManager.coinGroup
        const obstacleGroup = this.platformManager.obstacleGroup
        const coinCounter = this.playerStatus.coinCounter

        this.physics.add.collider(this.knight, activeGroup, this.knight.onCollideWithWorld, undefined, this.knight)
        this.physics.add.collider(this.knight, obstacleGroup, (_: ColliderObject, obstacle: ColliderObject) => { this.eventHelper.dispatch(EVENTS.KNIGHT_HIT, _, obstacle) })
        this.physics.add.collider(coinGroup, activeGroup, undefined, (coin: ColliderObject, _) => { return !(coin as Coin).isPicked })
        this.physics.add.collider(this.knight, coinGroup, undefined, (_, coin: ColliderObject) => {
            (coin as Coin)?.pickCoin(coinCounter, coin as Coin)
            return false
        })
        this.physics.add.collider(statusCoin, coinGroup, undefined, (_, coin: ColliderObject) => {
            this.eventHelper.dispatch(EVENTS.COIN_PICKED, coin)
            coin.destroy()
            return false
        })

        //this.eventHelper.timer(1000, () => { console.log(window.gameState.getState()) }, this, undefined, true)
    }
    update() {
        this.knight.update()
    }
    private initAnimaitons() {
        //ANIMATIONS
        this.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_RUN,
            frames: this.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_RUN, {
                prefix: "run-",
                end: 6,
            }),
            frameRate: GAME_PARAMETERS.knightStartFramerate,
        })
        this.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_JUMP,
            frames: this.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_JUMP, {
                prefix: "jump-",
                end: 3
            }),
            frameRate: 5
        })
        this.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_ATTACK,
            frames: this.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_ATTACK, {
                prefix: "attack-",
                end: 5
            }),
            frameRate: 10
        })
        this.anims.create({
            key: ANIMATION_KEYS.ANIMATION_SPRITE_COIN,
            frames: this.anims.generateFrameNames(SPRITE_KEYS.SPRITE_COIN, {
                prefix: "coin-",
                end: 5,
            }),
            frameRate: 10
        })
        this.anims.create({
            key: ANIMATION_KEYS.ANIMATION_SPRITE_WATER,
            frames: this.anims.generateFrameNames(SPRITE_KEYS.SPRITE_WATER, {
                prefix: "water-",
                end: 2,
            }),
            frameRate: 7
        })
    }

    //SCAN DISPLAYLIST OF SCENE AND LOG DATA TO GAME STATE
    private initCheckers() {
        this.eventHelper.timer(250, () => {
            this.sys.displayList.list.map(el => {
                const coinCheck = el instanceof Coin
                    && !el.onScene
                    && !el.inCoinCounter
                    && el.x < this.renderer.width
                const slopeTriggerCheck = el instanceof Physics.Arcade.Sprite
                    && el.texture.key === KEYS.GROUND
                    && el.alpha === 0
                    && el.x < this.renderer.width
                    && el.getData("checked") !== true

                if (coinCheck) {
                    let coin = el
                    coin.onScene = true
                    this.eventHelper.dispatch(EVENTS.COIN_GENERATED)
                    return coin
                }
                if (slopeTriggerCheck) {
                    if (typeof el.getData("mapDifficulty") === "number") {
                        let mapLogtrigger = el
                        mapLogtrigger.setData({ checked: true })
                        this.eventHelper.dispatch(EVENTS.LOG_MAP_DIFFICULTY, el.getData("mapDifficulty"))
                        return mapLogtrigger
                    }
                    if (el.getData("chunkEnd") !== undefined) {
                        let chunkEndTrigger = el
                        chunkEndTrigger.setData({ checked: true })
                        this.eventHelper.dispatch(EVENTS.CHUNK_END)
                    }
                }
                return el
            })
        }, this, undefined, true)
    }
}