export class SleeveT {
    label: string
    url: string
    position: Position
    sleevekey?: PropertyKey | null | undefined
    changePos?: (newx: number, newy: number) => void
    changeItem: (label: string, url: string) => void
    // constructor(label: string, url: string) {
    //     this.label = label;
    //     this.url = url;
    //     this.position = { x: 0, y: 0 }
    // }

    constructor(label: string, url: string, changePos?: (newx: number, newy: number) => void, sleevekey?: PropertyKey) {
        this.label = label;
        this.url = url;
        this.position = { x: 0, y: 0 }
        this.changePos = changePos
        this.sleevekey = sleevekey
        this.changeItem = (_label: string, _url: string) => {
            this.label = _label;
            this.url = _url;
            return
        }

    }
}

export type Position = {
    x: number,
    y: number
}
