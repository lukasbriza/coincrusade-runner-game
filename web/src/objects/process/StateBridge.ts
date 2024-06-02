import { Scene } from "phaser";
import { Eventhelper } from "../../helpers/_index";
import { EVENTS } from "../../constants";

export class StateBridge {
    constructor(scene: Scene) {
        const gState = window.gameState
        const helper = new Eventhelper(scene)
        helper.addListener(EVENTS.COIN_GENERATED, gState.incrementGeneratedCoin, gState)
        helper.addListener(EVENTS.COIN_PICKED, gState.incrementPickedCoin, gState)
        helper.addListener(EVENTS.LIVE_DECREASED, gState.incrementLostLives, gState)
        //helper.addListener(EVENTS.LIFE_ADDED, gState.decreaseLastchunkLostLives, gState)
        helper.addListener(EVENTS.SLOPE_OVERCOME, gState.incrementOvercomedSlopes, gState)
        helper.addListener(EVENTS.SECOND_PASSED, gState.incrementElapsedSeconds, gState)
        helper.addListener(EVENTS.TIME_GAINED, gState.incrementGainedSeconds, gState)
        helper.addListener(EVENTS.LOG_MAP_DIFFICULTY, gState.logMapDifficulty, gState)
        helper.addListener(EVENTS.CHUNK_END, gState.saveChunk, gState)
    }
}