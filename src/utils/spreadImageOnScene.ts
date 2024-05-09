import { GameObjects } from "phaser";
import { sizes } from "../constants";

export const spreadImageOnScene = (img: GameObjects.Image) => {
    img.setPosition(sizes.width / 2, sizes.height / 2);
    const scaleX = (sizes.width / img.width);
    const scaleY = (sizes.height / img.height);
    const scale = Math.max(scaleX, scaleY);
    img.setScale(scale);
}