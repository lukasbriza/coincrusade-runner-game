import type { GameStateContextProps } from '@/modules/game/components/context/types'

import type { ColliderObject } from '../../factories'
import { EventBus, EventBusEvents } from '../event-bus'

export const knightHitCallbackEmiter = (
  knight: IKnight,
  worldObject: ColliderObject,
  context: GameStateContextProps,
) => {
  EventBus.emit(EventBusEvents.KnightHitCallback, knight, worldObject, context)
}
