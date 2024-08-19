/* eslint-disable lines-between-class-members */

import type { Scene } from 'phaser'

export class PlayerStatus implements IPlayerStatus {
  private scene: Scene

  public coinCounter: ICoinCounter
  public timeCounter: ITimeCounter
  public lifeCounter: ILifeCounter

  constructor(scene: Scene) {
    this.scene = scene
  }
}
