import { Scene } from "phaser";
import { POOL_CONFIG, TILE } from "../constants";
import { MapTypeExtended } from "../interfaces/_index";
import { PlatformManager } from "../objects/_index";
import { randomNumber } from "../utils/_index";
import { GeneratorBase } from "./GeneratorBase";

export class AllPlatformTestGenerator extends GeneratorBase {

    constructor(manager: PlatformManager, scene: Scene) {
        super(manager, scene)
    }

    public generate(): MapTypeExtended[] {
        const allMaps = this.getAllMaps();

        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth
        let lenght = 0

        //SELECT RANDOM MAP
        const generateMap = () => {
            const targetIndex = randomNumber(0, allMaps.length - 1)
            const map = allMaps[targetIndex]
            const coinArr: (string | null)[] = this.computeCoinChances(map.map, window.configurationManager.coinGenerationChance)
            const extendedMap = { coins: coinArr, ...map } as MapTypeExtended
            const extendedMapWithPlatau = this.addRandomPlatau(extendedMap)
            finalMaps.push(extendedMapWithPlatau)
            extendedMap.map[0].forEach(() => { lenght = lenght + TILE.width })

            if (lenght < maxLenght) {
                generateMap()
            }
        }
        generateMap()
        return finalMaps
    }

}