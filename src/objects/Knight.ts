import { Animations, Input, Physics, Tilemaps, Time } from "phaser";
import { GAME_PARAMETERS } from "../configurations";
import { GameScene } from "../scenes/GameScene";
import { ANIMATION_KEYS, KEYS, TILE } from "../constants";
import { ColliderObject } from "../interfaces/_index";
import { PowerBar } from "./PowerBar";

export class Knight extends Physics.Arcade.Sprite {
    public inAir: boolean = false;
    public isAttacking: boolean = false;

    private jumpTimer?: Time.TimerEvent;
    private powerBar?: PowerBar;

    private keyW?: Input.Keyboard.Key;
    private keyK?: Input.Keyboard.Key;

    constructor(scene: GameScene) {
        super(scene, 100, 100, KEYS.SPRITE_KNIGHT_RUN)
        scene.assetManager.addExistingSpriteToScene(this)

        //corect sprite position and collision box
        this.setSize(65, 65)
        this.setOffset(0, 65)
        this.setBottomY(this.scene.game.renderer.height - TILE.height)

        //init key objects
        this.keyW = scene.input.keyboard?.addKey("W", false, false)
        this.keyK = scene.input.keyboard?.addKey("K", false, false)


        //enable body collisions
        this.getBody().setCollideWorldBounds(true);
        this.setGravityY(GAME_PARAMETERS.playerGravityY)


        //add colliders and colision callback
        scene.physics.add.collider(this, scene.platformManager.activeGroup, this.onCollideWithWorld, undefined, this)

        //inits
        this.initListeners()
        this.initAnimations()
        this.powerBar = new PowerBar(scene, this)

        //start run animation loop
        this.run()
    }

    //Init register animations for knight
    private initAnimations() {
        this.scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_RUN,
            frames: this.scene.anims.generateFrameNames(KEYS.SPRITE_KNIGHT_RUN, {
                prefix: "run-",
                end: 6,
            }),
            frameRate: 10,
        })
        this.scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_JUMP,
            frames: this.scene.anims.generateFrameNames(KEYS.SPRITE_KNIGHT_JUMP, {
                prefix: "jump-",
                end: 3
            }),
            frameRate: 5
        })
        this.scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_ATTACK,
            frames: this.scene.anims.generateFrameNames(KEYS.SPRITE_KNIGHT_ATTACK, {
                prefix: "attack-",
                end: 5
            }),
            frameRate: 10
        })
    }

    //Init buttons listeners
    private initListeners() {
        this.keyW?.on("down", this.startCollectingPower, this)
        this.keyW?.on("up", this.jump, this)
        this.keyK?.on("down", this.attack, this)
    }

    update() {
        //Update powerbar position on every frame
        const x = this.body?.x ?? this.x
        const y = this.body?.y ?? this.y
        this.powerBar?.setBarPosition(x, y - 25, true)
    }

    private run() {
        this.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_RUN, repeat: -1 }, true)
    }

    private jump() {
        if (this.inAir) return

        if (this.jumpTimer) {
            this.scene.time.removeEvent(this.jumpTimer)
        }

        this.inAir = true
        this.body!.velocity.y = -this.powerBar!.jumpPower * GAME_PARAMETERS.powerMultiplicator
        this.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_JUMP }, true)

        this.jumpTimer = undefined
        this.powerBar!.jumpPower = 0;
    }

    private startCollectingPower() {
        if (this.inAir) return

        this.jumpTimer = this.scene.time.addEvent({
            delay: GAME_PARAMETERS.powerJumpLoadSpeed,
            loop: true,
            callback: this.powerBar?.increaseJumpPower,
            callbackScope: this.powerBar
        })
    }

    private attack() {
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

    public onCollideWithWorld(_: ColliderObject, worldObject: ColliderObject) {
        if (worldObject instanceof Tilemaps.Tile) {
            return
        }
        if (this.inAir && worldObject.body.checkCollision.up) {
            this.inAir = false
            this.powerBar?.setPercents(0)
            this.run()
        }
    }

    //This method set y accordingly to bottom line of sprite not accordingly to center of sprite
    public setBottomY(desiredY: number) {
        this.setY(desiredY - (this.height / 2))
    }

    private getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }

}