import { CastleInformation, Move} from "../types"
import { getAllowedMoves, getPieceValue } from "../utlis/chess_utils"

export const getPossilbeComputerMoves = (boardState: string[][],  castleInformation: CastleInformation, previousMove: Move): Move[] => {
        let possibleMoves: Move[] = []
            for(let rowNumber = 0; rowNumber < 8; rowNumber++) {
                for(let columnNumber = 0; columnNumber < 8; columnNumber++) {
                    if(boardState[rowNumber][columnNumber][0] === "b") {
                        const allowedMoves = getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                        for (let move of allowedMoves) {
                            const possibleMove: Move = {
                                piece: boardState[rowNumber][columnNumber],
                                fromTile: {row: rowNumber, column: columnNumber},
                                toTile: move,
                                value: getPieceValue(boardState[move.row][move.column])
                            }
                            possibleMoves.push(possibleMove)
                        }
                    }
                }
            }
        return possibleMoves 
    }