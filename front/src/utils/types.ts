export type SleeveT = {
    label: string,
    url: string,
    position: { x: number, y: number },
    changePos: (newx: number, newy: number) => void
}
