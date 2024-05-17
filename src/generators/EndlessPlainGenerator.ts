import { PLATFORM_MAP_KEYS, POOL_CONFIG } from "../constants";
import { GroupHelper } from "../helpers/_index";
import { PlatformManager } from "../objects/_index";
import { MapTypeExtended } from "../interfaces/_index";
import { ENDLESS_PLAIN_GENERATOR_PARAMETERS } from "../configurations";
import { GeneratorBase } from "./GeneratorBase";

export class EndlessPlainGenerator extends GeneratorBase {
    private config = ENDLESS_PLAIN_GENERATOR_PARAMETERS;
    private manager: PlatformManager;
    private groupHelper: GroupHelper;

    constructor(manager: PlatformManager) {
        super()

        this.manager = manager
        this.groupHelper = new GroupHelper(this.manager.activeGroup)
    }

    public generate(): MapTypeExtended[] {
        const mapArray: MapTypeExtended[] = []
        const lastMember = this.groupHelper.getLastMemberOfGroupByX()
        if (lastMember) {
            const map = this.manager.getPlatformMapByKey(PLATFORM_MAP_KEYS.BASE)
            //GET WIDTH OF SPACE THAT NEED TO GENERATE
            const difference = POOL_CONFIG.maxChunkPackageWidth - lastMember.body!.position.x

            //GENERATE
            const iterations = Math.ceil(difference / map.width)
            for (let i = 0; i < iterations; i++) {
                //GET COIN CHANCE
                const isCoinChance = this.dropCoin(this.config.coinGenerationChance)

                mapArray.push({ ...map, coins: [isCoinChance ? "coin" : null] })
            }
        }

        return mapArray;
    }
}