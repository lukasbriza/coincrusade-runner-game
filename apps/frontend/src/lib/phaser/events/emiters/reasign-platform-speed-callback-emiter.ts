import { EventBus, EventBusEvents } from '../event-bus'

export const reasignPlatformSpeedCallbackEmiter = () => {
  EventBus.emit(EventBusEvents.ReasignPlatformSpeedCallback)
}
