/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GameObjects } from 'phaser'

import { emitError } from '../utils'

import type { IGroupHelper } from './types'

export class GroupHelper implements IGroupHelper {
  public group: GameObjects.Group

  constructor(group: GameObjects.Group) {
    this.group = group
  }

  public getLastMemberOfGroupByX() {
    const activeGroupArray = this.group.children.getArray()
    let lastMember: GameObjects.GameObject | undefined

    if (activeGroupArray.length > 0) {
      lastMember = activeGroupArray[0]
      for (const member of activeGroupArray) {
        if (member.body?.position.x === undefined) {
          emitError(`Member has undefined x: ${String(member)}`)
          return lastMember
        }
        if (lastMember.body!.position.x < member.body.position.x) {
          lastMember = member
        }
      }
    }
    return lastMember
  }

  public findFirstMemberOfGroupByX(additionalCondition?: (children: GameObjects.GameObject) => boolean) {
    const group = this.group.children.getArray()
    const member = group.find((children) => {
      const pos = children.body?.position
      if (additionalCondition) {
        return pos!.x < 0 && additionalCondition(children)
      }
      return pos!.x < 0
    })
    return member
  }

  public findAllMembersByCondition(
    condition: (children: GameObjects.GameObject) => boolean,
    callbackOnSucess?: (children: GameObjects.GameObject) => void,
  ) {
    const group = this.group.children.getArray()
    const members = group.filter((children) => {
      const resolve = condition(children)
      if (resolve) {
        callbackOnSucess?.(children)
      }
      return resolve
    })
    return members
  }

  public getMemberByName<T extends GameObjects.GameObject>(name: string) {
    const group = this.group.children.getArray()
    return group.find((children) => children.name === name) as T | undefined
  }
}
