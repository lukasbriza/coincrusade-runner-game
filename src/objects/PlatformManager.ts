import { GameObjects } from "phaser";
import { PlatformDatabase } from "./PlatformDatabase"
import { POOL_CONFIG, TILE } from "../constants";
import { EndlessPlainGenerator } from "../generators/EndlessPlainGenerator";
import { GroupHelper } from "../helpers/GroupHelper";
import { GameScene } from "../scenes/GameScene";

export class PlatformManager extends PlatformDatabase {
    public activeGroup: GameObjects.Group;
    public coinGroup: GameObjects.Group;
    public activeGroupHelper: GroupHelper;
    public coinGroupHelper: GroupHelper;

    //GENERATORS
    private endlessPlainGenerator: EndlessPlainGenerator;
    //

    constructor(scene: GameScene) {
        super(scene)

        this.activeGroup = scene.add.group({ removeCallback: () => this.onRemoveActiveGroupMember() })
        this.coinGroup = scene.add.group()

        this.activeGroup.addMultiple(this.generateInitialChunk().sprites, true)
        this.activeGroupHelper = new GroupHelper(this.activeGroup)
        this.coinGroupHelper = new GroupHelper(this.coinGroup)

        //GENERATORS INIT
        this.endlessPlainGenerator = new EndlessPlainGenerator(this)
        //

        scene.time.addEvent({
            delay: 2000,
            callback: this.processOutOfWorldMembers,
            loop: true,
            callbackScope: this
        })
    }
    ////////////////////////////
    //CORE LOGIC
    private generatePlatforms() {
        const maps = this.endlessPlainGenerator.generate()
        const lastMemberX = this.activeGroupHelper.getLastMemberOfGroupByX()?.body?.position.x
        const translationResult = this.translateMaptypes(maps, lastMemberX)

        //ADD TO GROUPS
        this.activeGroup.addMultiple(translationResult.sprites, true)
        this.coinGroup.addMultiple(translationResult.coins, true)
    }
    ////////////////////////////
    //ABL METHODS
    private processOutOfWorldMembers(): void {
        if (this.activeGroup.getLength() > 0) {
            const platforms = this.activeGroupHelper.findAllMembersByCondition(ch => ch.body!.position.x < -TILE.width)
            platforms.length > 0 && platforms.forEach(p => this.removePlatformFromGroup(p))
        }
        if (this.coinGroup.getLength() > 0) {
            const coins = this.coinGroupHelper.findAllMembersByCondition(ch => ch.body!.position.x < -TILE.width)
            coins.length > 0 && coins.forEach(c => this.removeCoinFromGroup(c))
        }

    }
    private onRemoveActiveGroupMember(): void {
        if (this.hasToGenerateNewPlatforms()) {
            this.generatePlatforms()
        }
    }

    //UTILITY METHODS
    public removeCoinFromGroup(coin: GameObjects.GameObject): void {
        this.coinGroup.remove(coin, true, true)
    }

    private removePlatformFromGroup(platform: GameObjects.GameObject): void {
        this.activeGroup.remove(platform, true, true)
    }
    private hasToGenerateNewPlatforms(): boolean {
        const lastPlatform = this.activeGroupHelper.getLastMemberOfGroupByX()
        if (lastPlatform && lastPlatform.body?.position.x) {
            return lastPlatform.body.position.x <= POOL_CONFIG.criticalPackageWidth
        }
        return true
    }
}
