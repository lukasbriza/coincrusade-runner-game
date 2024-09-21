import { EventBus, EventBusEvents } from '../event-bus'

export const noteDestroyedEmiter = () => {
  EventBus.emit(EventBusEvents.NoteDestroyed)
}
