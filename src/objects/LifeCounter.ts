import { GameObjects, Scene } from "phaser";
import { GAME_PARAMETERS } from "../configurations/_index";
import { Life } from "./Life";
import { KEYS } from "../constants";
import { ILifeCounter } from "../interfaces/_index";

export class LifeCounter implements ILifeCounter {
    private lifes: GameObjects.Image[] = []
    private lifeValue: number = 3;
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene
        this.drawLifes()
    }
    private drawLifes(): void {
        this.lifes.forEach(object => object.destroy())
        this.lifes = []
        const isDecimal = this.lifeValue !== Math.ceil(this.lifeValue)

        for (let i = 0; i < this.lifeValue; i++) {
            const life = new Life(this.scene, isDecimal ? KEYS.HEART_HALF : undefined)
            const x = (i * life.width) + 20
            life.setOrigin(0, 0)
            life.setPosition(x + (i > 0 ? i * 5 : 0), 10)
            this.lifes.push(life)
        }

        for (let i = this.lifes.length; i < GAME_PARAMETERS.maxPlayerLives; i++) {
            const emptyLife = new Life(this.scene, KEYS.HEART_EMPTY)
            const x = (i * emptyLife.width) + 20
            emptyLife.setOrigin(0, 0)
            emptyLife.setPosition(x + (i > 0 ? i * 5 : 0), 10)
            this.lifes.push(emptyLife)
        }
    }

    public addLife(by: number = 1): void {
        if (this.lifeValue < GAME_PARAMETERS.maxPlayerLives) {
            this.lifeValue = this.lifeValue + by
            if (this.lifeValue > GAME_PARAMETERS.maxPlayerLives) {
                this.lifeValue = GAME_PARAMETERS.maxPlayerLives
            }
            this.drawLifes()
        }
    }
    public decreaseLife(by: number = 1): void {
        if (this.lifeValue !== 0) {
            this.lifeValue = this.lifeValue - by
            if (this.lifeValue < 0) {
                this.lifeValue = 0
            }
            this.drawLifes()
        }
    }

}