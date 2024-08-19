import type { GameObjects, Scene, Time } from 'phaser'

export type IGroupHelper = {
  group: GameObjects.Group
  getLastMemberOfGroupByX: () => GameObjects.GameObject | undefined
  findFirstMemberOfGroupByX: (
    additionalCondition?: (children: GameObjects.GameObject) => boolean,
  ) => GameObjects.GameObject | undefined
  findAllMembersByCondition: (condition: (children: GameObjects.GameObject) => boolean) => GameObjects.GameObject[]
  getMemberByName: <T extends GameObjects.GameObject>(name: string) => T | undefined
}

export type ITimerHelper = {
  scene: Scene
  timer: (
    callback: () => void,
    delay: number,
    scope: unknown,
    repeat: number | undefined,
    loop: boolean,
  ) => Time.TimerEvent
  removeTimer: (timer: Time.TimerEvent) => void
}
