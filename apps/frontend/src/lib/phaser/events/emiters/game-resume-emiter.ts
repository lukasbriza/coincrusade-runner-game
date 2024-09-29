import { EventBus, EventBusEvents } from '../event-bus'

export const gameResumeEmiter = () => {
  EventBus.emit(EventBusEvents.ResumeGame)
}
