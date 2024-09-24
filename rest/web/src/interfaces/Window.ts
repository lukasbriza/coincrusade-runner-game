import { Game } from "phaser";
import { IConfigurationManager, IGameState } from "./_index";

declare global {
    interface Window {
        game: Game
        configurationManager: IConfigurationManager
        gameState: IGameState
    }
}

