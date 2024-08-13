import { Physics, Scene } from "phaser";
import { Eventhelper } from "../../helpers/_index";
import { EVENTS, KEYS } from "../../constants";
import { Coin } from "../entity/Coin";

//SCAN DISPLAYLIST OF SCENE AND LOG DATA TO GAME STATE
export class CheckersSetup {
    constructor(scene: Scene) {
        const eventHelper = new Eventhelper(scene)
        eventHelper.timer(250, () => {
            scene.sys.displayList.list?.map(el => {
                const coinCheck = el instanceof Coin
                    && !el?.onScene
                    && !el.inCoinCounter
                    && el.x < scene.renderer.width
                const slopeTriggerCheck = el instanceof Physics.Arcade.Sprite
                    && el.texture.key === KEYS.GROUND
                    && el.getData("isSlopeTrigger") === true
                    && el.x < scene.renderer.width
                    && el.getData("checked") !== true

                if (coinCheck) {
                    let coin = el
                    coin.onScene = true
                    eventHelper.dispatch(EVENTS.COIN_GENERATED)
                    return coin
                }
                if (slopeTriggerCheck) {
                    if (typeof el.getData("mapDifficulty") === "number") {
                        let mapLogtrigger = el
                        mapLogtrigger.setData({ checked: true })
                        eventHelper.dispatch(EVENTS.LOG_MAP_DIFFICULTY, el.getData("mapDifficulty"))
                        return mapLogtrigger
                    }
                    if (el.getData("chunkEnd") !== undefined) {
                        let chunkEndTrigger = el
                        chunkEndTrigger.setData({ checked: true })
                        eventHelper.dispatch(EVENTS.CHUNK_END)
                    }
                }
                return el
            })
        }, scene, undefined, true)
    }
}