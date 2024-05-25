import { GameObjects, Scene } from "phaser";
import { FONT_KEYS } from "../constants";
import { AssetHelper } from "../helpers/_index";
import { GAME_PARAMETERS } from "../configurations/_index";
import { ITimeCounter } from "../interfaces/_index";

export class TimeCounter implements ITimeCounter {
    public time: Date = new Date();
    public timeText: GameObjects.BitmapText;
    public addTimetext: GameObjects.BitmapText;
    public addTimeCounter: number = 0;

    constructor(scene: Scene, y?: number) {
        const assetHelper = new AssetHelper(scene)
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

        scene.time.addEvent({
            delay: 1000,
            callback: this.secondPassed,
            loop: true,
            callbackScope: this
        })
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
        this.time.setSeconds(this.time.getSeconds() + GAME_PARAMETERS.timeAdditionInSeconds)
        this.showAdditionTextAnnouncement()
    }

    public showAdditionTextAnnouncement(): void {
        this.addTimetext.setAlpha(1)
        setTimeout(() => {
            this.addTimetext.setAlpha(0)
        }, 1500)
    }

    public reset(): void {
        this.init()
    }
}