import { EventBus, EventBusEvents } from '../event-bus'

export const noteAddedEmiter = (text: string, warning?: boolean, duration?: number) => {
  EventBus.emit(EventBusEvents.NoteAdded, text, warning, duration)
}
