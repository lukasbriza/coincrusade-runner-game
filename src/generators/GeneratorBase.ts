import _ from "lodash";
import { PLATFORM_MAP_KEYS, TILE } from "../constants";
import { MapTypeExtended } from "../interfaces/_index";
import { GAME_PARAMETERS } from "../configurations";
import { PlatformManager } from "../objects/_index";
import { randomNumber } from "../utils/_index";

export class GeneratorBase {
    public manager: PlatformManager;

    constructor(manager: PlatformManager) {
        this.manager = manager
    }
    public dropCoin(chance: number): boolean {
        const random = Math.random()
        return random <= chance;
    }

    public addRandomPlatau(map: MapTypeExtended) {
        console.log(map.map[0].length)
        let localMap = { ...map }
        const plataus = randomNumber(GAME_PARAMETERS.minPlatauCount, GAME_PARAMETERS.maxPlatauCount, true)
        console.log({ plataus })
        const base = this.manager.getPlatformMapByKey(PLATFORM_MAP_KEYS.BASE)

        for (let i = 0; i < plataus; i++) {
            localMap.coins.push(null)
            localMap.width = localMap.width + TILE.width
            localMap.map.forEach((row, i) => {
                localMap.map[i] = row.concat(base.map[i])
            })
        }

        return localMap
    }
}