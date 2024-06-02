import { Scene } from "phaser";
import { ANIMATION_KEYS, SPRITE_KEYS } from "../../constants";
import { GAME_PARAMETERS } from "../../configurations/_index";

export class AnimationsSetup {
    constructor(scene: Scene) {
        scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_RUN,
            frames: scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_RUN, {
                prefix: "run-",
                end: 6,
            }),
            frameRate: GAME_PARAMETERS.knightStartFramerate,
        })
        scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_JUMP,
            frames: scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_JUMP, {
                prefix: "jump-",
                end: 3
            }),
            frameRate: 5
        })
        scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_ATTACK,
            frames: scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_ATTACK, {
                prefix: "attack-",
                end: 5
            }),
            frameRate: 10
        })
        scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_WALK,
            frames: scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_WALK, {
                prefix: "walk-",
                end: 7,
            }),
            frameRate: 10
        })
        scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_KNIGHT_DEAD,
            frames: scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_KNIGHT_DEAD, {
                prefix: "dead-",
                end: 5,
            }),
            frameRate: 7
        })
        scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_SPRITE_COIN,
            frames: scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_COIN, {
                prefix: "coin-",
                end: 5,
            }),
            frameRate: 10
        })
        scene.anims.create({
            key: ANIMATION_KEYS.ANIMATION_SPRITE_WATER,
            frames: scene.anims.generateFrameNames(SPRITE_KEYS.SPRITE_WATER, {
                prefix: "water-",
                end: 2,
            }),
            frameRate: 7
        })
    }
}