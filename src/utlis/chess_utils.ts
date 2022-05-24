import { CastleInformation, Move, Tile } from "../types";

export const getAllowedMoves = (row: number, column: number, boardState: string[][], castleInformation: CastleInformation, isCheckCheck: boolean, previousMove: Move): Tile[] => {
    const allowedMoves: Tile[] = []
    if(row !== -1 && column !== -1) {
        //White pawn
        if(boardState[row][column] === "wP") {
            if(row+1 < 8 && boardState[row+1][column] === ""){
                allowedMoves.push({row: row+1, column: column});
            }
            if(row === 1 && boardState[row+1][column] === "" && boardState[row+2][column] === ""){
                allowedMoves.push({row: row+2, column: column})
            }
            if(row+1 < 8 && column+1 < 8 && boardState[row+1][column+1][0] === "b") {
                allowedMoves.push({row: row+1, column: column+1});
            }
            if(row+1 < 8 && column-1 >= 0 && boardState[row+1][column-1][0] === "b") {
                allowedMoves.push({row: row+1, column: column-1});
            }
            if(previousMove.piece === "bP" && previousMove.fromTile.row === 7 && previousMove.toTile.row === 5) {
                if(column+1 === previousMove.toTile.column) {
                    allowedMoves.push({row: row+1, column: column+1});
                }
                if(column-1 === previousMove.toTile.column) {
                    allowedMoves.push({row: row+1, column: column-1});
                }
            }
        }

        //Black pawn
        if(boardState[row][column] === "bP") {
            if(row-1 >= 0 && boardState[row-1][column] === ""){
                allowedMoves.push({row: row-1, column: column})
            }
            if(row === 6 && boardState[row-1][column] === "" && boardState[row-2][column] === ""){
                allowedMoves.push({row: row-2, column: column})
            }
            if(row-1 >= 0 && column+1 < 8 && boardState[row-1][column+1][0] === "w") {
                allowedMoves.push({row: row-1, column: column+1});
            }
            if(row-1 >= 0 && column-1 >= 0 && boardState[row-1][column-1][0] === "w") {
                allowedMoves.push({row: row-1, column: column-1});
            }
            if(previousMove.piece === "wP" && previousMove.fromTile.row === 2 && previousMove.toTile.row === 4) {
                if(column+1 === previousMove.toTile.column) {
                    allowedMoves.push({row: row-1, column: column+1});
                }
                if(column-1 === previousMove.toTile.column) {
                    allowedMoves.push({row: row-1, column: column-1});
                }
            }
        }

        //Knight
        //console.log("Knight")
        if(boardState[row][column] === "wKn" || boardState[row][column] === "bKn") {
            if (row+2 < 8 && column+1 < 8 && boardState[row+2][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row+2, column: column+1})
            }
            if (row+2 < 8 && column-1 >= 0 && boardState[row+2][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row+2, column: column-1})
            }
            if (row+1 < 8 && column+2 < 8 && boardState[row+1][column+2][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row+1, column: column+2})
            }
            if (row+1 < 8 && column-2 >= 0 && boardState[row+1][column-2][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row+1, column: column-2})
            }
            if (row-2 >= 0 && column-1 >= 0 && boardState[row-2][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row-2, column: column-1})
            }
            if (row-2 >= 0 && column+1 < 8 && boardState[row-2][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row-2, column: column+1})
            }
            if (row-1 > 0 && column-2 >= 0 && boardState[row-1][column-2][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row-1, column: column-2})
            }
            if (row-1 >= 0 && column+2 < 8 && boardState[row-1][column+2][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row-1, column: column+2})
            }
        }

        //Bishop and Queenc
        //console.log("Bi and Q")
        if(["wB", "bB", "wQ", "bQ"].includes(boardState[row][column])) {
            let counter = 1
            while(row+counter < 8 && column+counter < 8){
                if(boardState[row+counter][column+counter][0] !== boardState[row][column][0]){
                    allowedMoves.push({row: row+counter, column: column+counter})
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
                    allowedMoves.push({row: row-counter, column: column-counter})
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
                    allowedMoves.push({row: row+counter, column: column-counter})
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
                    allowedMoves.push({row: row-counter, column: column+counter})
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
                    allowedMoves.push({row: row+counter, column: column})
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
                    allowedMoves.push({row: row, column: column+counter})
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
                    allowedMoves.push({row: row-counter, column: column})
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
                    allowedMoves.push({row: row, column: column-counter})
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
                allowedMoves.push({row: row+1, column: column+1})
            }
            if (row-1 >= 0 && column-1 >= 0 && boardState[row-1][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row-1, column: column-1})
            }
            if (row+1 < 8 && column-1 >= 0 && boardState[row+1][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row+1, column: column-1})
            }
            if (row-1 >= 0 && column+1 < 8 && boardState[row-1][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row-1, column: column+1})
            }
            if (row+1 < 8 && boardState[row+1][column][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row+1, column: column})
            }
            if (row-1 >= 0 && boardState[row-1][column][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row-1, column: column})
            }
            if (column-1 >= 0 && boardState[row][column-1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row, column: column-1})
            }
            if (column+1 < 8 && boardState[row][column+1][0] !== boardState[row][column][0]) {
                allowedMoves.push({row: row, column: column+1})
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
                        allowedMoves.push({row: 0, column: 1})
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
                        allowedMoves.push({row: 0, column: 6})
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
                        allowedMoves.push({row: 7, column: 1})
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
                        allowedMoves.push({row: 7, column: 6})
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
                const isKingAttackMove = possilbeMoves.some(tile => boardState[tile.row][tile.column] === "wK")
                if(isKingAttackMove) {return true;}
            }
            else if(!whiteMove && boardState[rowNumber][columnNumber][0] === "w"){
                const possilbeMoves = getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                const isKingAttackMove = possilbeMoves.some(tile => boardState[tile.row][tile.column] === "bK")
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
                const allowedMoves =  getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                for(const move of allowedMoves) {
                    const updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[rowNumber][columnNumber] = ""
                    updatedBoard[move.row][move.column] = boardState[rowNumber][columnNumber]
                    if(!isCheck(!whiteMove, updatedBoard, castleInformation, previousMove)) {
                        return false;
                    }
                }
            }
            else if(!whiteMove && boardState[rowNumber][columnNumber][0] === "w"){
                const allowedMoves =  getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                for(const move of allowedMoves) {
                    const updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[rowNumber][columnNumber] = ""
                    updatedBoard[move.row][move.column] = boardState[rowNumber][columnNumber]
                    if(!isCheck(!whiteMove, updatedBoard, castleInformation, previousMove)) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

export const isCheckMate = (whiteMove: boolean, boardState: string[][], castleInformation: CastleInformation, previousMove: Move): boolean => {
    return isCheck(whiteMove,boardState, castleInformation, previousMove) && isStaleMate(!whiteMove, boardState, castleInformation, previousMove)
}


export const getPieceValue = (piece: string): number => {
    switch(piece[1]){
        case "P":
            return 1
        case "B":
            return 3
        case "K":
            return 3
        case "R":
            return 5
        case "Q":
            return 9
        default: 
            return 0
    }
}