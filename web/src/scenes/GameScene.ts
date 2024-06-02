import { Scene } from "phaser"
import { FONT_KEYS, KEYS, PLATFORM_MAP_KEYS, SCENE_KEYS, SPRITE_KEYS } from "../constants"
import { Knight, PlatformManager, PlayerStatus, StateBridge, AnimationsSetup, CollidersSetup, CheckersSetup } from "../objects/_index"
import { spreadImageOnScene } from "../utils/_index";
import { AssetHelper, Eventhelper } from "../helpers/_index";

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
        new AnimationsSetup(this)
        new CheckersSetup(this)

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
        new CollidersSetup(this)

        //this.eventHelper.timer(1000, () => { console.log(window.gameState.getState()) }, this, undefined, true)
    }
    update() {
        this.knight.update()
    }
}