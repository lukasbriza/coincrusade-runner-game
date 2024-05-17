import { GameObjects } from "phaser";

export class GroupHelper {
    private group: GameObjects.Group;

    constructor(group: GameObjects.Group) {
        this.group = group
    }

    public getLastMemberOfGroupByX(): GameObjects.GameObject | undefined {
        const activeGroupArray = this.group.children.getArray()
        if (activeGroupArray.length > 0) {
            return activeGroupArray.reduce((prev, curr) => {
                if (curr.body!.position.x > prev.body!.position.x) {
                    return curr
                }
                return prev
            })
        }
    }
    public findFirstMemberOfGroupByX(additionalCondition?: (children: GameObjects.GameObject) => boolean) {
        return this.group.children.getArray().find(children => {
            const pos = children.body?.position;
            if (additionalCondition) {
                return pos!.x < 0 && additionalCondition(children)
            }
            return pos!.x < 0
        })
    }
    public findAllMembersByCondition(condition: (children: GameObjects.GameObject) => boolean): GameObjects.GameObject[] {
        return this.group.children.getArray().filter(children => condition(children))
    }
    public getMemberByName<T extends GameObjects.GameObject>(name: string): T | undefined {
        return this.group.children.getArray().find(children => children.name === name) as T | undefined
    }
}