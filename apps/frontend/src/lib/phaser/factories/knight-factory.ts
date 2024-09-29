/* eslint-disable lines-between-class-members */
/* eslint-disable func-names */
import type { Input, Scene, Time } from 'phaser'
import { Physics, GameObjects, Tilemaps } from 'phaser'

import {
  knightDead as knightDeadAnimation,
  knightImmortality,
  knightJump,
  knightRun,
  knightRunLeft,
  knightRunReset,
} from '../animations'
import { SPRITE_KEYS } from '../assets'
import { TILE_HEIGHT, TILE_WIDTH } from '../constants'
import { gameRestartListener, knightDeadListener, knightHitCallbackListener } from '../events'
import { TimerHelper, type ITimerHelper } from '../helpers'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'
import { isKnightOnLeftSideCorner, isKnightOnLeftSideOfWorld, isKnightOnRightSideOfWorld } from '../utils'

import type { ColliderObject } from './types'

export class Knight extends Physics.Arcade.Sprite implements IKnight {
  public scene: IScene
  public id: number
  public inAir: boolean = false
  public isAttacking: boolean = false
  public powerBar: IPowerbar

  private keyLeft: Input.Keyboard.Key | undefined
  private keyRight: Input.Keyboard.Key | undefined
  private keyUp: Input.Keyboard.Key | undefined
  private keySpace: Input.Keyboard.Key | undefined

  public tinted: boolean = false
  public immortalAnimation: boolean = false
  public immortalEvent: Time.TimerEvent | undefined

  public timerHelper: ITimerHelper

  constructor(scene: IScene, id: number) {
    super(scene, 100, 100, SPRITE_KEYS.SPRITE_KNIGHT_RUN)
    this.timerHelper = new TimerHelper(scene)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.scene = scene
    this.id = id

    this.setOrigin(0, 0.5)
    this.setSize(40, 65)
    this.setOffset(10, 65)
    this.setDepth(1)
    this.setBottomY(this.scene.game.renderer.height - TILE_HEIGHT)
    this.setGravityY(this.scene.gameConfig.playerGravity)

    this.initKeys(scene)
    this.setupSpriteCollisions()
    this.initListeners()

    this.powerBar = this.scene.add.powerbar(this, id)
    this.run()
  }

  private initMovementListeners() {
    this.keySpace?.on('down', this.startCollectingPower, this)
    this.keySpace?.on('up', this.jump, this)
    this.keyUp?.on('down', this.startCollectingPower, this)
    this.keyUp?.on('up', this.jump, this)
  }

  private initListeners() {
    knightHitCallbackListener((knight, worldObject) => this.knightHit(knight, worldObject))
    knightDeadListener(this.knightDead)
    gameRestartListener(this.knightReset)

    this.initMovementListeners()
  }
  public removeListeners() {
    this.keyUp?.removeListener('down', this.startCollectingPower, this)
    this.keyUp?.removeListener('up', this.jump, this)
    this.keySpace?.removeListener('down', this.startCollectingPower, this)
    this.keySpace?.removeListener('up', this.jump, this)
  }
  private initKeys(scene: Scene) {
    this.keyUp = scene.input.keyboard?.addKey('up', false, false)
    this.keySpace = scene.input.keyboard?.addKey('space', false, false)
    this.keyLeft = scene.input.keyboard?.addKey('left', false, false)
    this.keyRight = scene.input.keyboard?.addKey('right', false, false)
  }
  private resetState() {
    this.inAir = false
    this.powerBar.setPercents(0)
    this.initMovementListeners()
  }

  // COLLISION
  private setupSpriteCollisions() {
    const body = this.body as Physics.Arcade.Body
    body.onOverlap = true
    body.setCollideWorldBounds(false, undefined, undefined, true)
    this.setCollisionCategory(1)
  }
  private onRightWorldCollision() {
    this.setVelocityX(0)
    this.setX(this.scene.renderer.width - TILE_WIDTH)
  }
  public onCollideWithWorld(_: IKnight, worldObject: ColliderObject) {
    if (worldObject instanceof Tilemaps.Tile) {
      return
    }
    if (this.inAir && worldObject?.body?.checkCollision?.up) {
      this.inAir = false
      this.powerBar?.setPercents(0)
    }
  }

  // ACTIONS
  private startCollectingPower = () => {
    if (!this.inAir) {
      this.powerBar.startCollecting()
    }
  }
  public knightHit = (knight: IKnight, worldObject: ColliderObject) => {
    this.run()
    this.immortalityAnimation()
    this.onCollideWithWorld(knight, worldObject)
  }
  private knightReset = () => {
    this.run()
    this.resetState()
  }

  // ANIMATIONS
  private run = () => knightRun(this)
  private runSlover = () => knightRunLeft(this)
  private runQuicker = () => knightRunReset(this)
  private jump = () => knightJump(this)
  private immortalityAnimation() {
    knightImmortality(this, this.scene)
  }
  private knightDead = () => {
    this.removeListeners()
    knightDeadAnimation(this)
  }

  // UTILS
  private setBottomY(desiredY: number) {
    this.setY(desiredY - this.height / 2)
  }
  private canLeftRun() {
    return (
      this.keyLeft?.isDown && this.keyRight?.isUp && this.body?.velocity.x !== this.scene.gameConfig.knightLeftSpeed
    )
  }
  private handleAirLeftKey() {
    return this.keyLeft?.isUp && this.inAir && this.body?.velocity.x === this.scene.gameConfig.knightLeftSpeed
  }
  private canRightRun() {
    return this.keyRight?.isDown && this.body?.velocity.x !== this.scene.gameConfig.knightRightSpeed
  }
  private handleAirRightKey() {
    return this.keyRight?.isUp && this.inAir && this.body?.velocity.x === this.scene.gameConfig.knightRightSpeed
  }
  private canRun() {
    return this.keyLeft?.isUp && this.keyRight?.isUp && !this.inAir
  }

  // UPDATE LOOP
  update() {
    const x = this.body?.x ?? this.x
    const y = this.body?.y ?? this.y
    this.powerBar.setBarPosition(x, y - 25, true)
    const gameStateSingleton = getGameStateContext()

    if (!gameStateSingleton.state.playerIsDead) {
      // Callback when on right side of world
      if (isKnightOnRightSideOfWorld(this) && !this.keyLeft?.isDown) {
        this.onRightWorldCollision()
      }
      // Callback when on left side of world
      if (isKnightOnLeftSideOfWorld(this)) {
        const stateSingleton = getGameStateContext()
        stateSingleton.leftSideCollisionAction(this)
      }
      if (isKnightOnLeftSideCorner(this)) {
        this.setX(10)
      }
      // Left key
      if (this.canLeftRun()) {
        this.runSlover()
      }
      if (this.handleAirLeftKey()) {
        this.setVelocityX(0)
      }
      // Right key
      if (this.canRightRun()) {
        this.runQuicker()
      }
      if (this.handleAirRightKey()) {
        this.setVelocityX(0)
      }
      // Default
      if (this.canRun()) {
        this.run()
      }
    }
  }
}

export const initKnightFactory = () => {
  GameObjects.GameObjectFactory.register('knight', function (this: Phaser.GameObjects.GameObjectFactory) {
    const id = Date.now()
    const knight = new Knight(this.scene as IScene, id)
    this.displayList.add(knight)
    this.updateList.add(knight)
    return knight
  })
}
