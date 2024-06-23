import { ChunkLog } from "../types"
import { computePlatformModifier } from "./computePlatformModifier"

export const computePerformance = (sequence: ChunkLog) => {
    const elapsedSeconds = sequence.totalElapsedSeconds
    const gainedSeconds = sequence.totalGainedSeconds
    const remainingTime = 2 * 60 - elapsedSeconds + gainedSeconds
    let timePenalty = 0

    //TIMEPENALTY
    //MAX PENALTY = 0.5
    if (remainingTime < 60) timePenalty = 0.7
    if (remainingTime > 120) timePenalty = 0
    if (remainingTime >= 60 && remainingTime <= 120) {
        const temp = remainingTime - 60
        timePenalty = 1 - (1 / 60) * temp
    }

    //PLATFORM PENALTY
    //MAX PENALTY = 0.3
    const platformModifier = computePlatformModifier(0.3, 300, sequence.platformSpeed)

    const coinTemp = sequence.pickedCoins / sequence.generatedCoins

    const coinPerformance = coinTemp > 1 ? 1 : coinTemp
    const lifePerformance = sequence.lostLives > 3 ? 0 : 1 - (sequence.lostLives / 3)
    const timePerformance = 1 - timePenalty
    const platformPerformanceModifier = sequence.platformSpeed > 250 ? coinPerformance < 0.4 ? 0 : platformModifier : 0 //MAKE PROGRESS MORE DINAMIC IN EARLY STAGE


    const performance = (coinPerformance + lifePerformance + timePerformance - platformPerformanceModifier * 0.5) / 3
    return { performance, coinPerformance, lifePerformance, timePerformance, platformPerformanceModifier }
}