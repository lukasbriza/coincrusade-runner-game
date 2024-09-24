import { EventBus, EventBusEvents } from '../event-bus'

export const knightDeadListener = (callback: (knight: IKnight) => void) => {
  EventBus.on(EventBusEvents.KnightDead, callback)
}
