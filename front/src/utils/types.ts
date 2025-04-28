import { nextTick, ref, VueElement, type Ref } from "vue"

export class SleeveT {
    label: Ref<string>
    url: Ref<string>
    position: Position
    sleevekey?: PropertyKey | null | undefined
    changePos?: (newx: number, newy: number) => void
    changeItem: (label: string, url: string) => void
    // constructor(label: string, url: string) {
    //     this.label = label;
    //     this.url = url;
    //     this.position = { x: 0, y: 0 }
    // }

    constructor(label: string, url: string,  sleevekey?: PropertyKey, changePos?: (newx: number, newy: number) => void,) {
        this.label = ref(label);
        this.url = ref(url);
        this.position = { x: 0, y: 0 }
        this.changePos = changePos
        this.sleevekey = sleevekey
        if (!sleevekey) {
            this.sleevekey = Math.round(Math.random() * Date.now()) / 1000000
            console.log(this.sleevekey)
        }
        this.changeItem = (_label: string, _url: string) => {
            this.label.value = _label
            this.url.value = _url
            return
        }

    }
}

export type Position = {
    x: number,
    y: number
}
