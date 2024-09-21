import type { GameObjects } from 'phaser'

import { EventBus, EventBusEvents } from '../event-bus'

export const coinPickedListener = (callback: (coin: GameObjects.GameObject) => void) => {
  EventBus.on(EventBusEvents.CoinPicked, callback)
}
