export type SleeveT = {
    sleevekey: PropertyKey | null | undefined,
    label: string,
    url: string,
    position: { x: number, y: number },
    changePos: (newx: number, newy: number) => void
}
