import { EventBus, EventBusEvents } from '../event-bus'

export const loadProgressListener = (callback: (progress: number) => void) => {
  EventBus.on(EventBusEvents.LoadProgress, callback)
}
