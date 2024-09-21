import type { ColliderObject } from '../../factories'
import { EventBus, EventBusEvents } from '../event-bus'

export const knightHitCallbackListener = (callback: (knight: IKnight, worldObject: ColliderObject) => void) => {
  EventBus.on(EventBusEvents.KnightHitCallback, callback)
}
