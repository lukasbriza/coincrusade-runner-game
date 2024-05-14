import { GameObjects } from "phaser";
import { GameScene } from "../scenes/_index"
import { PlatformDatabase } from "./PlatformDatabase"
import { POOL_CONFIG } from "../constants";

export class PlatformManager extends PlatformDatabase {
    public activeGroup: GameObjects.Group;
    private removingId?: string;

    constructor(scene: GameScene) {
        super(scene)
        this.activeGroup = this.scene.add.group({ removeCallback: this.onRemoveActiveGroupMember })
        this.activeGroup.addMultiple(this.generateInitialChunk(), true)
    }
    //CORE LOGIC
    private generatePlatforms() {

    }
    //ABL METHODS
    private processPlatformsOutOfWorld(): void {
        if (this.activeGroup.getLength() > 0) {
            const platform = this.findFirstPlatformOutOfWorld()
            if (platform) {
                this.removePlatformFromGroup(platform)
            }
        }
    }
    private onRemoveActiveGroupMember(): void {
        if (this.hasToGenerateNewPlatforms()) {
            this.generatePlatforms()
        }
    }

    //UTILITY METHODS
    private removePlatformFromGroup(platform: GameObjects.GameObject): void {
        this.removingId = platform.name
        this.activeGroup.remove(platform)
    }
    private getLastPlatformOfGroup(): GameObjects.GameObject | undefined {
        const activeGroupArray = this.activeGroup.children.getArray()
        if (activeGroupArray.length > 0) {
            return activeGroupArray.reduce((prev, curr) => {
                if (curr.body!.position.x > prev.body!.position.x) {
                    return curr
                }
                return prev
            })
        }
    }
    private findFirstPlatformOutOfWorld(): GameObjects.GameObject | undefined {
        return this.activeGroup.children.getArray().find(children => {
            const pos = children.body?.position;
            return pos!.x < 0 && children.name !== this.removingId
        })
    }
    private hasToGenerateNewPlatforms(): boolean {
        const lastPlatform = this.getLastPlatformOfGroup()
        if (lastPlatform && lastPlatform.body?.position.x) {
            return lastPlatform.body.position.x <= POOL_CONFIG.criticalPackageWidth
        }
        return true
    }


    //UPDATE LOOP
    public update() {
        this.processPlatformsOutOfWorld()
    }
}

//mít k dispozici všechny platformy
//moci vybírat z platforem