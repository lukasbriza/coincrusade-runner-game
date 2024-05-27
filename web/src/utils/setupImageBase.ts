import { AssetHelper } from "../helpers/_index";
import { v4 as uuidv4 } from 'uuid';

export const setupImageBase = (assetHelper: AssetHelper, tileName: string, x: number, y: number) => {
    const platformSpeed = window.configurationManager.platformStartSpeed
    const image = assetHelper.addDynamicImage(tileName, x, y)
    image.setOrigin(0.5, 1)
    image.setImmovable(true)
    image.setCollideWorldBounds(false)
    image.setFriction(0, 0)
    image.setName(uuidv4())
    image.setVelocityX(platformSpeed * -1)
    return image
}