import { GameObjects, Physics } from "phaser";
import { KEYS } from "../constants";
import { GAME_PARAMETERS } from "../configurations";
import { AssetHelper } from "../helpers/AssetHelper";

export class PowerBar extends Physics.Arcade.Sprite {
    private assetHelper: AssetHelper;

    private barWidth: number;
    private boundMargin: number;

    public powerBar: GameObjects.Image;
    public jumpPower: number = 0;

    constructor(parent: Physics.Arcade.Sprite) {
        super(parent.scene, 0, 0, KEYS.KNIGHT_POWERBAR)
        this.assetHelper = new AssetHelper(parent.scene)

        const bodyWidth = parent.body?.width ?? parent.width
        this.barWidth = (bodyWidth / 100) * 60
        this.boundMargin = (bodyWidth - this.barWidth) / 2

        this.powerBar = this.assetHelper.addImage(KEYS.KNIGHT_POWERBAR)
        this.powerBar.setOrigin(0, 0)
        this.powerBar.setCrop(0, 0, this.barWidth, 4);

        this.setBarPosition(parent.body?.x ?? parent.x, parent.body?.y ?? parent.y, true)
        this.setPercents(0)
    }

    public setBarPosition(x: number, y: number, center: boolean = true) {
        this.powerBar.setPosition(x + (center ? this.boundMargin : 0), y)
    }

    public setPercents(percent: number) {
        if (percent < 0 || percent > 100) throw new Error("Wrong percent property.")
        const width = (this.barWidth / 100) * percent
        this.powerBar.setOrigin(0, 0)
        this.powerBar.setCrop(0, 0, width, 4)
    }

    public increaseJumpPower() {
        if (this.jumpPower < GAME_PARAMETERS.powerJumpMaxCap) {
            this.jumpPower++
            this.setPercents((100 / GAME_PARAMETERS.powerJumpMaxCap) * this.jumpPower)
        }
    }
}