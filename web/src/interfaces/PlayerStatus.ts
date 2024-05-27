import { ICoinCounter } from "./CoinCounter"
import { ILifeCounter } from "./LifeCounter"
import { ITimeCounter } from "./TimeCounter"

export type IPlayerStatus = {
    coinCounter: ICoinCounter
    timeCounter: ITimeCounter
    lifeCounter: ILifeCounter

    incrementCoinCounter: () => void
}