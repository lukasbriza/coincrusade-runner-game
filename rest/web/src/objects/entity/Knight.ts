import { Animations, Input, Physics, Scene, Tilemaps, Time } from "phaser";
import { GAME_PARAMETERS } from "../../configurations/_index";
import { ANIMATION_KEYS, EVENTS, SPRITE_KEYS, TILE } from "../../constants";
import { ColliderObject, IKnight } from "../../interfaces/_index";
import { PowerBar } from "./PowerBar";
import { AssetHelper, Eventhelper } from "../../helpers/_index";

// COMPLETE
export class Knight extends Physics.Arcade.Sprite implements IKnight {
  public inAir: boolean = false;
  public isAttacking: boolean = false;
  private powerBar?: PowerBar;

  private keyK?: Input.Keyboard.Key;
  private keyR?: Input.Keyboard.Key;
  private keyQ?: Input.Keyboard.Key;
  private keyLeft?: Input.Keyboard.Key;
  private keyRight?: Input.Keyboard.Key;
  private keyUp?: Input.Keyboard.Key;
  private keySpace?: Input.Keyboard.Key;

  private eventHelper: Eventhelper;
  private assetHelper: AssetHelper

  private tinted: boolean = false;
  private immortalAnimation: boolean = false;
  private immortalEvent?: Time.TimerEvent;

  constructor(scene: Scene) {
    super(scene, 100, 100, SPRITE_KEYS.SPRITE_KNIGHT_RUN)
    this.assetHelper = new AssetHelper(scene)
    this.assetHelper.addExistingSprite(this)

    this.eventHelper = new Eventhelper(scene)
    this.eventHelper.addListener(EVENTS.KNIGHT_HIT, (_: ColliderObject, worldObject: ColliderObject) => {
      this.startImmortalityAnimation()
      this.onCollideWithWorld(_, worldObject)
    }, this)
    this.eventHelper.addListener(EVENTS.PLAYER_DEAD, this.knightDead, this)
    this.eventHelper.addListener(EVENTS.GAME_RESTART, this.knightreset, this)

    //corect sprite position and collision box
    this.setOrigin(0, 0.5)
    this.setSize(40, 65)
    this.setOffset(10, 65)
    this.setDepth(1)
    this.setBottomY(this.scene.game.renderer.height - TILE.height)
    //init key objects
    this.keyUp = scene.input.keyboard?.addKey("up", false, false)
    this.keySpace = scene.input.keyboard?.addKey("space", false, false)
    this.keyLeft = scene.input.keyboard?.addKey("left", false, false)
    this.keyRight = scene.input.keyboard?.addKey("right", false, false)
    this.keyK = scene.input.keyboard?.addKey("K", false, false)
    this.keyR = scene.input.keyboard?.addKey("R", false, false)
    this.keyQ = scene.input.keyboard?.addKey("Q", false, false)

    //enable body collisions
    this.getBody().setCollideWorldBounds(false, undefined, undefined, true)
    this.setGravityY(GAME_PARAMETERS.playerGravityY)
    this.setCollisionCategory(1)

    //inits
    this.initListeners()
    this.powerBar = new PowerBar(this)

    this.body!.onOverlap = true

    //start run animation loop
    this.run()
  }

  //INIT
  private initListeners(): void {
    this.keySpace?.on("down", this.startCollectingPower, this)
    this.keySpace?.on("up", this.jump, this)
    this.keyUp?.on("down", this.startCollectingPower, this)
    this.keyUp?.on("up", this.jump, this)
    this.keyK?.on("down", this.attack, this)
    this.keyR?.on("down", this.restartProcess, this)
    this.keyQ?.on("down", this.quitProcess, this)
  }
  private removeListeners(): void {
    this.keyUp?.removeListener("down", this.startCollectingPower, this)
    this.keyUp?.removeListener("up", this.jump, this)
    this.keyK?.removeListener("down", this.attack, this)
  }
  private knightreset() {
    this.initListeners()
    this.setBottomY(this.scene.game.renderer.height - TILE.height)
  }

