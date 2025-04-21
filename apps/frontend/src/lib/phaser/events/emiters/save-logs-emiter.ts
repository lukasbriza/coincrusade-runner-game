import type { SaveGameLogsDto } from '@/lib/socket-io'

import { EventBus, EventBusEvents } from '../event-bus'

export const saveLogsEmiter = (request: SaveGameLogsDto) => {
  EventBus.emit(EventBusEvents.SaveLogs, request)
}
