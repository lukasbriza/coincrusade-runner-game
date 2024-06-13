import { Scene } from "phaser";
import { IPlatformGenerator, IPlatformManager, MapTypeExtended } from "../interfaces/_index";
import { GeneratorBase } from "./GeneratorBase";
import { EVENTS, POOL_CONFIG, TILE } from "../constants";
import { hamletPrediction } from "../api/_index";
import { normalizeWeights, pickBaseOnNormalizedWeights } from "../utils/_index";
import { HAMLET_SYSTEM_GENERATOR_PARAMETERS } from "../configurations/_index";
import * as _ from "lodash-es";

export class HamletSystemGenerator extends GeneratorBase implements IPlatformGenerator {
    constructor(manager: IPlatformManager, scene: Scene) {
        super(manager, scene)

    }
    public async generate() {
        const lastChunk = window.gameState.getLastChunk()
        const config = window.configurationManager

        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth / 2
        let lenght = 0

        //FIRST CHUNK FLOW
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

        if (!lastChunk) {
            generateFirstChunkLogic()
            return finalMaps
        }

        const prediction = await hamletPrediction(lastChunk)

        if (!prediction) {
            generateFirstChunkLogic()
            return finalMaps
        }

        const factorDistributions = [
            HAMLET_SYSTEM_GENERATOR_PARAMETERS.coinDifficultyChangeDistributionValue,
            HAMLET_SYSTEM_GENERATOR_PARAMETERS.platformSpeedDifficultyChangeDistributionValue,
            HAMLET_SYSTEM_GENERATOR_PARAMETERS.platformPickDifficultyChangeDistributionValue
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

        let indexOfHighestValue = 0
        prediction.forEach((p, i) => {
            if (p >= prediction[indexOfHighestValue]) {
                indexOfHighestValue = i
            }
        })

        switch (indexOfHighestValue) {
            //DECREASE DIFFICULTY
            case 0:
                this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "decrease")
                this.eventHelper.dispatch(EVENTS.DIFFICULTY_SCORE_DECREASE)
                switch (pickIndex) {
                    case 0:
                        this.eventHelper.dispatch(EVENTS.ADD_NOTE, "DD: Increase coin generation")
                        this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "IncreaseCoinChance")
                        config.increaseCoinGenerationChance()
                        break;
                    case 1:
                        this.eventHelper.dispatch(EVENTS.ADD_NOTE, "DD: Decrease platform speed")
                        this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "DecreasePlatformSpeed")
                        config.decreasePlatformSpeed(20)
                        this.manager.reAssignPlatformSpeed()
                        break;
                    case 3:
                        this.eventHelper.dispatch(EVENTS.ADD_NOTE, "DD: Decrease platform pick difficulty")
                        this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "DecreaseMapDifficulty")
                        config.decreasePickedPlatformDifficulty()
                        break;
                }
                break;
            //DO NOTHING
            case 1:
                this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "neutral")
                break
            //INCREASE DIFFICULTY
            case 2:
                this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "increase")
                this.eventHelper.dispatch(EVENTS.DIFFICULTY_SCORE_INCREASE)
                switch (pickIndex) {
                    case 0:
                        this.eventHelper.dispatch(EVENTS.ADD_NOTE, "ID: Decrease coin drop")
                        this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "DecreaseCoinChance")
                        config.decreaseCoinGenerationChance()
                        break;
                    case 1:
                        this.eventHelper.dispatch(EVENTS.ADD_NOTE, "ID: Increase platform speed")
                        this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "IncreasePlatformSpeed")
                        config.increasePlatformSpeed(20)
                        this.manager.reAssignPlatformSpeed()
                        break;
                    case 2:
                        this.eventHelper.dispatch(EVENTS.ADD_NOTE, "ID: Increase platform pick difficulty")
                        this.eventHelper.dispatch(EVENTS.PARAMETER_CHANGED, "IncreaseMapDifficulty")
                        config.increasePickedPlatformDifficulty()
                        break;
                }
        }

        generateMap()
        return finalMaps
    }
}