  //ABL
  private onRightWorldBound(): void {
    this.setVelocityX(0)
    this.setX(this.scene.renderer.width - (TILE.width))
  }
  private onLeftWorldBound(): void {
    if (window.gameState.actualLives === 1) {
      this.eventHelper.dispatch(EVENTS.KNIGHT_HIT)
      return
    }
    this.eventHelper.dispatch(EVENTS.KNIGHT_HIT)
    this.eventHelper.dispatch(EVENTS.PLAYER_RELOCATE, this)
  }
  private run(): void { //
    this.runSetup()
    this.anims.play({
      key: ANIMATION_KEYS.ANIMATION_KNIGHT_RUN,
      repeat: -1,
      frameRate: 12
    }, true)
  }
  private runSlover(): void {
    this.setOrigin(0.5, 0.5)
    this.setFlipX(true)
    this.setOffset(75, 65)
    this.setVelocityX(GAME_PARAMETERS.knightMoveVelocityLeftX)
  }
  private runQuicker(): void {
    this.runSetup()
    this.setVelocityX(GAME_PARAMETERS.knightMoveVelocityRightX)
  }
  private jump(): void {
    if (this.inAir) return

    this.inAir = true
    this.body!.velocity.y = -this.powerBar!.jumpPower * 12
    this.eventHelper.dispatch(EVENTS.STOP_COLLECT_JUMP_POWER)
    this.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_JUMP }, true)
  }
  private startCollectingPower(): void {
    if (this.inAir) return
    this.eventHelper.dispatch(EVENTS.COLLECT_JUMP_POWER)
  }
  private attack(): void {
    if (!this.inAir) {
      this.isAttacking = true
      this.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_ATTACK }, true)
        .on("animationcomplete", (animation: Animations.Animation) => {
          if (animation.key === ANIMATION_KEYS.ANIMATION_KNIGHT_ATTACK) {
            this.isAttacking = false
            this.run()
          }
        }, this)
    }
  }
  public onCollideWithWorld(_: ColliderObject, worldObject: ColliderObject): void {
    if (worldObject instanceof Tilemaps.Tile) {
      return
    }
    if (this.inAir && worldObject?.body?.checkCollision?.up) {
      this.inAir = false
      this.powerBar?.setPercents(0)
      !window.gameState.playerIsDead && this.run()
    }
  }
  public startImmortalityAnimation(): void {
    if (!this.immortalEvent) {
      this.immortalAnimation = true
      const delay = 250
      const repeat = Math.floor(4000 / delay)
      const cb = () => {
        if (!this.tinted) {
          this.setTintFill(0xffffff)
          this.tinted = true
          return
        }
        this.clearTint()
        this.tinted = false
      }
      const clear = () => {
        this.clearTint()
        this.eventHelper.removeTimer(this.immortalEvent as Time.TimerEvent)
        this.immortalEvent = undefined
        this.immortalAnimation = false
      }

      this.immortalEvent = this.eventHelper.timer(delay, cb, this, repeat)
      this.eventHelper.timer((repeat + 1) * delay, clear, this)
    }
  }
  public knightDead() {
    this.eventHelper.timer(300, () => {
      this.removeListeners()
      this.clearTint()
      this.setVelocityX(0)
      if (this.body!.x < 10) {
        this.setPosition(10, this.body?.y)
      }
      this.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_DEAD }, false)
    }, this, undefined, false)
  }
  private restartProcess() {
    if (window.gameState.playerIsDead) {
      this.eventHelper.dispatch(EVENTS.GAME_RESTART)
      this.run()
    }
  }
  private quitProcess() {
    if (window.gameState.playerIsDead) {
      window.location.href = "/"
    }
  }

  //LOOP
  update(): void {
    const isDead = window.gameState.playerIsDead

    //Update powerbar position on every frame
    const x = this.body?.x ?? this.x
    const y = this.body?.y ?? this.y
    this.powerBar?.setBarPosition(x, y - 25, true)

    //Callback when on right side of world
    if ((this.body!.x + this.body!.width) >= (this.scene.renderer.width - (TILE.width / 2))) {
      !this.keyLeft?.isDown && this.onRightWorldBound()
    }
    //Callback when on left side of world
    if (this.body!.x <= 10 && !this.immortalAnimation && !isDead) {
      this.onLeftWorldBound()
    }
    if (this.body!.x <= 0 && this.immortalAnimation && !isDead) {
      this.setX(10)
    }

    //A
    const canLeftRun = this.keyLeft?.isDown && this.keyRight?.isUp && this.body?.velocity.x !== GAME_PARAMETERS.knightMoveVelocityLeftX
    if (canLeftRun && !isDead) {
      this.runSlover()
    }
    const handleAirAkey = this.keyLeft?.isUp && this.inAir && this.body?.velocity.x === GAME_PARAMETERS.knightMoveVelocityLeftX
    if (handleAirAkey && !isDead) {
      this.setVelocityX(0)
    }
    //D
    const canRightRun = this.keyRight?.isDown && this.body!.velocity.x !== GAME_PARAMETERS.knightMoveVelocityRightX
    if (canRightRun && !isDead) {
      this.runQuicker()
    }
    const handleAirDkey = this.keyRight?.isUp && this.inAir && this.body!.velocity.x === GAME_PARAMETERS.knightMoveVelocityRightX
    if (handleAirDkey && !isDead) {
      this.setVelocityX(0)
    }

    //DEFAULT
    const canRun = this.keyLeft?.isUp && this.keyRight?.isUp && !this.inAir && this.body!.velocity.x !== 0
    if (canRun && !isDead) {
      this.run()
    }
  }

  //HELPERS
  //This method set y accordingly to bottom line of sprite not accordingly to center of sprite
  public setBottomY(desiredY: number): void {
    this.setY(desiredY - (this.height / 2))
  }
  private getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
  private runSetup() {
    this.setOrigin(0, 0.5)
    this.setOffset(10, 65)
    this.setFlipX(false)
    this.setVelocityX(0)
  }

}
