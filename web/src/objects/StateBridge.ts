import { Scene } from "phaser";
import { Eventhelper } from "../helpers/_index";
import { EVENTS } from "../constants";

export class StateBridge {
    constructor(scene: Scene) {
        const gState = window.gameState
        const helper = new Eventhelper(scene)
        helper.addListener(EVENTS.COIN_GENERATED, gState.incrementGeneratedCoin, gState)
        helper.addListener(EVENTS.COIN_PICKED, gState.incrementPickedCoin, gState)
        helper.addListener(EVENTS.LIVE_DECREASED, gState.incrementLostLives, gState)
        helper.addListener(EVENTS.SLOPE_OVERCOM, gState.incrementOvercomedSlopes, gState)
    }
}