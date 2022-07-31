import { CastleInformation, Move, Tile } from "../types"
import { isCheck } from "../utlis/chess_utils"
import { getRandomInt } from "../utlis/utils"
import { getPossilbeMoves } from "./common"
import { getGreedyComputerMove } from "./greedy"
import { getAvoidCheckRandomComputerMove, getRandomComputerMove } from "./random"


export const getRulyComputerMove = (boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move => {
    let possibleMoves = getPossilbeMoves(false, boardState, castleInformation, previousMove)
    let boardCopy = JSON.parse(JSON.stringify(boardState));
    let bestValue = 0
    let bestMove = possibleMoves[0] 
    let bestDistanceToCenter = getDistanceToCenter(bestMove)
    let bestDitstanceToCenterMove = bestMove
    for(let move of possibleMoves) {
        boardCopy[move.toTile.row][move.toTile.column] = boardCopy[move.fromTile.row][move.fromTile.row]
        boardCopy[move.fromTile.row][move.fromTile.column] = ""
        if(!isCheck(true, boardCopy, castleInformation, previousMove)){
            const greedyCoutnerMove = getGreedyComputerMove(true, boardCopy, castleInformation, move)
            const value = move.value! - greedyCoutnerMove.value!
            if(value > bestValue) {
                bestMove = move
                bestValue = value
            }

            const distanceToCenter = getDistanceToCenter(move)
            if(distanceToCenter < bestDistanceToCenter){
                bestDistanceToCenter = distanceToCenter
                bestDitstanceToCenterMove = move
            }
        }
    }
    return bestValue === 0 ? bestDitstanceToCenterMove : bestMove
}

const getDistanceToCenter = (move: Move): number => {
    return Math.abs(move.toTile.row - 4) + Math.abs(move.toTile.column - 4) * getRandomInt(1,5)
}


export const getAvoidCheckRulyComputerMove = (boardState: string[][], castleInformation: CastleInformation, previousMove: Move): Move | undefined => {
    try{
        let possibleMoves = getPossilbeMoves(false, boardState, castleInformation, previousMove)
        let boardCopy = JSON.parse(JSON.stringify(boardState));
        let bestValue = -1
        let bestMove = possibleMoves[0]
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
        return bestValue === -1 ? getAvoidCheckRandomComputerMove(boardState, castleInformation, previousMove) : bestMove
    }
    catch(error) {
        console.log(error)
    }
}
