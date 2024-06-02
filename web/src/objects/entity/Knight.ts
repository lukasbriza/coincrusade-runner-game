import { Animations, Input, Physics, Scene, Tilemaps, Time } from "phaser";
import { GAME_PARAMETERS } from "../../configurations/_index";
import { ANIMATION_KEYS, EVENTS, SPRITE_KEYS, TILE } from "../../constants";
import { ColliderObject, IKnight } from "../../interfaces/_index";
import { PowerBar } from "./PowerBar";
import { AssetHelper, Eventhelper } from "../../helpers/_index";

export class Knight extends Physics.Arcade.Sprite implements IKnight {
    public inAir: boolean = false;
    public isAttacking: boolean = false;
    private powerBar?: PowerBar;

    private keyW?: Input.Keyboard.Key;
    private keyK?: Input.Keyboard.Key;
    private keyD?: Input.Keyboard.Key;
    private keyA?: Input.Keyboard.Key;
    private keyR?: Input.Keyboard.Key;

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

        //corect sprite position and collision box
        this.setOrigin(0, 0.5)
        this.setSize(40, 65)
        this.setOffset(10, 65)
        this.setDepth(1)
        this.setBottomY(this.scene.game.renderer.height - TILE.height)
        //init key objects
        this.keyW = scene.input.keyboard?.addKey("W", false, false)
        this.keyK = scene.input.keyboard?.addKey("K", false, false)
        this.keyD = scene.input.keyboard?.addKey("D", false, false)
        this.keyA = scene.input.keyboard?.addKey("A", false, false)
        this.keyR = scene.input.keyboard?.addKey("R", false, false)

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
        this.keyW?.on("down", this.startCollectingPower, this)
        this.keyW?.on("up", this.jump, this)
        this.keyK?.on("down", this.attack, this)
        this.keyR?.on("down", this.restartGame, this)
    }
    private removeListeners(): void {
        this.scene.input.keyboard?.destroy()
    }

    //ABL
    private onRightWorldBound(): void {
        this.setVelocityX(0)
        this.setX(this.scene.renderer.width - (TILE.width))
    }
    private onLeftWorldBound(): void {
        this.eventHelper.dispatch(EVENTS.KNIGHT_HIT)
        this.eventHelper.dispatch(EVENTS.PLAYER_RELOCATE, this)
    }
    private run(): void {
        this.runSetup()
        this.anims.play({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_RUN,
            repeat: -1,
            frameRate: GAME_PARAMETERS.knightStartFramerate
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
        this.body!.velocity.y = -this.powerBar!.jumpPower * GAME_PARAMETERS.powerMultiplicator
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
        if (this.inAir && worldObject.body.checkCollision.up) {
            this.inAir = false
            this.powerBar?.setPercents(0)
            this.run()
        }
    }
    public startImmortalityAnimation(): void {
        if (!this.immortalEvent) {
            this.immortalAnimation = true
            const delay = 250
            const repeat = Math.floor(GAME_PARAMETERS.onHitImmortalityDuration / delay)
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
        window.gameState.setPlayerDead()
        this.removeListeners()
        this.clearTint()
        this.setVelocityX(0)
        this.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_DEAD }, true)
    }
    private restartGame() {
        if (window.gameState.playerIsDead) {
            document.location.reload()
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
            !this.keyA?.isDown && this.onRightWorldBound()
        }
        //Callback when on left side of world
        if (this.body!.x <= 10 && !this.immortalAnimation && !isDead) {
            this.onLeftWorldBound()
        }
        if (this.body!.x <= 0 && this.immortalAnimation) {
            this.setX(10)
        }

        //A
        const canLeftRun = this.keyA?.isDown && this.keyD?.isUp && this.body?.velocity.x !== GAME_PARAMETERS.knightMoveVelocityLeftX
        if (canLeftRun && !isDead) {
            this.runSlover()
        }
        const handleAirAkey = this.keyA?.isUp && this.inAir && this.body?.velocity.x === GAME_PARAMETERS.knightMoveVelocityLeftX
        if (handleAirAkey && !isDead) {
            this.setVelocityX(0)
        }
        //D
        const canRightRun = this.keyD?.isDown && this.body!.velocity.x !== GAME_PARAMETERS.knightMoveVelocityRightX
        if (canRightRun && !isDead) {
            this.runQuicker()
        }
        const handleAirDkey = this.keyD?.isUp && this.inAir && this.body!.velocity.x === GAME_PARAMETERS.knightMoveVelocityRightX
        if (handleAirDkey && !isDead) {
            this.setVelocityX(0)
        }

        //DEFAULT
        const canRun = this.keyA?.isUp && this.keyD?.isUp && !this.inAir && this.body!.velocity.x !== 0
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