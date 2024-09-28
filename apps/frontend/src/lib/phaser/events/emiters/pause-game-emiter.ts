import { EventBus, EventBusEvents } from '../event-bus'

export const pauseGameEmiter = () => {
  EventBus.emit(EventBusEvents.PauseGame)
}
