import { CastleInformation, Move } from "../types";

export const getAllowedMoves = (row: number, column: number, boardState: string[][], castleInformation: CastleInformation, isCheckCheck: boolean, previousMove: Move): number[][] => {
    const allowedMoves = []
    if(row !== -1 && column !== -1) {
        //White pawn
        if(boardState[row][column] === "wP") {
            if(row+1 < 8 && boardState[row+1][column] === ""){
                allowedMoves.push([row+1, column]);
            }
            if(row === 1 && boardState[row+1][column] === "" && boardState[row+2][column] === ""){
                allowedMoves.push([row+2, column])
            }
            if(row+1 < 8 && column+1 < 8 && boardState[row+1][column+1][0] === "b") {
                allowedMoves.push([row+1, column+1]);
            }
            if(row+1 < 8 && column-1 >= 0 && boardState[row+1][column-1][0] === "b") {
                allowedMoves.push([row+1, column-1]);
            }
            if(previousMove.piece === "bP" && Math.floor(previousMove.from/8) === 6 && Math.floor(previousMove.to/8) === 4 && Math.floor(previousMove.to/8) === row) {
                if(column+1 === Number(previousMove.to)%8) {
                    allowedMoves.push([row+1, column+1]);
                }
                if(column-1 === Number(previousMove.to)%8) {
                    allowedMoves.push([row+1, column-1]);
                }
            }
        }

        //Black pawn
        if(boardState[row][column] === "bP") {
            if(row-1 >= 0 && boardState[row-1][column] === ""){
                allowedMoves.push([row-1, column])
            }
            if(row === 6 && boardState[row-1][column] === "" && boardState[row-2][column] === ""){
                allowedMoves.push([row-2, column])
            }
            if(row-1 >= 0 && column+1 < 8 && boardState[row-1][column+1][0] === "w") {
                allowedMoves.push([row-1, column+1]);
            }
            if(row-1 >= 0 && column-1 >= 0 && boardState[row-1][column-1][0] === "w") {
                allowedMoves.push([row-1, column-1]);
            }
            if(previousMove.piece === "wP" && Math.floor(previousMove.from/8) === 1 && Math.floor(previousMove.to/8) === 3 && Math.floor(previousMove.to/8) === row) {
                if(column+1 === Number(previousMove.to)%8) {
                    allowedMoves.push([row-1, column+1]);
                }
                if(column-1 === Number(previousMove.to)%8) {
                    allowedMoves.push([row-1, column-1]);
                }
            }
        }

        //Knight
        //console.log("Knight")
        if(boardState[row][column] === "wKn" || boardState[row][column] === "bKn") {
            if (row+2 < 8 && column+1 < 8 && boardState[row+2][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row+2, column+1])
            }
            if (row+2 < 8 && column-1 >= 0 && boardState[row+2][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row+2, column-1])
            }
            if (row+1 < 8 && column+2 < 8 && boardState[row+1][column+2][0] !== boardState[row][column][0]) {
                allowedMoves.push([row+1, column+2])
            }
            if (row+1 < 8 && column-2 >= 0 && boardState[row+1][column-2][0] !== boardState[row][column][0]) {
                allowedMoves.push([row+1, column-2])
            }
            if (row-2 >= 0 && column-1 >= 0 && boardState[row-2][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row-2, column-1])
            }
            if (row-2 >= 0 && column+1 < 8 && boardState[row-2][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row-2, column+1])
            }
            if (row-1 > 0 && column-2 >= 0 && boardState[row-1][column-2][0] !== boardState[row][column][0]) {
                allowedMoves.push([row-1, column-2])
            }
            if (row-1 >= 0 && column+2 < 8 && boardState[row-1][column+2][0] !== boardState[row][column][0]) {
                allowedMoves.push([row-1, column+2])
            }
        }

        //Bishop and Queenc
        //console.log("Bi and Q")
        if(["wB", "bB", "wQ", "bQ"].includes(boardState[row][column])) {
            let counter = 1
            while(row+counter < 8 && column+counter < 8){
                if(boardState[row+counter][column+counter][0] !== boardState[row][column][0]){
                    allowedMoves.push([row+counter, column+counter])
                    if(boardState[row+counter][column+counter][0] === "w" || 
                        boardState[row+counter][column+counter][0] === "b"){
                        break;
                    }
                }
                if(boardState[row+counter][column+counter][0] === boardState[row][column][0]){
                    break;
                }
                counter++;
            }
            counter = 1
            while(row-counter >= 0 && column-counter >= 0){
                if(boardState[row-counter][column-counter][0] !== boardState[row][column][0]){
                    allowedMoves.push([row-counter, column-counter])
                    if(boardState[row-counter][column-counter][0] === "w" || 
                        boardState[row-counter][column-counter][0] === "b"){
                        break;
                    }
                }
                if(boardState[row-counter][column-counter][0] === boardState[row][column][0]){
                    break;
                }
                counter++;
            }
            counter = 1
            while(row+counter < 8 && column-counter >= 0){
                if(boardState[row+counter][column-counter][0] !== boardState[row][column][0]){
                    allowedMoves.push([row+counter, column-counter])
                    if(boardState[row+counter][column-counter][0] === "w" || 
                        boardState[row+counter][column-counter][0] === "b"){
                        break;
                    }
                }
                if(boardState[row+counter][column-counter][0] === boardState[row][column][0]){
                    break;
                }
               
                counter++;
            }
            counter = 1
            while(row-counter >= 0 && column+counter <8){
                if(boardState[row-counter][column+counter][0] !== boardState[row][column][0]){
                    allowedMoves.push([row-counter, column+counter])
                    if(boardState[row-counter][column+counter][0] === "w" || 
                        boardState[row-counter][column+counter][0] === "b" ){
                        break;
                    }
                }
                if(boardState[row-counter][column+counter][0] === boardState[row][column][0]){
                    break;
                }
                counter++;
            }
        }

        //Rook and Queen
        //console.log("R and Q")
        if(["wR", "bR", "wQ", "bQ"].includes(boardState[row][column])) {
            let counter = 1
            while(row+counter < 8){
                if(boardState[row+counter][column][0] !== boardState[row][column][0]){
                    allowedMoves.push([row+counter, column])
                    if(boardState[row+counter][column][0] === "w" || 
                        boardState[row+counter][column][0] === "b"){
                        break;
                    }
                }
                if(boardState[row+counter][column][0] === boardState[row][column][0]) {
                    break;
                }
                counter++;
            }
            counter = 1
            while(column+counter < 8){
                if(boardState[row][column+counter][0] !== boardState[row][column][0]){
                    allowedMoves.push([row, column+counter])
                    if(boardState[row][column+counter][0] === "w" || 
                        boardState[row][column+counter][0] === "b"){
                        break;
                    }
                }
                if(boardState[row][column+counter][0] === boardState[row][column][0]) {
                    break;
                }
                counter++;
            }
            counter = 1
            while(row-counter >= 0){
                if(boardState[row-counter][column][0] !== boardState[row][column][0]){
                    allowedMoves.push([row-counter, column])
                    if(boardState[row-counter][column][0] === "w" || 
                        boardState[row-counter][column][0] === "b"){
                        break;
                    }
                }
                if(boardState[row-counter][column][0] === boardState[row][column][0]){
                    break;
                }
                counter++;
            }
            counter = 1
            while(column-counter >= 0){
                if(boardState[row][column-counter][0] !== boardState[row][column][0]){
                    allowedMoves.push([row, column-counter])
                    if(boardState[row][column-counter][0] === "w" || 
                        boardState[row][column-counter][0] === "b"){
                        break;
                    }
                }     
                if(boardState[row][column-counter][0] === boardState[row][column][0]){
                    break;
                }               
                counter++;
            }
        }

        //King
        //console.log("King")
        if(boardState[row][column] === "wK" || boardState[row][column] === "bK") {
            if (row+1 < 8 && column+1 < 8 && boardState[row+1][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row+1, column+1])
            }
            if (row-1 >= 0 && column-1 >= 0 && boardState[row-1][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row-1, column-1])
            }
            if (row+1 < 8 && column-1 >= 0 && boardState[row+1][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row+1, column-1])
            }
            if (row-1 >= 0 && column+1 < 8 && boardState[row-1][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row-1, column+1])
            }
            if (row+1 < 8 && boardState[row+1][column][0] !== boardState[row][column][0]) {
                allowedMoves.push([row+1, column])
            }
            if (row-1 >= 0 && boardState[row-1][column][0] !== boardState[row][column][0]) {
                allowedMoves.push([row-1, column])
            }
            if (column-1 >= 0 && boardState[row][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row, column-1])
            }
            if (column+1 < 8 && boardState[row][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push([row, column+1])
            }
        }

        //Castle
        if(!isCheckCheck){
            if(boardState[row][column] === "wK" && castleInformation.wK) {
                if(castleInformation.wPl && boardState[0][3] === "" && boardState[0][2] === "" && boardState[0][1] === ""){
                    let updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[row][column] = ""
                    updatedBoard[0][3]="wK"
                    const isSqureOneFree = !isCheck(true, boardState, castleInformation, previousMove);
                    updatedBoard[0][3]=""
                    updatedBoard[0][2]="wK"
                    const isSqureTwoFree = !isCheck(true, boardState, castleInformation, previousMove);
                    updatedBoard[0][2]=""
                    updatedBoard[0][1]="wK"
                    const isSqureThreeFree = !isCheck(true, boardState, castleInformation, previousMove);
                    if(isSqureOneFree && isSqureTwoFree && isSqureThreeFree) {
                        allowedMoves.push([0, 1])
                    }
                }
                if(castleInformation.wPr && boardState[0][5] === "" && boardState[0][6] === "" ){
                    let updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[row][column] = ""
                    updatedBoard[0][5]="wK"
                    const isSqureOneFree = !isCheck(true, boardState, castleInformation, previousMove);
                    updatedBoard[0][5]=""
                    updatedBoard[0][6]="wK"
                    const isSqureTwoFree = !isCheck(true, boardState, castleInformation, previousMove);
                    if(isSqureOneFree && isSqureTwoFree) {
                        allowedMoves.push([0, 6])
                    }
                }
            }
            if(boardState[row][column] === "bK" && castleInformation.bK) {
                if(castleInformation.bPl && boardState[7][3] === "" && boardState[7][2] === "" && boardState[7][1] === ""){
                    let updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[row][column] = ""
                    updatedBoard[7][3]="bK"
                    const isSqureOneFree = !isCheck(false, boardState, castleInformation, previousMove);
                    updatedBoard[7][3]=""
                    updatedBoard[7][2]="bK"
                    const isSqureTwoFree = !isCheck(false, boardState, castleInformation, previousMove);
                    updatedBoard[7][2]=""
                    updatedBoard[7][1]="bK"
                    const isSqureThreeFree = !isCheck(false, boardState, castleInformation, previousMove);
                    if(isSqureOneFree && isSqureTwoFree && isSqureThreeFree) {
                        allowedMoves.push([7, 1])
                    }
                }
                if(castleInformation.wPr && boardState[7][5] === "" && boardState[7][6] === "" ){
                    let updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[row][column] = ""
                    updatedBoard[7][5]="bK"
                    const isSqureOneFree = !isCheck(false, boardState, castleInformation, previousMove);
                    updatedBoard[7][5]=""
                    updatedBoard[7][6]="bK"
                    const isSqureTwoFree = !isCheck(false, boardState, castleInformation, previousMove);
                    if(isSqureOneFree && isSqureTwoFree) {
                        allowedMoves.push([7, 6])
                    }
                }
            }
        }

    }
    return allowedMoves
}

