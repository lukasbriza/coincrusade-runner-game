import { EventBus, EventBusEvents } from '../event-bus'

export const chunkEndEmiter = () => {
  EventBus.emit(EventBusEvents.ChunkEnd)
}
