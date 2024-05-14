import { PLATFORM_MAP_KEYS } from "../constants";
import { MapType } from "../interfaces/_index";
import { GameScene } from "../scenes/_index";

export class AssetLoader {
    public scene: GameScene;
    constructor(scene: GameScene) {
        this.scene = scene
    }

    public loadAtlas(key: string, sheetPath: string, atlasPath: string) {
        this.scene.load.atlas(key, sheetPath, atlasPath)
    }
    public loadImage(key: string, imagePath: string) {
        this.scene.load.image(key, imagePath)
    }
    public loadJson(key: string, path: string) {
        this.scene.load.json(key, path)
    }
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