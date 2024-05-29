import { GameObjects, Physics } from "phaser";

export type IPowerbar = {
    powerBar: GameObjects.Image
    jumpPower: number

    setBarPosition: (x: number, y: number, center: boolean) => void
    setPercents: (percents: number) => void

} & Physics.Arcade.Sprite