import { EVENTS } from "../../constants";
import { ColliderObject } from "../../interfaces/_index";
import { GameScene } from "../../scenes/_index";
import { Coin } from "../entity/Coin";
import { Water } from "../entity/Water";

export class CollidersSetup {
    constructor(scene: GameScene) {
        const statusCoin = scene.playerStatus.coinCounter.nearTextCoin
        const activeGroup = scene.platformManager.activeGroup
        const coinGroup = scene.platformManager.coinGroup
        const obstacleGroup = scene.platformManager.obstacleGroup
        const coinCounter = scene.playerStatus.coinCounter

        scene.physics.add.collider(scene.knight, activeGroup, scene.knight.onCollideWithWorld, undefined, scene.knight)
        scene.physics.add.collider(scene.knight, obstacleGroup, (_: ColliderObject, obstacle: ColliderObject) => {
            scene.eventHelper.dispatch(EVENTS.KNIGHT_HIT, _, obstacle)
            if (obstacle instanceof Water) {
                scene.eventHelper.dispatch(EVENTS.PLAYER_RELOCATE, scene.knight)
            }
        })
        scene.physics.add.collider(coinGroup, activeGroup, undefined, (coin: ColliderObject, _) => { return !(coin as Coin)?.isPicked })
        scene.physics.add.collider(scene.knight, coinGroup, undefined, (_, coin: ColliderObject) => {
            (coin as Coin)?.pickCoin(coinCounter, coin as Coin)
            return false
        })
        scene.physics.add.collider(statusCoin, coinGroup, undefined, (_, coin: ColliderObject) => {
            scene.eventHelper.dispatch(EVENTS.COIN_PICKED, coin)
            coin?.destroy()
            return false
        })
    }
}