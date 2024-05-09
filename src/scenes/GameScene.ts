import { Scene } from "phaser"
import { IMG_KEYS, SCENE_KEYS, sizes } from "../constants"
import { placeAlongScreenWidth, spreadImageOnScene } from "../utils"

export class GameScene extends Scene {
    constructor() {
        super(SCENE_KEYS.MAIN)
    }
    preload() {
        this.load.image(IMG_KEYS.BACKGROUND, "assets/nature.png")
        this.load.image(IMG_KEYS.GROUND, "assets/ground.png")
    }
    create() {
        const background = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.60, IMG_KEYS.BACKGROUND)
        spreadImageOnScene(background)
        placeAlongScreenWidth(this, IMG_KEYS.GROUND, sizes.height)
    }
    update() { }
}