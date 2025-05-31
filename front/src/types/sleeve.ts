import { ref, type Ref } from "vue"
import type { Position } from "./types"

export class SleeveT {
    label: Ref<string>
    url: Ref<string>
    position: Position
    sleevekey: PropertyKey
    summary: Ref<string>
    tags: string[]
    changePos?: (newx: number, newy: number) => void
    changeItem: (label: string, url: string) => void
    private _onMount: (() => void)[]
    addHook: (fn: () => void) => void
    invoke: () => void

    constructor(_label: string, _url: string,  _sleevekey?: PropertyKey, _changePos?: (newx: number, newy: number) => void) {
        this.label = ref(_label);
        this.url = ref(_url);
        this.summary = ref("")
        this.position = { x: 0, y: 0 }
        this.changePos = _changePos
        this._onMount = []
        this.tags = []

        if (!_sleevekey) {
            this.sleevekey = Math.round(Math.random() * Date.now()) / 1000000
        } else {
            this.sleevekey = _sleevekey
        }
        this.changeItem = (newlabel: string, newurl: string) => {
            this.label.value = newlabel
            this.url.value = newurl
            return
        }
        this.addHook = (fn: () => void) => {
            this._onMount.push(fn)
        }

        this.invoke = () => {
            this._onMount.forEach((fn) => fn())
        }

    }


}

