import { EventBus, EventBusEvents } from '../event-bus'

export const knightLeftSideCollisionListener = (callback: (knight: IKnight) => void) => {
  EventBus.on(EventBusEvents.KnightLeftSideCollision, callback)
}
