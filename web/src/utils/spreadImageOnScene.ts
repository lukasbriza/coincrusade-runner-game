import { GameObjects } from "phaser";
import { screenSizes } from "../constants";

export const spreadImageOnScene = (img: GameObjects.Image) => {

    img.setPosition(screenSizes.width / 2, screenSizes.height / 2);
    const scaleX = (screenSizes.width / img.width);
    const scaleY = (screenSizes.height / img.height);
    const scale = Math.max(scaleX, scaleY);
    img.setScale(scale);
}