import { EventBus, EventBusEvents } from '../event-bus'

export const knightLeftSideCollisionEmiter = (knight: IKnight) => {
  EventBus.emit(EventBusEvents.KnightLeftSideCollision, knight)
}
