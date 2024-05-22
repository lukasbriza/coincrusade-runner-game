import { Scene } from "phaser"
import { ANIMATION_KEYS, FONT_KEYS, KEYS, PLATFORM_MAP_KEYS, SCENE_KEYS, SPRITE_KEYS } from "../constants"
import { Knight, PlatformManager, Coin, PlayerStatus } from "../objects/_index"
import { spreadImageOnScene } from "../utils/_index";
import { AssetHelper } from "../helpers/_index";
import { ColliderObject } from "../interfaces/_index";
import { GAME_PARAMETERS } from "../configurations/_index";

export class GameScene extends Scene {
    public knight: Knight;
    public playerStatus: PlayerStatus;
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
            SPRITE_KEYS.SPRITE_COIN,
            SPRITE_KEYS.SPRITE_WATER
        ])
        this.assetHelper.loadImages([
            KEYS.GROUND,
            KEYS.BACKGROUND,
            KEYS.KNIGHT_POWERBAR,
            KEYS.KNIGHT_SLIDE,
            KEYS.ROCK1,
            KEYS.ROCK2,
            KEYS.GRASS1,
            KEYS.GRASS2,
            KEYS.SLIM_GROUND,
            KEYS.TREE,
            KEYS.STUMP1,
            KEYS.STUMP2,
            KEYS.TENT1,
            KEYS.TENT2,
            KEYS.PUMPKIN
        ])
        this.assetHelper.loadPlatformMaps([
            PLATFORM_MAP_KEYS.BASE,
            PLATFORM_MAP_KEYS.FLAT1,
            PLATFORM_MAP_KEYS.FLAT2,
            PLATFORM_MAP_KEYS.FLAT3,
            PLATFORM_MAP_KEYS.FLAT4,
            PLATFORM_MAP_KEYS.FLAT5,
            PLATFORM_MAP_KEYS.FLAT6,
            PLATFORM_MAP_KEYS.FLAT7,
            PLATFORM_MAP_KEYS.FLAT8,
            PLATFORM_MAP_KEYS.FLAT9,
            PLATFORM_MAP_KEYS.FLAT10,
            PLATFORM_MAP_KEYS.FLAT11,
            PLATFORM_MAP_KEYS.ISLAND1,
            PLATFORM_MAP_KEYS.ISLAND2,
            PLATFORM_MAP_KEYS.ISLAND3,
            PLATFORM_MAP_KEYS.ISLAND4,
            PLATFORM_MAP_KEYS.ISLAND5,
            PLATFORM_MAP_KEYS.ISLAND6,
            PLATFORM_MAP_KEYS.ISLAND7,
            PLATFORM_MAP_KEYS.ISLAND8,
            PLATFORM_MAP_KEYS.ISLAND9,
            PLATFORM_MAP_KEYS.ISLAND10,
            PLATFORM_MAP_KEYS.ISLAND11,
            PLATFORM_MAP_KEYS.ISLAND12,
            PLATFORM_MAP_KEYS.SEA1,
            PLATFORM_MAP_KEYS.SEA2,
            PLATFORM_MAP_KEYS.SEA3,
            PLATFORM_MAP_KEYS.SEA4,
        ])
        this.assetHelper.loadFont(FONT_KEYS.MAIN)
    }
    create() {
        this.initAnimaitons()
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
        this.physics.add.collider(
            this.knight,
            this.platformManager.activeGroup,
            this.knight.onCollideWithWorld,
            undefined,
            this.knight
        )
        this.physics.add.collider(
            this.platformManager.coinGroup,
            this.platformManager.activeGroup,
            undefined, (coin: ColliderObject, _) => {
                return !(coin as Coin).isPicked
            })
        this.physics.add.collider(
            this.knight,
            this.platformManager.coinGroup,
            undefined,
            (_, coin: ColliderObject) => {
                (coin as Coin)?.pickCoin(this.playerStatus.coinCounter, coin as Coin)
                return false
            }
        )
        this.physics.add.collider(this.playerStatus.coinCounter.nearTextCoin, this.platformManager.coinGroup, undefined, (_, coin: ColliderObject) => {
            this.playerStatus.incrementCoinCounter()
            this.platformManager.removeCoinFromGroup(coin as Coin)
            coin.destroy()
            return false
        })
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
}