import { Physics, Textures } from "phaser";
import { sizes } from "../constants";


export const placeAlongScreenWidth = (staticGroup: Physics.Arcade.StaticGroup, img: Textures.Texture, key: string, yPlaceLine: number) => {
    const width = img.getSourceImage().width
    const copyNum = Math.ceil(sizes.width / width)

    for (let i = 0; i < copyNum; i++) {
        const x = i === 0 ? width / 2 : (width / 2) + i * width
        const platform: Physics.Arcade.Sprite = staticGroup.create(x, yPlaceLine, key)
        platform.body?.updateFromGameObject()
    }
}