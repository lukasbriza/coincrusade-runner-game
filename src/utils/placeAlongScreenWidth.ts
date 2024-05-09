import { Physics, Scene } from "phaser";
import { sizes } from "../constants";


export const placeAlongScreenWidth = (scene: Scene, key: string, yPlaceLine: number) => {
    const staticGroup = scene.physics.add.staticGroup()
    const image = scene.game.textures.get(key)

    const width = image.getSourceImage().width
    const copyNum = Math.ceil(sizes.width / width)

    for (let i = 0; i < copyNum; i++) {
        const x = i === 0 ? width / 2 : (width / 2) + i * width
        const platform: Physics.Arcade.Sprite = staticGroup.create(x, yPlaceLine, key)
        platform.body?.updateFromGameObject()
    }
}