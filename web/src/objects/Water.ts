import { Physics, Scene } from "phaser";
import { ANIMATION_KEYS, SPRITE_KEYS } from "../constants";
import { AssetHelper } from "../helpers/_index";
import { IWater } from "../interfaces/_index";

export class Water extends Physics.Arcade.Sprite implements IWater {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, SPRITE_KEYS.SPRITE_WATER)
        const assetHelper = new AssetHelper(scene)
        assetHelper.addExistingSprite(this)
        this.anims.play({ key: ANIMATION_KEYS.ANIMATION_SPRITE_WATER, repeat: -1 })
    }
}