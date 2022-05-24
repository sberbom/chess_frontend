export enum Colors {
    white = "white",
    black = "black",
    red = "red"
}

export interface CastleInformation {
    wPl: boolean,
    wPr: boolean,
    wK: boolean,
    bPl: boolean,
    bPr: boolean,
    bK: boolean
}

export const defualtCastleInformation: CastleInformation = {
    wPl: true,
    wPr: true,
    wK: true,
    bPl: true,
    bPr: true,
    bK: true
}

export interface Tile {
    row: number,
    column: number
}

export interface Move {
    piece: String,
    fromTile: Tile
    toTile: Tile
    value?: number
}

export const noPreviousMove: Move = {
    piece: "",
    fromTile: {row: -1, column: -1},
    toTile: {row: -1, column: -1}
}
