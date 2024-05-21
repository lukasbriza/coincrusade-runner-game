import { GameObjects } from "phaser";

export class GroupHelper {
    private group: GameObjects.Group;

    constructor(group: GameObjects.Group) {
        this.group = group
    }

    public getLastMemberOfGroupByX(): GameObjects.GameObject | undefined {
        const activeGroupArray = this.group.children.getArray()
        if (activeGroupArray.length > 0) {
            let lastMember = activeGroupArray[0];
            activeGroupArray.forEach(member => {
                if (member.body?.position.x === undefined) {
                    console.error(`Member has undefined x`, member)
                }
                if (lastMember.body!.position.x < member.body!.position.x) {
                    lastMember = member
                }
            })
            return lastMember
        }
        return undefined
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