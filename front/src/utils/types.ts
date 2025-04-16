export type SleeveT = {
    sleevekey: PropertyKey | null | undefined,
    label: string,
    url: string,
    position: Position,
    changePos: (newx: number, newy: number) => void
}

export type Position = {
    x: number,
    y: number
}
