export enum Colors {
    white = "white",
    black = "black"
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


export interface Move {
    piece: string,
    from: number,
    to: number
}

export const defualtMove: Move = {
    piece: "",
    from: -1,
    to: -1,
}

export interface piecePossibleToMove {
    rowNumber: number,
    columnNumber: number,
    moves: number[][]
}