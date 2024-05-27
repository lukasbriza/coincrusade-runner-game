import { Game } from "phaser";
import { IConfigurationManager } from "./_index";

declare global {
    interface Window {
        game: Game
        configurationManager: IConfigurationManager
    }
}

