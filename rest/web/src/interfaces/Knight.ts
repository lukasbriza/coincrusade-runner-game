import { Physics } from "phaser"
import { ColliderObject } from "./Common"

export type IKnight = {
    inAir: boolean
    isAttacking: boolean

    onCollideWithWorld: (obj: ColliderObject, worldObj: ColliderObject) => void
    update: () => void
    setBottomY: (y: number) => void
} & Physics.Arcade.Sprite