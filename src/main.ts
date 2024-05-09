import "./styles/style.css"
import projectConfig from "../public/assets/config.json"
import { Game, Types, AUTO, Scale } from "phaser";
import { sizes } from "./constants";
import { GameScene } from "./scenes";
import { GAME_PARAMETERS } from "./configurations";

const gameConfig: Types.Core.GameConfig = {
    type: AUTO,
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
    width: sizes.width,
    height: sizes.height,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: GAME_PARAMETERS.gravityX, x: 0 },
            debug: projectConfig.debugMode
        }
    },
    scene: GameScene
}

const game = new Game(gameConfig);
export default game