/* eslint-disable lines-between-class-members */
import type { Time } from 'phaser'
import { GameObjects } from 'phaser'

import { KEYS } from '../assets'
import { POOL_CONFIG, TILE_HEIGHT, TILE_WIDTH } from '../constants'
import {
  coinPickedListener,
  gameRestartListener,
  generateMethodListener,
  playerRelocateListener,
  reasignPlatformSpeedCallbackListener,
} from '../events'
import type { IPlatformGenerator } from '../generators'
import type { ITimerHelper, IGroupHelper } from '../helpers'
import { GroupHelper, TimerHelper } from '../helpers'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'
import { emitError, generateInitialChunk, translateMapTypes } from '../utils'
import { getGenerator } from '../utils/get-generator'

import type { IPlatformManager } from './types'

const outOfWorldCondition = (body: GameObjects.GameObject['body']) => {
  if (body === null) {
    return true
  }
  return body.position.x < -(3 * TILE_WIDTH)
}

export class PlatformManager implements IPlatformManager {
  public scene: IScene

  public activeGroup: GameObjects.Group
  public coinGroup: GameObjects.Group
  public decorationGroup: GameObjects.Group
  public obstacleGroup: GameObjects.Group
  public slopeGroup: GameObjects.Group

  public activeGroupHelper: IGroupHelper
  public coinGroupHelper: IGroupHelper
  public decorationGroupHelper: IGroupHelper
  public obstacleGroupHelper: IGroupHelper
  public slopeGroupHelper: IGroupHelper

  private timerHelper: ITimerHelper
  private outOfWorldTimer: Time.TimerEvent

  private generator: IPlatformGenerator

  constructor(scene: IScene) {
    this.scene = scene
    this.timerHelper = new TimerHelper(scene)

    this.activeGroup = scene.add.group()
    this.coinGroup = scene.add.group()
    this.decorationGroup = scene.add.group()
    this.obstacleGroup = scene.add.group()
    this.slopeGroup = scene.add.group({
      removeCallback: () => {
        const stateSingleton = getGameStateContext()
        stateSingleton.increaseOvercomedSlopesAction()
      },
    })

    this.activeGroupHelper = new GroupHelper(this.activeGroup)
    this.coinGroupHelper = new GroupHelper(this.coinGroup)
    this.decorationGroupHelper = new GroupHelper(this.decorationGroup)
    this.obstacleGroupHelper = new GroupHelper(this.obstacleGroup)
    this.slopeGroupHelper = new GroupHelper(this.slopeGroup)
    this.generator = getGenerator(scene)

    this.initListeners()
    this.generateInitialChunk()
  }

