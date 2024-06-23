import { GameObjects, Scene, Time } from "phaser";
import { GAME_PARAMETERS } from "../../configurations/_index";
import { Life } from "./Life";
import { EVENTS, KEYS } from "../../constants";
import { ILifeCounter } from "../../interfaces/_index";
import { Eventhelper } from "../../helpers/_index";

export class LifeCounter implements ILifeCounter {
    private lifes: GameObjects.Image[] = []
    private lifeValue: number = GAME_PARAMETERS.maxPlayerLives;
    private canDecreaseLife: boolean = true;
    private eventHelper: Eventhelper
    private scene: Scene;
    private healTimer?: Time.TimerEvent;

    constructor(scene: Scene) {
        this.scene = scene
        this.eventHelper = new Eventhelper(scene)
        this.eventHelper.addListener(EVENTS.KNIGHT_HIT, this.decreaseLife, this)
        this.eventHelper.addListener(EVENTS.GAME_RESTART, this.reset, this)

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
            this.eventHelper.dispatch(EVENTS.LIFE_ADDED)

            if (this.lifeValue === GAME_PARAMETERS.maxPlayerLives && this.healTimer) {
                this.eventHelper.removeTimer(this.healTimer)
                this.healTimer = undefined
            }

            window.gameState.actualLives = this.lifeValue
        }
    }
    public decreaseLife(): void {
        if (this.lifeValue !== 0 && this.canDecreaseLife) {
            this.canDecreaseLife = false
            this.lifeValue = this.lifeValue - 1

            if (this.lifeValue < 0) {
                this.lifeValue = 0
            }
            this.drawLifes()
            this.eventHelper.timer(GAME_PARAMETERS.onHitImmortalityDuration, () => { this.canDecreaseLife = true }, this)
            this.eventHelper.dispatch(EVENTS.LIVE_DECREASED)

            if (!this.healTimer) this.dispatchHealtimer()
            window.gameState.actualLives = this.lifeValue
        }
        if (this.lifeValue === 0) {
            if (!window.gameState.playerIsDead) this.eventHelper.dispatch(EVENTS.PLAYER_DEAD)
            if (this.healTimer) this.eventHelper.removeTimer(this.healTimer)
        }
    }
    private dispatchHealtimer() {
        this.healTimer = this.eventHelper.timer(GAME_PARAMETERS.playerHealRateInSeconds * 1000, this.addLife, this, undefined, true)
    }
    private reset() {
        this.lifeValue = GAME_PARAMETERS.maxPlayerLives
        if (this.healTimer) {
            this.eventHelper.removeTimer(this.healTimer)
        }
        this.drawLifes()
    }
}