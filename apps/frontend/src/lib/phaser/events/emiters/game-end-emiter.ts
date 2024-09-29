import { EventBus, EventBusEvents } from '../event-bus'

export const gameEndEmiter = () => {
  EventBus.emit(EventBusEvents.EndGame)
}