  private initListeners() {
    this.outOfWorldTimer = this.timerHelper.timer(this.processOutOfWorldMembers, 2000, this, undefined, true)
    coinPickedListener((coin) => this.coinGroup.remove(coin, true, true))
    reasignPlatformSpeedCallbackListener(() => {
      const stateSingleton = getGameStateContext()
      this.assignPlatformSpeed(stateSingleton.state.platformSpeed)
    })
    generateMethodListener(() => {
      if (this.hasToGenerateNewPlatforms()) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.generatePlatforms()
      }
    })
    playerRelocateListener(this.playerRelocate)
    gameRestartListener(this.restart)
  }

  private generateInitialChunk = () => {
    const stateSingleton = getGameStateContext()
    const firstChunk = generateInitialChunk(this.scene, stateSingleton.state)
    this.activeGroup.addMultiple(firstChunk.platforms, true)
    this.decorationGroup.addMultiple(firstChunk.decorations, true)
    this.slopeGroup.addMultiple(firstChunk.slopeTriggers, true)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.generatePlatforms()
  }

  private generatePlatforms = async () => {
    const stateSingleton = getGameStateContext()
    const maps = await this.generator.generate() //
    const lastMemberX = this.slopeGroupHelper.getLastMemberOfGroupByX()
    const x = lastMemberX?.body?.position.x as number
    const translationResult = translateMapTypes(this.scene, stateSingleton.state, maps, x + TILE_WIDTH)

    this.activeGroup.addMultiple(translationResult.platforms, true)
    this.decorationGroup.addMultiple(translationResult.decorations, true)
    this.coinGroup.addMultiple(translationResult.coins, true)
    this.obstacleGroup.addMultiple(translationResult.obstacles, true)
    this.slopeGroup.addMultiple(translationResult.slopeTriggers, true)
  }

  private playerRelocate = (knight: IKnight) => {
    const element = this.activeGroup
      .getChildren()
      .find(
        (children) =>
          children instanceof GameObjects.Sprite &&
          children.body &&
          children.body.position.x > TILE_WIDTH * 4 &&
          children.body.position.x < this.scene.renderer.width - TILE_WIDTH * 2 &&
          (children.texture.key === KEYS.GROUND.toString() || children.texture.key === KEYS.SLIM_GROUND.toString()),
      )
    if (element && element.body) {
      knight.setX(element.body.position.x)
      knight.setY(element.body.position.y - TILE_HEIGHT)
      return
    }

    emitError('Can´t find element for relocation.')
  }

  private hasToGenerateNewPlatforms() {
    const lastPlatform = this.activeGroupHelper.getLastMemberOfGroupByX()
    if (lastPlatform && lastPlatform.body?.position.x) {
      const hasToGenerate = lastPlatform.body.position.x <= this.scene.renderer.width + POOL_CONFIG.MAX_PACKAGE_WIDTH
      return hasToGenerate
    }
  }

  private assignPlatformSpeed(speed: number) {
    const formatedSpeed = speed * -1
    const platforms = [
      ...this.activeGroup.getChildren(),
      ...this.obstacleGroup.getChildren(),
      ...this.coinGroup.getChildren(),
      ...this.decorationGroup.getChildren(),
      ...this.slopeGroup.getChildren(),
    ]
    platforms.map((element) => {
      if (element.body) {
        element.body.velocity.x = formatedSpeed
      }
      return element
    })
  }

  private processOutOfWorldMembers = () => {
    if (this.activeGroup.getLength() > 0) {
      this.activeGroupHelper.findAllMembersByCondition(
        (children) => outOfWorldCondition(children.body),
        (children) => {
          this.activeGroup.remove(children, true, true)
          children.destroy()
        },
      )
    }
    if (this.coinGroup.getLength() > 0) {
      this.coinGroupHelper.findAllMembersByCondition(
        (children) => outOfWorldCondition(children.body),
        (children) => {
          this.coinGroup.remove(children, true, true)
          children.destroy()
        },
      )
    }
    if (this.decorationGroup.getLength() > 0) {
      this.decorationGroupHelper.findAllMembersByCondition(
        (children) => outOfWorldCondition(children.body),
        (children) => {
          this.decorationGroup.remove(children, true, true)
          children.destroy()
        },
      )
    }
    if (this.obstacleGroup.getLength() > 0) {
      this.obstacleGroupHelper.findAllMembersByCondition(
        (children) => outOfWorldCondition(children.body),
        (children) => {
          this.obstacleGroup.remove(children, true, true)
          children.destroy()
        },
      )
    }
    if (this.slopeGroup.getLength() > 0) {
      this.slopeGroupHelper.findAllMembersByCondition(
        (children) => (children.body ? children.body.position.x < 0 : true),
        (children) => {
          this.slopeGroup.remove(children, true, true)
          children.destroy()
        },
      )
    }
  }

  private restart = () => {
    const stateSingleton = getGameStateContext()
    stateSingleton.reset()
    this.activeGroup = this.activeGroup.clear(true, true)
    this.coinGroup = this.coinGroup.clear(true, true)
    this.decorationGroup = this.decorationGroup.clear(true, true)
    this.obstacleGroup = this.obstacleGroup.clear(true, true)
    this.slopeGroup = this.slopeGroup.clear(true, true)
    this.timerHelper.removeTimer(this.outOfWorldTimer)
    this.outOfWorldTimer = this.timerHelper.timer(this.processOutOfWorldMembers, 2000, this, undefined, true)
    this.generateInitialChunk()
    this.assignPlatformSpeed(stateSingleton.state.platformSpeed)
  }
}
