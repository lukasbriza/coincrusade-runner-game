import type { GameObjects } from 'phaser'

import type { IGroupHelper } from '../helpers'

export type IPlayerStatus = {
  coinCounter: ICoinCounter
  timeCounter: ITimeCounter
  lifeCounter: ILifeCounter
}

export type ILifeCounter = {
  addLife: () => void
  buildLifes: () => void
  reset: () => void
}

export type ITimeCounter = {
  time: Date
  timeText: Phaser.GameObjects.BitmapText
  addTimeText: Phaser.GameObjects.BitmapText
  addTimeCounter: number
  addTime: () => void
  showAdditionTextAnnouncement: () => void
}

export type ICoinCounter = {
  count: number
  textTexture: Phaser.GameObjects.BitmapText
  nearTextCoin: ICoin
  incrementCounter: () => void
  resetCounter: () => void
}

export type IPlatformManager = {
  activeGroup: GameObjects.Group
  coinGroup: GameObjects.Group
  decorationGroup: GameObjects.Group
  obstacleGroup: GameObjects.Group
  slopeGroup: GameObjects.Group

  activeGroupHelper: IGroupHelper
  coinGroupHelper: IGroupHelper
  decorationGroupHelper: IGroupHelper
  obstacleGroupHelper: IGroupHelper
  slopeGroupHelper: IGroupHelper
}
