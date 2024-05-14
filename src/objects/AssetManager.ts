import { Image, Sprite } from "../interfaces/_index";
import { IMAGES, KEYS, PLATFORMS_MAPS, PLATFORM_KEYS, PLATFORMS } from "../constants";
import { spreadImageOnScene } from "../utils/_index";
import { GameScene } from "../scenes/GameScene";
import { GameObjects, Physics } from "phaser";
import { AssetLoader } from "./AssetLoader";

export class AssetManager extends AssetLoader {
    private _background: GameObjects.Image;

    public loadedAssets: KEYS[] = [];
    public loadedPlatforms: PLATFORM_KEYS[] = [];
    public loadedPlatformMaps: string[] = []

    constructor(scene: GameScene) {
        super(scene)
    }

    public loadPlatformMaps() {
        PLATFORMS_MAPS.forEach(map => {
            this.loadJson(map.key, map.path)
            this.loadedPlatformMaps.push(map.key)
        })
    }

    public loadAsset(key: KEYS) {
        const imageObject = IMAGES[key]
        const obj = new Object(imageObject)

        switch (obj.hasOwnProperty("atlas") && obj.hasOwnProperty("sheet")) {
            case true:
                const sprite = imageObject as Sprite
                this.loadAtlas(key, sprite.sheet, sprite.atlas)
                break;
            case false:
                const image = imageObject as Image
                this.loadImage(key, image.path)
        }
        this.loadedAssets.push(key)
    }

    public loadAssets(keys: KEYS[]) {
        keys.forEach((key) => this.loadAsset(key))
    }

    public loadPlatforms(keys: PLATFORM_KEYS[]) {
        keys.forEach(key => {
            this.loadImage(key, PLATFORMS[key].path)
            this.loadedPlatforms.push(key)
        })
    }

    public addBackgroundToScene(key: KEYS, x?: number, y?: number) {
        if (this.loadedAssets.includes(key)) {
            //Place to center
            this._background = this.scene.add.image(x ?? window.game.renderer.width / 2, y ?? window.game.renderer.height * 0.60, key)
            //Spread
            spreadImageOnScene(this._background)
        }
    }

    public refreshBackgroundImage() {
        spreadImageOnScene(this._background)
    }

    public addExistingSpriteToScene(sprite: Physics.Arcade.Sprite, physics: boolean = true) {
        if (this.loadedAssets.includes(sprite.texture.key as KEYS)) {
            this.scene.add.existing(sprite)
            if (physics) {
                return this.scene.physics.add.existing(sprite)
            }
        } else {
            throw Error(`Sprite ${sprite.texture.key} is not loaded via AssetManager.`)
        }
    }

    public addSpriteToScene(key: KEYS, x: number, y: number) {
        if (this.loadedAssets.includes(key)) {
            return this.scene.add.sprite(x, y, key)
        } else {
            throw Error(`Sprite ${key} is not loaded via AssetManager.`)
        }
    }

    public addImageToScene(key: KEYS, x?: number, y?: number) {
        if (this.loadedAssets.includes(key)) {
            return this.scene.add.image(x ?? 0, y ?? 0, key)
        } else {
            throw Error(`Image ${key} is not loaded via AssetManager.`)
        }
    }

}