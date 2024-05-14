import { PLATFORM_MAP_KEYS } from "../constants";
import { PlatformManager } from "../objects/_index";

export class EndlessPlainGenerator {
    private _manager: PlatformManager;
    constructor(manager: PlatformManager) {
        this._manager = manager
        this.checkNeededAssets()
    }
    public generate() {

    }

    private checkNeededAssets() {
        const loadedMap = this._manager.scene.assetManager.loadedPlatformMaps.includes(PLATFORM_MAP_KEYS.BASE)
        if (!loadedMap) throw new Error("Map asset for EndlessPlainGenerator is not loaded.")
    }
}