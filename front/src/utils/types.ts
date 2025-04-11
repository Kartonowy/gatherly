export type SleeveT = {
    sleevekey: PropertyKey,
    label: string,
    url: string,
    position: { x: number, y: number },
    changePos: (newx: number, newy: number) => void
}
