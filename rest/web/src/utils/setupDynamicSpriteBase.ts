import { AssetHelper } from "../helpers/_index";
import { setupAssetbase } from "./setupAssetBase";

export const setupDynamicSpriteBase = (assetHelper: AssetHelper, tileName: string, x: number, y: number) => {
  const sprite = assetHelper.addDynamicSprite(tileName, x, y)
  setupAssetbase(sprite)
  return sprite
}
