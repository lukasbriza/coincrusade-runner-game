import { Physics, Scene } from "phaser";
import { KEYS } from "../../constants";
import { AssetHelper } from "../../helpers/_index";
import { ILife } from "../../interfaces/_index";

export class Life extends Physics.Arcade.Sprite implements ILife {
    constructor(scene: Scene, key?: KEYS, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0, key ?? KEYS.HEART_FULL)
        const assetHelper = new AssetHelper(scene)
        assetHelper.addExistingSprite(this)
    }
}