import { ALL_PLATFORMS_TEST_GENERATOR } from "../configurations";
import { MapTypeExtended } from "../interfaces/_index";
import { PlatformManager } from "../objects/_index";
import { randomNumber } from "../utils/_index";
import { GeneratorBase } from "./GeneratorBase";
import _ from "lodash"

export class AllPlatformTestGenerator extends GeneratorBase {
    private config = ALL_PLATFORMS_TEST_GENERATOR;

    constructor(manager: PlatformManager) {
        super(manager)

        this.manager = manager
    }

    public generate(): MapTypeExtended {
        const coinArr: (string | null)[] = []

        const allMaps = this.manager.getAllMaps();
        const targetIndex = randomNumber(0, allMaps.length - 1)

        const map = allMaps[targetIndex]
        map?.map[0].forEach(() => {
            const isCoinChance = this.dropCoin(this.config.coinGenerationChance)
            coinArr.push(isCoinChance ? "coin" : null)
        })

        const extendedMap = { coins: coinArr, ...map } as MapTypeExtended
        return this.addRandomPlatau(extendedMap)
    }

}