/* eslint-disable unicorn/numeric-separators-style */
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
import { KNIGHT_LEFT_SPEED, KNIGHT_RIGHT_SPEED, PLAYER_GRAVITY, TILE_HEIGHT, TILE_WIDTH } from '../constants'
import { knightDeadListener, knightHitCallbackListener, knightLeftSideCollisionEmiter } from '../events'
import { EventBus, EventBusEvents } from '../events/event-bus'
import type { ITimerHelper } from '../helpers'
import { isKnightOnLeftSideCorner, isKnightOnLeftSideOfWorld, isKnightOnRightSideOfWorld } from '../utils'

import type { ColliderObject } from './types'

export class Knight extends Physics.Arcade.Sprite implements IKnight {
  public id: number
  public inAir: boolean = false
  public isAttacking: boolean = false
  public powerBar: IPowerbar

  private keyR: Input.Keyboard.Key | undefined
  private keyQ: Input.Keyboard.Key | undefined
  private keyLeft: Input.Keyboard.Key | undefined
  private keyRight: Input.Keyboard.Key | undefined
  private keyUp: Input.Keyboard.Key | undefined
  private keySpace: Input.Keyboard.Key | undefined

  private deadEvent: boolean = false

  public tinted: boolean = false
  public immortalAnimation: boolean = false
  public immortalEvent: Time.TimerEvent | undefined

  public timerHelper: ITimerHelper

  constructor(scene: Scene, id: number) {
    super(scene, 100, 100, SPRITE_KEYS.SPRITE_KNIGHT_RUN)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.id = id
    this.setOrigin(0, 0.5)
    this.setSize(40, 65)
    this.setOffset(10, 65)
    this.setDepth(1)
    this.setBottomY(this.scene.game.renderer.height - TILE_HEIGHT)
    this.setGravityY(PLAYER_GRAVITY)

    this.initKeys(scene)
    this.setupSpriteCollisions()
    this.initListeners()

    this.powerBar = this.scene.add.powerbar(this, id)
    this.run()
  }

  private initListeners() {
    knightHitCallbackListener((knight, worldObject) => this.knightHit(knight, worldObject))
    knightDeadListener(this.knightDead)

    this.keySpace?.on('down', this.startCollectingPower, this)
    this.keySpace?.on('up', this.jump, this)
    this.keyUp?.on('down', this.startCollectingPower, this)
    this.keyUp?.on('up', this.jump, this)
    this.keyR?.on('down', this.knightReset, this)
    this.keyQ?.on('down', this.gameQuit, this)
  }
  public removeListeners() {
    this.keyUp?.removeListener('down', this.startCollectingPower, this)
    this.keyUp?.removeListener('up', this.jump, this)
    this.keySpace?.on('down', this.startCollectingPower, this)
    this.keySpace?.on('up', this.jump, this)
  }
  private initKeys(scene: Scene) {
    this.keyUp = scene.input.keyboard?.addKey('up', false, false)
    this.keySpace = scene.input.keyboard?.addKey('space', false, false)
    this.keyLeft = scene.input.keyboard?.addKey('left', false, false)
    this.keyRight = scene.input.keyboard?.addKey('right', false, false)
    this.keyR = scene.input.keyboard?.addKey('R', false, false)
    this.keyQ = scene.input.keyboard?.addKey('Q', false, false)
  }
  private resetState() {
    this.deadEvent = false
    this.inAir = false
    this.powerBar.setPercents(0)
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
    if (this.deadEvent) {
      EventBus.emit(EventBusEvents.RestartGame)
      this.run()
      this.resetState()
    }
  }
  private gameQuit = () => {
    if (this.deadEvent) {
      EventBus.emit(EventBusEvents.EndGame)
    }
  }

  // ANIMATIONS
  private run = () => knightRun(this)
  private runSlover = () => knightRunLeft(this)
  private runQuicker = () => knightRunReset(this)
  private jump = () => knightJump(this)
  private immortalityAnimation = () => knightImmortality(this)
  private knightDead = () => {
    this.removeListeners()
    this.deadEvent = true
    knightDeadAnimation(this)
  }

  // UTILS
  private setBottomY(desiredY: number) {
    this.setY(desiredY - this.height / 2)
  }
  private canLeftRun() {
    return this.keyLeft?.isDown && this.keyRight?.isUp && this.body?.velocity.x !== KNIGHT_LEFT_SPEED
  }
  private handleAirLeftKey() {
    return this.keyLeft?.isUp && this.inAir && this.body?.velocity.x === KNIGHT_LEFT_SPEED
  }
  private canRightRun() {
    return this.keyRight?.isDown && this.body?.velocity.x !== KNIGHT_RIGHT_SPEED
  }
  private handleAirRightKey() {
    return this.keyRight?.isUp && this.inAir && this.body?.velocity.x === KNIGHT_RIGHT_SPEED
  }
  private canRun() {
    return this.keyLeft?.isUp && this.keyRight?.isUp && !this.inAir && this.body?.velocity.x !== 0
  }

  // UPDATE LOOP
  update() {
    const x = this.body?.x ?? this.x
    const y = this.body?.y ?? this.y
    this.powerBar.setBarPosition(x, y - 25, true)

    if (!this.deadEvent) {
      // Callback when on right side of world
      if (isKnightOnRightSideOfWorld(this) && !this.keyLeft?.isDown) {
        this.onRightWorldCollision()
      }
      // Callback when on left side of world
      if (isKnightOnLeftSideOfWorld(this)) {
        knightLeftSideCollisionEmiter(this)
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
    const knight = new Knight(this.scene, id)
    this.displayList.add(knight)
    this.updateList.add(knight)
    return knight
  })
}
