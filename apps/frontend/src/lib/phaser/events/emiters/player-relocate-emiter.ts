import type { GameStateContextProps } from '@/modules/game/components/context/types'

import { EventBus, EventBusEvents } from '../event-bus'

export const playerRelocateEmiter = (knight: IKnight, context: GameStateContextProps) => {
  EventBus.emit(EventBusEvents.PlayerRelocate, knight, context)
}
