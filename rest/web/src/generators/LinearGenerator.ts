import { LINEAR_GENERATOR } from "../configurations/_index";
import { POOL_CONFIG } from "../constants";
import { IPlatformGenerator, MapTypeExtended } from "../interfaces/_index";
import { generateMap, getChangeDistributions, pickBasedOnWeights } from "../utils/_index";
import { GeneratorBase } from "./GeneratorBase";
import * as _ from "lodash-es";

export class LinearGenerator extends GeneratorBase implements IPlatformGenerator {
    public async generate() {
        //SETUP
        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth
        let lenght = 0

        //ADJUSTMENT DISTRIBUTION CHANCES
        const factorDistributions = getChangeDistributions(LINEAR_GENERATOR)
        const pickIndex = pickBasedOnWeights(factorDistributions)

        //ADJUSTMENT
        this.applyDifficultyIncreasePolicy(pickIndex, 15)

        //MAP GENERATION
        generateMap(this, finalMaps, lenght, maxLenght)
        return finalMaps
    }
}