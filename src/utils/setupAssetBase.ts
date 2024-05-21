import { Physics, Types } from "phaser";
import { v4 as uuidv4 } from 'uuid';

export const setupAssetbase = (asset: Types.Physics.Arcade.SpriteWithDynamicBody | Physics.Arcade.Sprite) => {
    asset.setImmovable(true)
    asset.setCollisionCategory(1)
    asset.setFriction(0, 0)
    asset.setName(uuidv4())
}