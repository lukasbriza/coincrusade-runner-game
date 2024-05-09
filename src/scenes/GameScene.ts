import { Scene } from "phaser"
import { SCENE_KEYS, sizes } from "../constants"
import { placeAlongScreenWidth, spreadImagEOnScene } from "../utils"

export class GameScene extends Scene {
    constructor() {
        super("game-scene")
    }
    preload() {
        this.load.image(SCENE_KEYS.BACKGROUND, "assets/nature.png")
        this.load.image(SCENE_KEYS.GROUND, "assets/ground.png")
    }
    create() {
        const background = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.60, SCENE_KEYS.BACKGROUND)
        spreadImagEOnScene(background)

        const groundGroup = this.physics.add.staticGroup()
        const groundImage = this.game.textures.get(SCENE_KEYS.GROUND)
        placeAlongScreenWidth(groundGroup, groundImage, SCENE_KEYS.GROUND, sizes.height)
    }
    update() { }
}