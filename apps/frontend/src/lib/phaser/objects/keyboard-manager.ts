import type { IScene } from '../types'

import type { IKeyboardManager } from './types'

export class KeyboardManager implements IKeyboardManager {
  public settingsButton: ISettingsButton

  constructor(scene: IScene) {
    this.settingsButton = scene.add.settingsButton(scene.renderer.width - 25, 20)
  }
}
