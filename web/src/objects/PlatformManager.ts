import { GameObjects } from "phaser";
import { PlatformDatabase } from "./PlatformDatabase"
import { EVENTS, POOL_CONFIG, TILE } from "../constants";
import { GroupHelper } from "../helpers/GroupHelper";
import { GameScene } from "../scenes/GameScene";
import { AllPlatformTestGenerator, EndlessPlainGenerator } from "../generators/_index";
import { GAME_PARAMETERS } from "../configurations/_index";
import { IPlatformManager } from "../interfaces/_index";
import { Eventhelper } from "../helpers/_index";

export class PlatformManager extends PlatformDatabase implements IPlatformManager {
    public activeGroup: GameObjects.Group;
    public coinGroup: GameObjects.Group;
    public decorationGroup: GameObjects.Group;
    public obstacleGroup: GameObjects.Group;

    public activeGroupHelper: GroupHelper;
    public coinGroupHelper: GroupHelper;
    public decorationGroupHelper: GroupHelper;
    public obstacleGroupHelper: GroupHelper;

    //GENERATORS
    private endlessPlainGenerator: EndlessPlainGenerator;
    private allPlatgormTestGenerator: AllPlatformTestGenerator;
    //

    constructor(scene: GameScene) {
        super(scene)

        this.activeGroup = scene.add.group()
        this.coinGroup = scene.add.group()
        this.decorationGroup = scene.add.group()
        this.obstacleGroup = scene.add.group()

        const initChunk = this.generateInitialChunk()
        this.activeGroup.addMultiple(initChunk.platforms, true)
        this.decorationGroup.addMultiple(initChunk.decorations, true)

        this.activeGroupHelper = new GroupHelper(this.activeGroup)
        this.coinGroupHelper = new GroupHelper(this.coinGroup)
        this.decorationGroupHelper = new GroupHelper(this.decorationGroup)
        this.obstacleGroupHelper = new GroupHelper(this.obstacleGroup)

        this.eventHelper = new Eventhelper(scene)

        //GENERATORS INIT
        this.endlessPlainGenerator = new EndlessPlainGenerator(this)
        this.allPlatgormTestGenerator = new AllPlatformTestGenerator(this)
        //

        this.eventHelper.timer(2000, this.processOutOfWorldMembers, this, undefined, true)
        this.eventHelper.timer(1000, this.startPlatformGenerationProcess, this, undefined, true)
        this.eventHelper.addListener(EVENTS.COIN_PICKED, this.removeCoinFromGroup, this)
    }
    ////////////////////////////
    //CORE LOGIC
    private generatePlatforms(): void {
        const maps = this.resolveGenerator().generate()
        const lastMemberX = this.activeGroupHelper.getLastMemberOfGroupByX()!.body!.position.x
        const translationResult = Array.isArray(maps) ?
            this.translateMaptypes(maps, lastMemberX + TILE.width) :
            this.translateMaptype(maps, lastMemberX + TILE.width)

        //ADD TO GROUPS
        this.activeGroup.addMultiple(translationResult.platforms, true)
        this.decorationGroup.addMultiple(translationResult.decorations, true)
        this.coinGroup.addMultiple(translationResult.coins, true)
        this.obstacleGroup.addMultiple(translationResult.obstacles, true)
    }
    private resolveGenerator() {
        switch (GAME_PARAMETERS.currentGenerator) {
            case "AllTest":
                return this.allPlatgormTestGenerator;
            case "Endless":
                return this.endlessPlainGenerator;
        }
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
        if (this.decorationGroup.getLength() > 0) {
            const decorations = this.decorationGroupHelper.findAllMembersByCondition(ch => ch.body!.position.x < -TILE.width)
            decorations.length > 0 && decorations.forEach(d => this.removeDecorationFromGroup(d))
        }
        if (this.obstacleGroup.getLength() > 0) {
            const obstacles = this.obstacleGroupHelper.findAllMembersByCondition(ch => ch.body!.position.x < -TILE.width)
            obstacles.length > 0 && obstacles.forEach(o => this.removeObstacleFromGroup(o))
        }
    }
    private startPlatformGenerationProcess(): void {
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
    private removeDecorationFromGroup(decoration: GameObjects.GameObject): void {
        this.decorationGroup.remove(decoration, true, true)
    }
    private removeObstacleFromGroup(obstacle: GameObjects.GameObject): void {
        this.obstacleGroup.remove(obstacle, true, true)
    }
    private hasToGenerateNewPlatforms(): boolean {
        const lastPlatform = this.activeGroupHelper.getLastMemberOfGroupByX()
        if (lastPlatform && lastPlatform.body?.position.x) {
            return lastPlatform.body.position.x <= POOL_CONFIG.criticalPackageWidth
        }
        return false
    }
}