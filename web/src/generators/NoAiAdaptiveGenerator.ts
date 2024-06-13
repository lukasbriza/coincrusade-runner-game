import { GAME_PARAMETERS, NO_AI_ADAPTIVE_GENERATOR_PARAMETERS } from "../configurations/_index"
import { EVENTS, POOL_CONFIG, TILE } from "../constants";
import { IPlatformGenerator, MapTypeExtended } from "../interfaces/_index";
import { normalizeWeights, pickBaseOnNormalizedWeights } from "../utils/_index"
import { GeneratorBase } from "./GeneratorBase"
import * as _ from "lodash-es";

export class NoAIAdaptiveGenerator extends GeneratorBase implements IPlatformGenerator {
    public async generate() {
        const logs = window.gameState.getLastTwoChunks()
        const config = window.configurationManager

        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth
        let lenght = 0

        //FIRST CHUNK FLOW
        if (!logs) {
            const generateFirstChunkLogic = () => {
                const maps1 = this.getPlatformMapsByDifficulty(1)
                const maps2 = this.getPlatformMapsByDifficulty(2)
                const maps = [...maps1, ...maps2]
                const map = _.sample(maps) ?? maps[0]
                const coinArr: (string | null)[] = this.computeCoinChances(map.map, window.configurationManager.coinGenerationChance)
                const extendedMap = { coins: coinArr, ...map } as MapTypeExtended
                const extendedMapWithPlatau = this.addRandomPlatau(extendedMap)
                finalMaps.push(extendedMapWithPlatau)
                extendedMap.map[0].forEach(() => { lenght = lenght + TILE.width })

                if (lenght < maxLenght) {
                    generateFirstChunkLogic()
                }
            }
            generateFirstChunkLogic()
            return finalMaps
        }

        const state = logs?.map(l => ({
            pickedCoins: l.pickedCoins,
            generatedCoins: l.generatedCoins,
            lostLives: l.lostLives,
            gainedSeconds: l.gainedSeconds,
            elapsedSeconds: l.elapsedSeconds,
        })).reduce((prev, acc) => ({
            pickedCoins: prev.pickedCoins + acc.pickedCoins,
            generatedCoins: prev.generatedCoins + acc.generatedCoins,
            lostLives: prev.lostLives + acc.lostLives,
            gainedSeconds: prev.gainedSeconds + acc.gainedSeconds,
            elapsedSeconds: prev.elapsedSeconds + acc.elapsedSeconds
        }))

        //NORMALIZED VALUES
        const coinRatio = state.pickedCoins / state.generatedCoins
        const lifeLossRatio = 1 - (state.lostLives / GAME_PARAMETERS.maxPlayerLives)

        const remainingTime = (GAME_PARAMETERS.baseTimeInMinutes * 60) - window.gameState.elapsedSeconds + window.gameState.gainedSeconds
        let timePenalty = 0
        if (remainingTime < 60) timePenalty = 0.1
        if (remainingTime > 120) timePenalty = 0
        if (remainingTime >= 60 && remainingTime <= 120) {
            const temp = remainingTime - 60
            timePenalty = (temp / (60 / 10)) / 100
        }

        //PERFORMANCE SCORE
        const performance = (coinRatio + (lifeLossRatio < 0 ? 0 : lifeLossRatio) - timePenalty) / 2

        console.group("PERFORMANCE")
        console.log({
            coinRatio,
            lifeLossRatio,
            timePenalty,
            performance
        })
        console.groupEnd()

        const factorDistributions = [
            NO_AI_ADAPTIVE_GENERATOR_PARAMETERS.coinDifficultyChangeDistributionValue,
            NO_AI_ADAPTIVE_GENERATOR_PARAMETERS.platformSpeedDifficultyChangeDistributionValue,
            NO_AI_ADAPTIVE_GENERATOR_PARAMETERS.platformPickDifficultyChangeDistributionValue
        ]

        const normalizedFactors = normalizeWeights(factorDistributions)
        const pickIndex = pickBaseOnNormalizedWeights(normalizedFactors)

        //LOOP
        const generateMap = () => {
            const wantedDifficultyValue = this.weightedMapDifficultyPick()
            const mapsByDifficulty = this.getPlatformMapsByDifficulty(wantedDifficultyValue)
            const map = _.sample(mapsByDifficulty) ?? mapsByDifficulty[0]

            const coins: (string | null)[] = this.computeCoinChances(map.map, window.configurationManager.coinGenerationChance)
            const extendedMap = { coins, ...map } as MapTypeExtended
            const extendedMapWithPlatau = this.addRandomPlatau(extendedMap)
            finalMaps.push(extendedMapWithPlatau)
            extendedMap.map[0].forEach(() => { lenght = lenght + TILE.width })

            if (lenght < maxLenght) {
                generateMap()
            }
        }

        //DECREASE DIFFICULTY
        if (performance <= config.difficultyChangeBorders[0]) {
            this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "decrease")
            this.eventHelper.dispatch(EVENTS.DIFFICULTY_SCORE_DECREASE)
            switch (pickIndex) {
                case 0:
                    this.eventHelper.dispatch(EVENTS.ADD_NOTE, "DD: Increase coin generation")
                    this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "IncreaseCoinChance")

                    console.group()
                    console.log("increase coin generation")
                    console.log({ before: config.coinGenerationChance })
                    config.increaseCoinGenerationChance()
                    console.log({ after: config.coinGenerationChance })
                    console.groupEnd()
                    break;
                case 1:
                    this.eventHelper.dispatch(EVENTS.ADD_NOTE, "DD: Decrease platform speed")
                    this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "DecreasePlatformSpeed")

