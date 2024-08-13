import { getNeuralPrediction } from "../api/_index";
import { NEURAL_NETWORK_GENERATOR } from "../configurations/_index";
import { DIFF_POLICY, EVENTS, POOL_CONFIG } from "../constants";
import { IPlatformGenerator, MapTypeExtended } from "../interfaces/_index";
import { generateFirstchunk, generateMap, getChangeDistributions, pickBasedOnWeights } from "../utils/_index";
import { GeneratorBase } from "./GeneratorBase";
import * as _ from "lodash-es";

export class NeuralNetworkGenerator extends GeneratorBase implements IPlatformGenerator {
    public async generate() {
        //SETUP
        const lastChunk = window.gameState.getLastChunk()
        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth
        let lenght = 0

        //FIRST CHUNK FLOW
        if (!lastChunk) {
            generateFirstchunk(this, finalMaps, lenght, maxLenght)
            return finalMaps
        }

        //GET PREDICTION FROM NEURAL NETWORK BASED ON CHUNK DATA
        const prediction = await getNeuralPrediction(lastChunk)

        //ERROR FLOW WHEN API FAILS
        if (!prediction) {
            console.log("API call failed.")
            generateFirstchunk(this, finalMaps, lenght, maxLenght)
            return finalMaps
        }

        //ADJUSTMENT DISTRIBUTION CHANCES
        const factorDistributions = getChangeDistributions(NEURAL_NETWORK_GENERATOR)
        const pickIndex = pickBasedOnWeights(factorDistributions)

        //TRANSLATE NEURAL NETWORK OUTPUT
        let indexOfHighestValue = 0
        prediction.forEach((p, i) => {
            if (p >= prediction[indexOfHighestValue]) {
                indexOfHighestValue = i
            }
        })

        //ADJUSTMENT
        switch (indexOfHighestValue) {
            case DIFF_POLICY.DECREASE:
                console.log("decrease")
                this.applyDifficultyDecreasePolicy(pickIndex)
                break;
            case DIFF_POLICY.NOTHING:
                console.log("nothing")
                this.eventHelper.dispatch(EVENTS.SUGGESTED_ACTION, "neutral")
                break;
            case DIFF_POLICY.INCREASE:
                console.log("increase")
                this.applyDifficultyIncreasePolicy(pickIndex)
                break;
        }

        //MAP GENERATION
        generateMap(this, finalMaps, lenght, maxLenght)
        return finalMaps
    }
}