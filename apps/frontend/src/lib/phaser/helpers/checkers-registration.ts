import { Physics, type GameObjects, type Scene } from 'phaser'

import { KEYS } from '../assets'
import { CHECKER_PROPS } from '../constants'
import { Coin } from '../factories/coin-factory'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'

import { TimerHelper } from './timer-helper'

const coinCheckValidation = (element: GameObjects.GameObject, scene: Scene) =>
  element instanceof Coin && !element?.onScene && !element.inCoinCounter && element.x < scene.renderer.width
const slopeTriggerValidation = (element: GameObjects.GameObject, scene: Scene) =>
  element instanceof Physics.Arcade.Sprite &&
  element.texture.key === (KEYS.GROUND as string) &&
  element.getData(CHECKER_PROPS.SLOPE) === true &&
  element.x < scene.renderer.width &&
  element.getData(CHECKER_PROPS.CHECKED) !== true

export const checkersRegistration = (scene: IScene) => {
  const timerHelper = new TimerHelper(scene)
  const stateSingleton = getGameStateContext()

  timerHelper.timer(
    () => {
      scene.sys.displayList.list?.map((element) => {
        const coinCheck = coinCheckValidation(element, scene)
        const slopeTriggerCheck = slopeTriggerValidation(element, scene)

        if (coinCheck) {
          const coin = element as Coin
          coin.onScene = true
          stateSingleton.coinGeneratedAction()
          return coin
        }

        if (slopeTriggerCheck && typeof element.getData(CHECKER_PROPS.MAP_DIFFICULTY) === 'number') {
          const mapLogtrigger = element
          mapLogtrigger.setData({ checked: true })
          stateSingleton.logMapDifficultyAction(mapLogtrigger.getData(CHECKER_PROPS.MAP_DIFFICULTY) as number)
          return mapLogtrigger
        }

        if (slopeTriggerCheck && element.getData(CHECKER_PROPS.CHUNK_END) !== undefined) {
          const chunkEndTrigger = element
          chunkEndTrigger.setData({ checked: true })
          stateSingleton.chunkEndAction()
        }

        return element
      })
    },
    250,
    scene,
    undefined,
    true,
  )
}
