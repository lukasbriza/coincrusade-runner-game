import { EventBus, EventBusEvents } from '../event-bus'

export const knightDeadEmiter = (knight: IKnight) => {
  EventBus.emit(EventBusEvents.KnightDead, knight)
}
