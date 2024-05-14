import { Scene } from "phaser"
import { KEYS, PLATFORM_KEYS, SCENE_KEYS } from "../constants"
import { Knight, AssetManager, PlatformManager } from "../objects/_index"

export class GameScene extends Scene {
    public knight: Knight;
    public assetManager: AssetManager;
    public platformManager: PlatformManager

    constructor() {
        super(SCENE_KEYS.MAIN)
        this.assetManager = new AssetManager(this)
    }

    preload() {
        this.assetManager.loadAssets([
            KEYS.BACKGROUND,
            KEYS.SPRITE_KNIGHT_RUN,
            KEYS.SPRITE_KNIGHT_JUMP,
            KEYS.SPRITE_KNIGHT_ATTACK,
            KEYS.SPRITE_KNIGHT_POWERBAR
        ])
        this.assetManager.loadPlatforms([
            PLATFORM_KEYS.GROUND
        ])
        this.assetManager.loadPlatformMaps()

    }
    create() {
        //BACKGROUND SETUP
        this.assetManager.addBackgroundToScene(KEYS.BACKGROUND)
        //PLATFORM MANAGER SETUP
        this.platformManager = new PlatformManager(this)
        //KNIGHT SETUP
        this.knight = new Knight(this)

        //HANDLE RESIZE OF SCREEN
        this.game.events.addListener("resize", () => {
            //this.assetManager.refreshBackgroundImage()
        })
    }
    update() {
        this.knight.update()
        this.platformManager.update()
    }
}