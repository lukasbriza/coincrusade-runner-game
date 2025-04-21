import type { SaveGameLogsDto } from '@/lib/socket-io'

import { EventBus, EventBusEvents } from '../event-bus'

export const saveLogsListener = (callback: (request: SaveGameLogsDto) => void) => {
  EventBus.addListener(EventBusEvents.SaveLogs, callback)
}
