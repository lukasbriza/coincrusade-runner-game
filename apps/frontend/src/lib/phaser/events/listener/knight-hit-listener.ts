import type { ColliderObject } from '../../factories'
import { EventBus, EventBusEvents } from '../event-bus'

export const knightHitListener = (callback: (knight: IKnight, worldObject: ColliderObject) => void) => {
  EventBus.on(EventBusEvents.KnightHit, callback)
}
