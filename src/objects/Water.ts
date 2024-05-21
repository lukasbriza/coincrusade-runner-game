import { Physics, Scene } from "phaser";
import { ANIMATION_KEYS, SPRITE_KEYS } from "../constants";
import { AssetHelper } from "../helpers/_index";

export class Water extends Physics.Arcade.Sprite {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, SPRITE_KEYS.SPRITE_WATER)
        const assetHelper = new AssetHelper(scene)
        assetHelper.addExistingSprite(this)

        this.init()
    }

    private init() {
        if (!this.anims.animationManager.get(ANIMATION_KEYS.ANIMATION_SPRITE_WATER)) {
            this.scene.anims.create({
                key: ANIMATION_KEYS.ANIMATION_SPRITE_WATER,
                frames: this.scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_WATER, {
                    prefix: "water-",
                    end: 2,
                }),
                frameRate: 7
            })
        }
        this.anims.play({ key: ANIMATION_KEYS.ANIMATION_SPRITE_WATER, repeat: -1 })
    }
}