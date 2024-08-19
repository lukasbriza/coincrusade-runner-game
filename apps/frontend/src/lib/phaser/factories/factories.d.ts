/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare interface IKnight extends Phaser.Physics.Arcade.Sprite {
  id: number
  inAir: boolean
  isAttacking: boolean
  powerBar: IPowerbar
  tinted: boolean
  immortalAnimation: boolean
  immortalEvent: Phaser.Time.TimerEvent | undefined
  timerHelper: ITimerHelper
  knightHit: (knight: ColliderObject, worldObject: ColliderObject, context: GameStateContextProps) => void
  onCollideWithWorld: (worldObject: ColliderObject, worldObject: ColliderObject) => void
  removeListeners: () => void
}

declare interface ICoin extends Phaser.Physics.Arcade.Sprite {
  isPicked: boolean
  onScene: boolean
  inCoinCounter: boolean
  // pickCoin: (coinCounter: ICoinCounter, target: Coin) => void
}

declare interface IPowerbar extends Phaser.Physics.Arcade.Sprite {
  jumpPower: number
  powerBar: Phaser.GameObjects.Image
  setPercents: (percents: number) => void
  startCollecting: () => void
  stopCollecting: () => void
  setBarPosition: (x: number, y: number, center?: boolean) => void
}

declare interface ICoinCounter {
  count: number
  textTexture: Phaser.GameObjects.BitmapText
  nearTextcoin: ICoin
  incrementCounter: () => void
  resetCounter: () => void
}

declare interface ILifeCounter {
  addLife: (by: number) => void
  decreaseLife: () => void
  reset: () => void
}

declare interface ITimeCounter {
  time: Date
  timeText: Phaser.GameObjects.BitmapText
  addTimeText: Phaser.GameObjects.BitmapText
  addTimeCounter: number
  addTime: () => void
  showAdditionTextAnnouncement: () => void
}

declare interface INote {
  destroyAfter: (time: number) => void
}

declare interface IPlayerStatus {
  coinCounter: ICoinCounter
  timeCounter: ITimeCounter
  lifeCounter: ILifeCounter
}

declare interface IText extends Phaser.GameObjects.BitmapText {
  scene: Phaser.Scene
  destroyAfterTime: (time: number, callback: () => void) => void
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    knight(): IKnight
    coin(): ICoin
    life(): Phaser.Physics.Arcade.Sprite
    water(): Phaser.Physics.Arcade.Sprite
    powerbar(parent: Physics.Arcade.Sprite, id: number): IPowerbar
    timeCounter(): ITimeCounter
    lifeCounter(): ILifeCounter
    coinCounter(): ICoinCounter
    playerStatus(): IPlayerStatus
    text(x: number, y: number, text: string): IText
    note(text: string, x: number | 'center', y: number | 'center'): INote
  }
}