                    console.group()
                    console.log("decrease platform speed")
                    console.log({ before: config.platformStartSpeed })
                    config.decreasePlatformSpeed(20)
                    console.log({ after: config.platformStartSpeed })
                    console.groupEnd()
                    this.manager.reAssignPlatformSpeed()
                    break;
                case 2:
                    this.eventHelper.dispatch(EVENTS.ADD_NOTE, "DD: Decrease platform pick difficulty")
                    this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "DecreaseMapDifficulty")

                    console.group()
                    console.log("decrease platform pick difficulty")
                    console.log({ before: config.skillFactor })
                    config.decreasePickedPlatformDifficulty()
                    console.log({ after: config.skillFactor })
                    console.groupEnd()
                    break;
            }
            generateMap()
            config.resetDifficultyBorders()
        }
        //INCREASE DIFFICULTY
        if (performance >= config.difficultyChangeBorders[1]) {
            this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "increase")
            this.eventHelper.dispatch(EVENTS.DIFFICULTY_SCORE_INCREASE)
            switch (pickIndex) {
                case 0:
                    this.eventHelper.dispatch(EVENTS.ADD_NOTE, "ID: Decrease coin drop")
                    this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "DecreaseCoinChance")

                    console.group()
                    console.log("decrease coin drop")
                    console.log({ before: config.coinGenerationChance })
                    config.decreaseCoinGenerationChance()
                    console.log({ after: config.coinGenerationChance })
                    console.groupEnd()
                    break;
                case 1:
                    this.eventHelper.dispatch(EVENTS.ADD_NOTE, "ID: Increase platform speed")
                    this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "IncreasePlatformSpeed")

                    console.group()
                    console.log("increase platform speed")
                    console.log({ before: config.platformStartSpeed })
                    config.increasePlatformSpeed(20)
                    console.log({ after: config.platformStartSpeed })
                    console.groupEnd()
                    this.manager.reAssignPlatformSpeed()
                    break;
                case 2:
                    this.eventHelper.dispatch(EVENTS.ADD_NOTE, "ID: Increase platform pick difficulty")
                    this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "IncreaseMapDifficulty")

                    console.group()
                    console.log("increase platform pick difficulty")
                    console.log({ before: config.skillFactor })
                    config.increasePickedPlatformDifficulty()
                    console.log({ after: config.skillFactor })
                    console.groupEnd()
                    break;
            }
            generateMap()
            config.resetDifficultyBorders()
        }
        //TIGHTEN BORDER AND DO NOTHING TO SKILL SCORE
        if (performance > config.difficultyChangeBorders[0] && performance < config.difficultyChangeBorders[1]) {
            this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "neutral")
            generateMap()
            config.closeDifficultyChangeBorders()
        }

        return finalMaps
    }
}