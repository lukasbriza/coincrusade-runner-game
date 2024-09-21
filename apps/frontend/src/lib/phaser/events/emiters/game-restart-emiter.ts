import { EventBus, EventBusEvents } from '../event-bus'

export const gameRestartEmiter = () => {
  EventBus.emit(EventBusEvents.RestartGame)
}
