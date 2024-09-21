import type { ColliderObject } from '../../factories'
import { EventBus, EventBusEvents } from '../event-bus'

export const knightHitCallbackEmiter = (knight: IKnight, worldObject?: ColliderObject) => {
  EventBus.emit(EventBusEvents.KnightHitCallback, knight, worldObject)
}
