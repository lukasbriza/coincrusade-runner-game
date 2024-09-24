import { EventBus, EventBusEvents } from '../event-bus'

export const playerRelocateEmiter = (knight: IKnight) => {
  EventBus.emit(EventBusEvents.PlayerRelocate, knight)
}
