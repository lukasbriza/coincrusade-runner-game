import { AssetHelper } from "../helpers/_index";
import { setupAssetbase } from "./setupAssetBase";

export const setupDynamicSpriteBase = (assetHelper: AssetHelper, tileName: string, x: number, y: number) => {
    const platformSpeed = window.configurationManager.platformStartSpeed
    const sprite = assetHelper.addDynamicSprite(tileName, x, y)
    setupAssetbase(sprite)
    sprite.setVelocityX(platformSpeed * -1)
    return sprite
}