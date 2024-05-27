import { GameObjects } from "phaser"

export type ITimeCounter = {
    time: Date
    timeText: GameObjects.BitmapText
    addTimetext: GameObjects.BitmapText
    addTimeCounter: number

    addTime: () => void
    showAdditionTextAnnouncement: () => void
    reset: () => void
}