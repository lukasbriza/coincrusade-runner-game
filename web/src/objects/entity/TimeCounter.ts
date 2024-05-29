import { GameObjects, Scene } from "phaser";
import { EVENTS, FONT_KEYS } from "../../constants";
import { AssetHelper, Eventhelper } from "../../helpers/_index";
import { GAME_PARAMETERS } from "../../configurations/_index";
import { ITimeCounter } from "../../interfaces/_index";

export class TimeCounter implements ITimeCounter {
    public time: Date = new Date();
    public timeText: GameObjects.BitmapText;
    public addTimetext: GameObjects.BitmapText;
    public addTimeCounter: number = 0;

    private eventHelper: Eventhelper;

    constructor(scene: Scene, y?: number) {
        const assetHelper = new AssetHelper(scene)
        this.eventHelper = new Eventhelper(scene)

        this.init()
        this.timeText = assetHelper.addText(FONT_KEYS.MAIN, 0, 0, this.getTimeStringFormat())
        this.timeText.setOrigin(1, 0)
        this.timeText.setScale(2, 2)
        this.timeText.setPosition(scene.renderer.width - 25, y ?? 0)

        this.addTimetext = assetHelper.addText(FONT_KEYS.MAIN, 0, 0, `+${GAME_PARAMETERS.timeAdditionInSeconds}`)
        this.addTimetext.setOrigin(1, 0)
        this.addTimetext.setScale(2, 2)
        this.addTimetext.setPosition(scene.renderer.width - 25, (y ?? 0) + this.timeText.height - 15)
        this.addTimetext.setAlpha(0)

        this.eventHelper.timer(1000, this.secondPassed, this, undefined, true)
        this.eventHelper.addListener(EVENTS.COIN_PICKED, this.addTime, this)
    }
    private init(): void {
        this.time.setFullYear(2000, 1, 1)
        this.time.setHours(0, 0, 0, 0)
        this.time.setMinutes(2)
    }

    private secondPassed(): void {
        this.time.setSeconds(this.time.getSeconds() - 1)
        this.timeText.text = this.getTimeStringFormat()
    }

    private getTimeStringFormat(): string {
        const minutes = this.time.getMinutes()
        const seconds = this.time.getSeconds()
        const minutesString = minutes === 0 ? "0" : minutes.toString()
        const secondsString = seconds === 0 ? "00" : seconds < 10 ? "0" + seconds.toString() : seconds.toString()
        return `${minutesString}:${secondsString}`
    }

    public addTime(): void {
        this.addTimeCounter++
        if (this.addTimeCounter >= GAME_PARAMETERS.addTimeEveryNumberOfCoins) {
            this.time.setSeconds(this.time.getSeconds() + GAME_PARAMETERS.timeAdditionInSeconds)
            this.showAdditionTextAnnouncement()
            this.addTimeCounter = 0
        }
    }

    public showAdditionTextAnnouncement(): void {
        this.addTimetext.setAlpha(1)
        this.eventHelper.timer(1250, () => { this.addTimetext.setAlpha(0) }, this)
    }

    public reset(): void {
        this.init()
    }
}