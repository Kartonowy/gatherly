import { ref, type Ref } from "vue"

export class SleeveT {
    label: Ref<string>
    url: Ref<string>
    position: Position
    sleevekey?: PropertyKey | null | undefined
    changePos?: (newx: number, newy: number) => void
    changeItem: (label: string, url: string) => void

    constructor(_label: string, _url: string,  _sleevekey?: PropertyKey, _changePos?: (newx: number, newy: number) => void,) {
        this.label = ref(_label);
        this.url = ref(_url);
        this.position = { x: 0, y: 0 }
        this.changePos = _changePos
        this.sleevekey = _sleevekey
        if (!_sleevekey) {
            this.sleevekey = Math.round(Math.random() * Date.now()) / 1000000
            console.log(this.sleevekey)
        }
        this.changeItem = (newlabel: string, newurl: string) => {
            this.label.value = newlabel
            this.url.value = newurl
            return
        }

    }
}

export class EditWindow {
    context: SleeveT
    label: string
    url: string
    tag: string
    constructor(_context: SleeveT) {
        this.context = _context
        this.label = ""
        this.url = ""
        this.tag = ""
    }
}


export type Position = {
    x: number,
    y: number
}

export enum DialogKind {
    SleeveEdit,
    SleeveAdd,
    Settings,
    Placeholder, //TODO: Replace
    None
}

export enum Themes {
    Debug,
    Pinkish,
    Placeholder
}
