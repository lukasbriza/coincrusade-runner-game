import { Events, Scene, Time } from "phaser";
import { EVENTS } from "../constants";
import { IEventHelper } from "../interfaces/_index";

export class Eventhelper implements IEventHelper {
    public scene: Scene;
    constructor(scene: Scene) {
        this.scene = scene
    }

    public dispatch(key: EVENTS, ...args: unknown[]): void {
        this.scene.events.emit(key, ...args)
    }
    public addListener(key: EVENTS, cb: Function, context?: unknown): Events.EventEmitter {
        return this.scene.events.addListener(key, cb, context)
    }
    public timer(delay: number, cb: () => void, scope: unknown, repeat?: number, loop: boolean = false): Time.TimerEvent {
        return this.scene.time.addEvent({ delay, callback: cb, loop: loop, callbackScope: scope, repeat })
    }
    public removeTimer(timer: Time.TimerEvent): void {
        this.scene.time.removeEvent(timer)
    }

}