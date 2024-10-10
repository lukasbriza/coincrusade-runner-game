import { EventBus, EventBusEvents } from '../event-bus'

export const loadProgressEmiter = (progress: number) => {
  EventBus.emit(EventBusEvents.LoadProgress, progress)
}
