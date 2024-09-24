import type { GameObjects } from 'phaser'

import { EventBus, EventBusEvents } from '../event-bus'

export const coinPickedEmiter = (coin: GameObjects.GameObject) => {
  EventBus.emit(EventBusEvents.CoinPicked, coin)
}
