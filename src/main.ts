import "./styles/style.css"
import { Game, Types, AUTO, Scale } from "phaser";
import { sizes } from "./constants";
import { GameScene } from "./scenes";

const speedDown = 300

const gameConfig: Types.Core.GameConfig = {
    type: AUTO,
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
    width: sizes.width,
    height: sizes.height,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: speedDown, x: 0 },
            debug: true
        }
    },
    scene: GameScene
}

const game = new Game(gameConfig);
export default game