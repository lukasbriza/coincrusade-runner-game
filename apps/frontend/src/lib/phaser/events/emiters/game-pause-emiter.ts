import { EventBus, EventBusEvents } from '../event-bus'

export const gamePauseEmiter = () => {
  EventBus.emit(EventBusEvents.PauseGame)
}
