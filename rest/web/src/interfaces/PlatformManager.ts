import { GameObjects } from "phaser"
import { IPlatformDatabase } from "./PlatformDatabase"
import { GroupHelper } from "../helpers/_index"

export type IPlatformManager = {
    activeGroup: GameObjects.Group
    coinGroup: GameObjects.Group
    decorationGroup: GameObjects.Group

    activeGroupHelper: GroupHelper
    coinGroupHelper: GroupHelper
    decorationGroupHelper: GroupHelper

    removeCoinFromGroup: (coin: GameObjects.GameObject) => void
    reAssignPlatformSpeed: () => void
} & IPlatformDatabase