export const isCheck = (whiteMove: boolean, boardState: string[][], castleInformation: CastleInformation, previousMove: Move): boolean => {
    for(let rowNumber=0; rowNumber<8; rowNumber++) {
        for(let columnNumber=0; columnNumber<8; columnNumber++){
            if(whiteMove && boardState[rowNumber][columnNumber][0] === "b"){
                const possilbeMoves = getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                const isKingAttackMove = possilbeMoves.some(move => boardState[move[0]][move[1]] === "wK")
                if(isKingAttackMove) {return true;}
            }
            else if(!whiteMove && boardState[rowNumber][columnNumber][0] === "w"){
                const possilbeMoves = getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                const isKingAttackMove = possilbeMoves.some(move => boardState[move[0]][move[1]] === "bK")
                if(isKingAttackMove) {return true;}
            }
        }
    }
    return false
}

export const isStaleMate = (whiteMove: boolean, boardState: string[][], castleInformation: CastleInformation, previousMove: Move): boolean => {
    for(let rowNumber=0; rowNumber<8; rowNumber++) {
        for(let columnNumber=0; columnNumber<8; columnNumber++){
            if(whiteMove && boardState[rowNumber][columnNumber][0] === "b"){
                if(getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove).length !== 0) {
                    return false
                }
            }
            else if(!whiteMove && boardState[rowNumber][columnNumber][0] === "w"){
                if(getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove).length !== 0) {
                    return false
                }
            }
        }
    }
    return true;
}