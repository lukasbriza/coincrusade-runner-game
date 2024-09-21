import { GameObjects, Scene } from "phaser";
import { AssetHelper, Eventhelper } from "../../helpers/_index";
import { EVENTS, FONT_KEYS } from "../../constants";

export class Note {
  public note?: GameObjects.BitmapText;
  private assetHelper: AssetHelper;
  private eventHelper: Eventhelper;
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene
    this.assetHelper = new AssetHelper(scene)
    this.eventHelper = new Eventhelper(scene)
  }

  public showNote(text: string, x: number | "center", y: number | "center") {
    this.note = this.assetHelper.addText(FONT_KEYS.MAIN, 0, 0, text)
    this.note.setScale(2, 2)
    this.note.setOrigin(0.5, 0)
    const textX = typeof x === "string" ? this.scene.renderer.width / 2 : x
    const textY = typeof y === "string" ? (this.scene.renderer.height / 2) - (this.note.height / 2) : y
    this.note.setPosition(textX, textY)
  }

  public destroyAfter(time: number) {
    this.eventHelper.timer(time, () => {
      this.note?.destroy(true)
      this.note = undefined
      this.eventHelper.dispatch(EVENTS.DESTROY_NOTE)
    }, this, undefined, false)
  }
}
