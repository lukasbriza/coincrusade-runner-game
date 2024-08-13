import { GAME_PARAMETERS, HAMLET_SYSTEM_GENERATOR_PARAMETERS } from "../configurations/_index";
import { EVENTS, POOL_CONFIG } from "../constants";
import { IPlatformGenerator, MapTypeExtended } from "../interfaces/_index";
import { generateFirstchunk, generateMap, getChangeDistributions, pickBasedOnWeights } from "../utils/_index";
import { GeneratorBase } from "./GeneratorBase";

export class HamletSystemGenerator extends GeneratorBase implements IPlatformGenerator {
    public async generate() {
        //SETUP
        const lastTwoChunks = window.gameState.getLastTwoChunks()
        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth
        let lenght = 0

        //FIRST TWO CHUNKS FLOW
        if (!lastTwoChunks) {
            generateFirstchunk(this, finalMaps, lenght, maxLenght)
            return finalMaps
        }

        //PREPARE STATISTICAL DATA
        const { lostLives, elapsedSeconds, gainedSeconds, generatedCoins, pickedCoins } = lastTwoChunks.map(ch => ({
            lostLives: ch.lostLives,
            elapsedSeconds: ch.elapsedSeconds,
            gainedSeconds: ch.gainedSeconds,
            generatedCoins: ch.generatedCoins,
            pickedCoins: ch.pickedCoins
        })).reduce((prev, acc) => ({
            lostLives: prev.lostLives + acc.lostLives,
            elapsedSeconds: prev.elapsedSeconds + acc.elapsedSeconds,
            gainedSeconds: prev.gainedSeconds + acc.gainedSeconds,
            generatedCoins: prev.generatedCoins + acc.generatedCoins,
            pickedCoins: prev.pickedCoins + acc.pickedCoins
        }))

        //COMPUTE NORMALIZED INVENTORY LEVEL
        const coinLevel = pickedCoins / generatedCoins

        const timePerformance = gainedSeconds / elapsedSeconds
        const timeLevel = timePerformance > 1 ? 1 : timePerformance

        const livesPerformance = lostLives > GAME_PARAMETERS.maxPlayerLives ? GAME_PARAMETERS.maxPlayerLives : lostLives
        const livesLevel = 1 - (livesPerformance / GAME_PARAMETERS.maxPlayerLives)

        const inventoryLevel = (coinLevel + timeLevel + livesLevel) / 3

        //ADJUSTMENT DISTRIBUTION CHANCES
        const factorDistributions = getChangeDistributions(HAMLET_SYSTEM_GENERATOR_PARAMETERS)
        const pickIndex = pickBasedOnWeights(factorDistributions)

        //RESOLVE DIFFICULTY ADJUSTMENT BASED ON DIFFICULTY LEVEL
        //INCREASE DIFF
        if (inventoryLevel > 0.55) {
            this.applyDifficultyIncreasePolicy(pickIndex)
        }
        //DECREASE DIFF
        if (inventoryLevel < 0.45) {
            this.applyDifficultyDecreasePolicy(pickIndex)
        }
        //DO NOTHING
        if (inventoryLevel >= 0.45 && inventoryLevel <= 0.55) {
            this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "neutral")
        }

        //MAP GENERATION
        generateMap(this, finalMaps, lenght, maxLenght)
        return finalMaps
    }
}