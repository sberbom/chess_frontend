import { CastleInformation, Move } from "../types"
import { isCheck } from "../utlis/chess_utils"
import { getPossilbeComputerMoves } from "./common"
import { getAvoidCheckRandomComputerMove, getRandomComputerMove } from "./random"


export const getGreedyComputerMove = (boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move => {
        let possibleMoves = getPossilbeComputerMoves(boardState, castleInformation, previousMove)
        let bestValue = -1
        let bestMove = getRandomComputerMove(boardState, castleInformation, previousMove)
        for(let move of possibleMoves) {
            if(move.value && move.value > bestValue) {
                bestMove = move
                bestValue = move.value
            }
        }
        return bestMove
    }

export const getAvoidCheckGreedyComputerMove = (boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move | undefined => {
        try{
            let possibleMoves = getPossilbeComputerMoves(boardState, castleInformation, previousMove)
            let boardCopy = JSON.parse(JSON.stringify(boardState));
            let bestValue = -1
            let bestMove = getAvoidCheckRandomComputerMove(boardState, castleInformation, previousMove)
            for(let move of possibleMoves){
                boardCopy[move.toTile.row][move.toTile.column] = boardCopy[move.fromTile.row][move.fromTile.row]
                boardCopy[move.fromTile.row][move.fromTile.column] = ""
                if(!isCheck(false, boardCopy, castleInformation, previousMove)) {
                    if(move.value && move.value > bestValue) {
                        bestMove = move
                        bestValue = move.value
                    }
                }
            }
            if(bestValue !== -1) {
                return bestMove
            }
        }
        catch(error) {
            console.log(error)
        }
    }
