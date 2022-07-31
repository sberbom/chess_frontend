import { Move, Tile } from "../types";

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

export const indexToTile = (index: number): Tile => {
    return {row: Math.floor(index/8), column: index%8}
}

export const tileToIndex = (row: number, column: number): number => {
    return row*8 + column
}

export const moveToMoveNotation = (move: Move): String => {
    let piece = move.piece.slice(1)
    if(piece === "P") {
        piece = ""
    }
    const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
    const column = columns[move.toTile.column]
    const row = (move.toTile.row + 1).toString()
    return piece+column+row
}
