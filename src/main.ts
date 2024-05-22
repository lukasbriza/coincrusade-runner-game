import "./styles/style.css"
import { Game, Types, Scale, WEBGL } from "phaser";
import { screenSizes } from "./constants";
import { GameScene } from "./scenes/_index";
import { GAME_PARAMETERS } from "./configurations/_index";
import { onWindowResize } from "./utils/onWindowResize";
import { ConfigurationManager } from "./configurations/_index";

const parent = document.getElementById("gameContainer")

const gameConfig: Types.Core.GameConfig = {
    type: WEBGL,
    scale: {
        mode: Scale.ScaleModes.NONE,
        width: screenSizes.width,
        height: screenSizes.height,

    },
    physics: {
        default: "arcade",
        arcade: {
            debug: GAME_PARAMETERS.debug,
        },

    },
    render: {
        antialiasGL: false,
        pixelArt: true
    },
    parent: parent ?? undefined,
    canvasStyle: "display:block; width: 100%; height:100%",
    autoFocus: true,
    callbacks: {

    },
    scene: GameScene
}

window.configurationManager = new ConfigurationManager()
window.onresize = () => onWindowResize()
window.game = new Game(gameConfig);