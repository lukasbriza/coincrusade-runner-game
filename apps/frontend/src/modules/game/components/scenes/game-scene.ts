import { Scene } from 'phaser'

import { EventBus } from '@/lib/phaser'

export class GameScene extends Scene {
  constructor() {
    super('game')
    console.log('here')
    EventBus.emit('test')
  }
}
