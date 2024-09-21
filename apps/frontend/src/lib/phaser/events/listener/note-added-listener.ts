import { EventBus, EventBusEvents } from '../event-bus'

export const noteAddedListener = (callback: (text: string, warning?: boolean, duration?: number) => void) => {
  EventBus.on(EventBusEvents.NoteAdded, callback)
}
