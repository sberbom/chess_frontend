import { CastleInformation, Move } from "../types"
import { isCheck } from "../utlis/chess_utils"
import { getPossilbeMoves } from "./common"
import { getAvoidCheckRandomComputerMove, getRandomComputerMove } from "./random"


export const getGreedyComputerMove = (white: boolean, boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move => {
        let possibleMoves = getPossilbeMoves(white, boardState, castleInformation, previousMove)
        let bestValue = -1
        let bestMove = getRandomComputerMove(boardState, castleInformation, previousMove)
        for(let move of possibleMoves) {
            let boardCopy = JSON.parse(JSON.stringify(boardState));
            boardCopy[move.toTile.row][move.toTile.column] = boardCopy[move.fromTile.row][move.fromTile.row]
            boardCopy[move.fromTile.row][move.fromTile.column] = ""
            if(!isCheck(false, boardCopy, castleInformation, previousMove)){
                if(move.value && move.value > bestValue) {
                    bestMove = move
                    bestValue = move.value
                }
            }
        }
        return bestMove
    }

export const getAvoidCheckGreedyComputerMove = (boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move | undefined => {
        try{
            let possibleMoves = getPossilbeMoves(false, boardState, castleInformation, previousMove)
            let bestValue = -1
            let bestMove = getAvoidCheckRandomComputerMove(boardState, castleInformation, previousMove)
            for(let move of possibleMoves){
                let boardCopy = JSON.parse(JSON.stringify(boardState));
                boardCopy[move.toTile.row][move.toTile.column] = boardCopy[move.fromTile.row][move.fromTile.row]
                boardCopy[move.fromTile.row][move.fromTile.column] = ""
                if(!isCheck(false, boardCopy, castleInformation, previousMove)) {
                    if(move.value && move.value > bestValue) {
                        bestMove = move
                        bestValue = move.value
                    }
                }
            }
            return bestMove
        }
        catch(error) {
            console.log(error)
        }
    }
