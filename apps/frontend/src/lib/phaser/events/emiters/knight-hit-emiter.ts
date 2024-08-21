import type { ColliderObject } from '../../factories'
import { EventBus, EventBusEvents } from '../event-bus'

export const knightHitEmiter = (knight: IKnight, obstacle: ColliderObject) => {
  EventBus.emit(EventBusEvents.KnightHit, knight, obstacle)
}
