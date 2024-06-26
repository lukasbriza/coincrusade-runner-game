import { GameObjects, Physics, Scene, Types } from "phaser";
import { FONT_KEYS, FONTS, IMAGES, KEYS, PLATFORM_MAP_KEYS, PLATFORMS_MAPS, SPRITE_KEYS, SPRITES } from "../constants";
import { IAssetHelper, MapType } from "../interfaces/_index";

export class AssetHelper implements IAssetHelper {
    public scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene
    }
    //LOADERS
    public loadSprite(key: SPRITE_KEYS): void {
        const sprite = SPRITES[key]
        this.scene.load.atlas(key, sprite.sheet, sprite.atlas)
    }
    public loadSprites(keys: SPRITE_KEYS[]): void {
        keys.forEach(key => this.loadSprite(key))
    }
    public loadImage(key: KEYS): void {
        const image = IMAGES[key]
        this.scene.load.image(key, image.path)
    }
    public loadImages(keys: KEYS[]): void {
        keys.forEach(key => this.loadImage(key))
    }
    public loadPlatformMap(key: PLATFORM_MAP_KEYS): void {
        const map = PLATFORMS_MAPS[key]
        this.scene.load.json(key, map.path)
    }
    public loadPlatformMaps(keys: PLATFORM_MAP_KEYS[]): void {
        keys.forEach(key => this.loadPlatformMap(key))
    }
    public loadFont(key: FONT_KEYS): void {
        const font = FONTS[key]
        this.scene.load.bitmapFont(key, font.sheet, font.bitmap)
    }

    //ADD TO SCENE
    public addImage(key: KEYS, x?: number, y?: number): GameObjects.Image {
        return this.scene.add.image(x ?? 0, y ?? 0, key)
    }
    public addSprite(key: SPRITE_KEYS, x?: number, y?: number): GameObjects.Sprite {
        return this.scene.add.sprite(x ?? 0, y ?? 0, key)
    }
    public addDynamicSprite(key: string, x?: number, y?: number): Types.Physics.Arcade.SpriteWithDynamicBody {
        return this.scene.physics.add.sprite(x ?? 0, y ?? 0, key)
    }
    public addDynamicImage(key: string, x?: number, y?: number): Types.Physics.Arcade.ImageWithDynamicBody {
        return this.scene.physics.add.image(x ?? 0, y ?? 0, key)
    }
    public addExistingSprite(sprite: Physics.Arcade.Sprite, physics: boolean = true): Physics.Arcade.Sprite {
        const asset = this.scene.add.existing(sprite)
        if (physics) return this.scene.physics.add.existing(sprite)
        return asset
    }
    public addText(key: FONT_KEYS, x: number, y: number, text?: string): GameObjects.BitmapText {
        return this.scene.add.bitmapText(x, y, key, text)
    }

    //GETTERS
    public getPlatformMap(key: PLATFORM_MAP_KEYS) {
        const json = this.scene.cache.json.get(key)
        const ctrl = new Object(json);
        if (
            ctrl.hasOwnProperty("width") &&
            ctrl.hasOwnProperty("difficulty") &&
            ctrl.hasOwnProperty("map")
        ) {
            return json as MapType
        } else {
            throw new Error(`Unexpected error in AssetLoader.getPlatformMap with key: ${key}`)
        }
    }
}