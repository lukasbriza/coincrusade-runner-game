import type { GameStateContextProps } from '@/modules/game/components/context/types'

import type { ColliderObject } from '../../factories'
import { EventBus, EventBusEvents } from '../event-bus'

export const knightHitCallbackListener = (
  callback: (knight: IKnight, worldObject: ColliderObject, context?: GameStateContextProps) => void,
) => {
  EventBus.on(EventBusEvents.KnightHitCallback, callback)
}
