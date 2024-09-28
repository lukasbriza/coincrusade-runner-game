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
  knightHit: (knight: ColliderObject, worldObject: ColliderObject) => void
  onCollideWithWorld: (worldObject: ColliderObject, worldObject: ColliderObject) => void
  removeListeners: () => void
}

declare interface ICoin extends Phaser.Physics.Arcade.Sprite {
  isPicked: boolean
  onScene: boolean
  inCoinCounter: boolean
  pickCoin: (coinCounter: ICoinCounter, target: Coin) => void
}

declare type IWater = Phaser.Physics.Arcade.Sprite & {
  playAnimation: () => void
}

declare interface IPowerbar extends Phaser.Physics.Arcade.Sprite {
  jumpPower: number
  setPercents: (percents: number) => void
  startCollecting: () => void
  stopCollecting: () => void
  setBarPosition: (x: number, y: number, center?: boolean) => void
}

declare interface INote extends Phaser.GameObjects.BitmapText {
  destroyAfter: (time: number) => void
}

declare interface IText extends Phaser.GameObjects.BitmapText {
  scene: Phaser.Scene
  destroyAfterTime: (time: number, callback: () => void) => void
}

declare type ISettingsButton = Phaser.Physics.Arcade.Sprite

declare interface IButton extends Phaser.Physics.Arcade.Sprite {
  mouseEnter: (key: string, callback?: () => void) => void
  mouseLeave: (key: string, callback?: () => void) => void
  mousePointerUp: (key: string, callback?: () => void) => void
  mousePointerDown: (key: string, callback?: () => void) => void
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    knight(): IKnight
    coin(x: number, y: number, gravity?: boolean): ICoin
    life(scene: Phaser.Scene, x?: number, y?: number): Physics.Arcade.Sprite
    emptyLife(scene: Phaser.Scene, x?: number, y?: number): Physics.Arcade.Sprite
    water(x: number, y: number): IWater
    powerbar(parent: Physics.Arcade.Sprite, id: number): IPowerbar
    text(x: number, y: number, text: string): IText
    note(text: string, x: number | 'center', y: number | 'center'): INote
    settingsButton(x: number, y: number): ISettingsButton
    button(x: number, y: number, key: string): IButton
  }
}
