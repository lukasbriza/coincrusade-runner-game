import { EventBus, EventBusEvents } from '../event-bus'

export const noteDestroyedListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.NoteDestroyed, callback)
}
