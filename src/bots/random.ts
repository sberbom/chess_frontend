import { CastleInformation, Move} from "../types"
import { isCheck } from "../utlis/chess_utils"
import { getRandomInt } from "../utlis/utils"
import { getPossilbeComputerMoves } from "./common"

export const getRandomComputerMove = (boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move => {
        let possibleMoves = getPossilbeComputerMoves(boardState, castleInformation, previousMove)
        return possibleMoves[getRandomInt(0, possibleMoves.length-1)]
    }

export const getAvoidCheckRandomComputerMove = (boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move | undefined => {
        try{
            let possibleMoves = getPossilbeComputerMoves(boardState, castleInformation, previousMove)
            let boardCopy = JSON.parse(JSON.stringify(boardState));
            for(let move of possibleMoves){
                boardCopy[move.toTile.row][move.toTile.column] = boardCopy[move.fromTile.row][move.fromTile.row]
                boardCopy[move.fromTile.row][move.fromTile.column] = ""
                if(!isCheck(false, boardCopy, castleInformation, previousMove)) {
                    return move
                }
            }
        }
        catch(error) {
            console.log(error)
        }
    }