import { MapTypeExtended } from "../interfaces/_index";
import { PlatformManager } from "../objects/_index";
import { randomNumber } from "../utils/_index";
import { GeneratorBase } from "./GeneratorBase";
import _ from "lodash"

export class AllPlatformTestGenerator extends GeneratorBase {

    constructor(manager: PlatformManager) {
        super(manager)

        this.manager = manager
    }

    public generate(): MapTypeExtended {
        const allMaps = this.manager.getAllMaps();
        const targetIndex = randomNumber(0, allMaps.length - 1)

        //SELECT RANDOM MAP
        const map = allMaps[targetIndex]
        const coinArr: (string | null)[] = this.computeCoinChances(map.map, window.configurationManager.coinGenerationChance)
        const extendedMap = { coins: coinArr, ...map } as MapTypeExtended
        return this.addRandomPlatau(extendedMap)
    }

}