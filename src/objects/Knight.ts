import { Physics, Scene } from "phaser";

export class Knight extends Physics.Arcade.Sprite {
    constructor(scene: Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //enable body collisions
        this.getBody().setCollideWorldBounds(true);
    }

    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}