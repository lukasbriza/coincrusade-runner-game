import { GameObjects, Physics, Time } from "phaser";
import { EVENTS, KEYS } from "../constants";
import { GAME_PARAMETERS } from "../configurations/_index";
import { IPowerbar } from "../interfaces/_index";
import { Eventhelper, AssetHelper } from "../helpers/_index";

export class PowerBar extends Physics.Arcade.Sprite implements IPowerbar {
    private assetHelper: AssetHelper;
    private eventHelper: Eventhelper

    private barWidth: number;
    private boundMargin: number;

    public powerBar: GameObjects.Image;
    public jumpPower: number = 0;
    private timer: Time.TimerEvent;

    constructor(parent: Physics.Arcade.Sprite) {
        super(parent.scene, 0, 0, KEYS.KNIGHT_POWERBAR)
        this.assetHelper = new AssetHelper(parent.scene)
        this.eventHelper = new Eventhelper(parent.scene)
        this.eventHelper.addListener(EVENTS.COLLECT_JUMP_POWER, this.startCollecting, this)
        this.eventHelper.addListener(EVENTS.STOP_COLLECT_JUMP_POWER, this.stopCollecting, this)

        const bodyWidth = (parent.body?.width ?? parent.width) + 20
        this.barWidth = (bodyWidth / 100) * 60
        this.boundMargin = (bodyWidth - 20 - this.barWidth) / 2

        this.powerBar = this.assetHelper.addImage(KEYS.KNIGHT_POWERBAR)
        this.powerBar.setOrigin(0, 0)
        this.powerBar.setCrop(0, 0, this.barWidth, 4);

        this.setBarPosition(parent.body?.x ?? parent.x, parent.body?.y ?? parent.y, true)
        this.setPercents(0)

        this.powerBar.setDepth(1)
    }

    public setBarPosition(x: number, y: number, center: boolean = true): void {
        this.powerBar.setPosition(x + (center ? this.boundMargin : 0), y)
    }

    public setPercents(percent: number): void {
        if (percent < 0 || percent > 100) throw new Error("Wrong percent property.")
        const width = (this.barWidth / 100) * percent
        this.powerBar.setOrigin(0, 0)
        this.powerBar.setCrop(0, 0, width, 4)
    }

    private increaseJumpPower(): void {
        if (this.jumpPower < GAME_PARAMETERS.powerJumpMaxCap) {
            this.jumpPower++
            this.setPercents((100 / GAME_PARAMETERS.powerJumpMaxCap) * this.jumpPower)
        }
    }

    private startCollecting() {
        this.timer = this.eventHelper.timer(GAME_PARAMETERS.powerJumpLoadDelay, this.increaseJumpPower, this, undefined, true)
    }
    private stopCollecting() {
        this.eventHelper.removeTimer(this.timer)
        this.jumpPower = 0
    }
}