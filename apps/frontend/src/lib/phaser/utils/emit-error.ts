import { EventBus, EventBusEvents } from '../events/event-bus'

export const emitError = (message: string) => {
  EventBus.emit(EventBusEvents.ThrowError, message)
  throw new Error(message)
}
