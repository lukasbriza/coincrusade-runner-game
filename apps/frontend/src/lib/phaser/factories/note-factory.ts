/* eslint-disable func-names */
import type { Scene } from 'phaser'
import { GameObjects } from 'phaser'

import { EventBus, EventBusEvents } from '../event-bus'

import { Text } from './text-factory'

export class Note extends Text implements INote {
  constructor(scene: Scene, text: string, x: number | 'center', y: number | 'center') {
    super(scene, 0, 0, text)

    this.setScale(2, 2)
    this.setOrigin(0.5, 0)
    this.setPosition(this.getTextX(x), this.getTextY(y))
  }

  private getTextX(x: number | 'center') {
    if (typeof x === 'string') {
      return this.scene.renderer.width / 2
    }
    return x
  }

  private getTextY(y: number | 'center') {
    if (typeof y === 'string') {
      return this.scene.renderer.height / 2 - this.height / 2
    }
    return y
  }

  public destroyAfter(time: number) {
    this.destroyAfterTime(time, () => {
      this.destroy()
      EventBus.emit(EventBusEvents.NoteDestroyed)
    })
  }
}

export const initNoteFactory = () => {
  GameObjects.GameObjectFactory.register(
    'note',
    function (this: Phaser.GameObjects.GameObjectFactory, text: string, x: number | 'center', y: number | 'center') {
      const note = new Note(this.scene, text, x, y)
      this.scene.add.existing(note)
      return note
    },
  )
}
