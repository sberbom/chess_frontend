import { Colors, defualtCastleInformation, defualtMove, piecePossibleToMove} from "../types"
import Tile from "./tile"
import "../styles/board.css"
import { useEffect, useState } from "react"
import { getAllowedMoves, isCheck, isCheckMate, isStaleMate } from "../utlis/chess_utils"
import PieceSelector from "./piece_selector"
import Captures from "./captures"
import { getRandomInt } from "../utlis/utils"


//v3
//Checkmate bug
//Fix stalemate bug

//v4
//Bot v2 greedy
//Score




const Board = () => {

    const newBoard = [
                    ["wR", "wKn", "wB", "wQ", "wK", "wB", "wKn", "wR"],
                    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"], 
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
                    ["bR", "bKn", "bB", "bQ", "bK", "bB", "bKn", "bR"]
                    ]


    const [boardState, setBoardState] = useState(newBoard)
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedColumn, setSelectedColumn] = useState(-1);
    const [whiteMove, setWhiteMove] = useState(true);
    const [isPawnPromotion, setIsPawnPromotion] = useState(false);
    const [pawnToPromote, setPwanToPromote] = useState(-1)
    const [castleInformation, setCastleInformation] = useState(defualtCastleInformation)
    const [previousMove, setPreviousMove] = useState(defualtMove)
    const [blackCaptures, setBlackCaptures] = useState<string[]>([])
    const [whiteCaptures, setWhiteCaptures] = useState<string[]>([])
    const [infoText, setInfoText] = useState("")
    const [isTwoPlayer, setIsTwoPlayer] = useState(false)
    const [isEndGame, setIsEndGame] = useState(false)

    const getSelectedTiles = () => {
        let selectedTiles = []
        if(selectedRow !== -1 && selectedColumn !== -1) {
            selectedTiles.push(8*selectedRow+selectedColumn)
            getAllowedMoves(selectedRow, selectedColumn, boardState, castleInformation, false, previousMove).forEach(move => {
                selectedTiles.push(8*move[0]+move[1])
            });
        }
        return selectedTiles
    }

    let nextColorWhite = true
    let tiles = boardState.flat().map((piece, index) => {
        if(nextColorWhite) {
            if((index+1)%8 !== 0){
                nextColorWhite = !nextColorWhite
            }
            return(<Tile color={Colors.white} piece={piece} movePiece={() => movePiece(index)} selected={getSelectedTiles().includes(index)} key={index}/>)
        }
        else{
            if((index+1)%8 !== 0){
                nextColorWhite = !nextColorWhite
            }
            return(<Tile color={Colors.black} piece={piece} movePiece={() => movePiece(index)} selected={getSelectedTiles().includes(index)} key={index}/>)
        }
    })

    const movePiece = (index: number, isComputerMove?: Boolean, selectedRowNumber?: number, selectedColumnNumber?: number) => {
        try{
            if(!isEndGame){
                let rowNumber = selectedRow;
                let columnNumber = selectedColumn;
                if(typeof selectedRowNumber !== "undefined" && typeof selectedColumnNumber !== "undefined") {
                    rowNumber = selectedRowNumber;
                    columnNumber = selectedColumnNumber;
                }

                if((rowNumber === -1 || columnNumber === -1) && boardState[Math.floor(index/8)][index%8] !== "" && 
                    ((whiteMove && boardState[Math.floor(index/8)][index%8][0] === "w") || (!whiteMove && boardState[Math.floor(index/8)][index%8][0] === "b")) &&
                    !isPawnPromotion) {
                    setSelectedRow(Math.floor(index/8))
                    setSelectedColumn(index%8)
                    getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, false, previousMove)
                }
                else if((rowNumber !== -1 && columnNumber !== -1 && getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, false, previousMove).some( r => r[0] === Math.floor(index/8) && r[1] === index%8) && 
                    !isPawnPromotion) || (isComputerMove && !isPawnPromotion)) {
                    let updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[Math.floor(index/8)][index%8] = boardState[rowNumber][columnNumber]
                    updatedBoard[rowNumber][columnNumber]=""
                    if(isCheck(!whiteMove, updatedBoard, castleInformation, previousMove)) {
                        if(isTwoPlayer || whiteMove) {
                            console.info("Move not allowed, check");
                            setInfoText("Move not allowed, check")
                        }
                        else{
                            //Avoid check computer
                            avoidCheckComputerMove()
                        }
                    }
                    if(isCheck(whiteMove, boardState, castleInformation, previousMove) && isCheck(whiteMove, updatedBoard, castleInformation, previousMove)) {
                        if(isStaleMate(whiteMove, updatedBoard, castleInformation, previousMove)) {
                            console.info("CheckMate")
                            setInfoText("CheckMate")
                            // setIsCheckMate(true)
                        }
                        if(isTwoPlayer || whiteMove) {
                            console.info("Move not allowed, check");
                            setInfoText("Move not allowed, check")
                        }
                        else{
                            //Avoid check computer
                            avoidCheckComputerMove()
                        }
                    } 
                    else{
                        //Pawn promotion
                        if(updatedBoard[Math.floor(index/8)][index%8] === "wP" && Math.floor(index/8) === 7) {
                            setIsPawnPromotion(true);
                            setPwanToPromote(index)
                        }
                        else if(updatedBoard[Math.floor(index/8)][index%8] === "bP" && Math.floor(index/8) === 0) {
                            if(isTwoPlayer){
                                setIsPawnPromotion(true)
                                setPwanToPromote(index)
                            }
                            else{
                                updatedBoard[Math.floor(index/8)][index%8] = "bQ"
                            }
                        }
                        //Castle
                        if(boardState[rowNumber][columnNumber] === "wK"){
                            if(index === 1) {
                                updatedBoard[0][0] = ""
                                updatedBoard[0][2] = "wR"
                            }
                            if(index === 6) {
                                updatedBoard[0][7] = ""
                                updatedBoard[0][5] = "wR"
                            }
                        }
                        if(boardState[rowNumber][columnNumber] === "bK"){
                            if(index === 57) {
                                updatedBoard[7][0] = ""
                                updatedBoard[7][2] = "bR"
                            }
                            if(index === 62) {
                                updatedBoard[7][7] = ""
                                updatedBoard[7][5] = "bR"
                            }
                        }
                        //En passant
                        if(boardState[rowNumber][columnNumber][1] === "P" && columnNumber !== index%8) {
                            if(columnNumber === (index%8)+1) {
                                updatedBoard[rowNumber][columnNumber-1] = "";
                            }
                            else if(columnNumber === (index%8)-1) {
                                updatedBoard[rowNumber][columnNumber+1] = "";
                            }
                            if(boardState[rowNumber][columnNumber][0] === "w") {
                                setWhiteCaptures([...whiteCaptures, "bP"])
                            }
                            else if(boardState[rowNumber][columnNumber][0] === "b") {
                                setBlackCaptures([...blackCaptures, "wP"])
                            }
                        }
                        //Add to capture 
                        if(boardState[Math.floor(index/8)][index%8][0] === "b") {
                            setWhiteCaptures([...whiteCaptures, boardState[Math.floor(index/8)][index%8]])
                        }
                        else if(boardState[Math.floor(index/8)][index%8][0] === "w") {
                            setBlackCaptures([...blackCaptures, boardState[Math.floor(index/8)][index%8]])
                        }
                        setBoardState(updatedBoard)
                        updateCastleInformation(index)
                        setWhiteMove(!whiteMove)
                        setPreviousMove({piece: boardState[rowNumber][columnNumber], from: rowNumber*8+columnNumber, to: index})
                        setInfoText("")
                    }
                    setSelectedRow(-1)
                    setSelectedColumn(-1)
                }
                else {
                    setSelectedRow(-1)
                    setSelectedColumn(-1)
                }
            }
        }
        catch(error) {
            console.error(error)
            if(!whiteMove && !isTwoPlayer) {
                avoidCheckComputerMove()
            }
        }
    }

    const updateCastleInformation = (index: number) => {
        if(index === 0) {
            setCastleInformation({...castleInformation, wPl: false})
        }
        else if(index === 4) {
            setCastleInformation({...castleInformation, wK: false})
        }
        else if(index === 7) {
            setCastleInformation({...castleInformation, wPr: false})
        }
        else if(index === 56) {
            setCastleInformation({...castleInformation, bPr: false})
        }
        else if(index === 60) {
            setCastleInformation({...castleInformation, bK: false})
        }
        else if(index === 63) {
            setCastleInformation({...castleInformation, bPr: false})
        }
    }


    const promotePawn = (piece: string) => {
        let updatedBoard = JSON.parse(JSON.stringify(boardState));
        updatedBoard[Math.floor(pawnToPromote/8)][pawnToPromote%8] = piece
        setBoardState(updatedBoard);
        setIsPawnPromotion(false);
        setPwanToPromote(-1)
    }

    
    const getPossilbeComputerMoves = (): piecePossibleToMove[] => {
        let piecesPossilbeToMove: piecePossibleToMove[] = []
            for(let rowNumber = 0; rowNumber < 8; rowNumber++) {
                for(let columnNumber = 0; columnNumber < 8; columnNumber++) {
                    if(boardState[rowNumber][columnNumber][0] === "b") {
                        const possibleMoves = getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                        if(possibleMoves.length > 0) {
                            const possibleMove: piecePossibleToMove = {
                                rowNumber: rowNumber,
                                columnNumber: columnNumber,
                                moves: getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, true, previousMove)
                            }
                            piecesPossilbeToMove.push(possibleMove)   
                        }                 
                    }
                }
            }
        return piecesPossilbeToMove
    }

    const doRandomComputerMove = () => {
        let piecesPossilbeToMove = getPossilbeComputerMoves()
        const piece = piecesPossilbeToMove[getRandomInt(0, piecesPossilbeToMove.length-1)]
        const move = piece.moves[getRandomInt(0, piece.moves.length-1)]
        movePiece(move[0]*8+move[1], true, piece.rowNumber, piece.columnNumber)
    }
    
    const avoidCheckComputerMove = () => {
        try{
            let piecesPossilbeToMove = getPossilbeComputerMoves()
            let boardCopy = JSON.parse(JSON.stringify(boardState));
            for(let piecePossibleToMove of piecesPossilbeToMove) {
                for(let move of piecePossibleToMove.moves) {
                    boardCopy[move[0]][move[1]] = boardCopy[piecePossibleToMove.rowNumber][piecePossibleToMove.columnNumber]
                    boardCopy[piecePossibleToMove.rowNumber][piecePossibleToMove.columnNumber] = ""
                    if(!isCheck(false, boardCopy, castleInformation, previousMove)) {
                        movePiece(move[0]*8+move[1], true, piecePossibleToMove.rowNumber, piecePossibleToMove.columnNumber)
                        return
                    }
                }
            }
        }
        catch(error) {
            console.log(error)
        }
        finally {
            setInfoText("Check mate player won!")
            console.info("Check mate player won!")
        }
        
    }

    useEffect(() => { 
            if(isCheckMate(whiteMove, boardState, castleInformation, previousMove)){
                setInfoText(`Check mate ${whiteMove ? "black" : "white"} player won!`)
                setIsEndGame(true)
                console.info("Check mate player won!")
            }
            else if(isStaleMate(!whiteMove, boardState, castleInformation, previousMove)){
                setInfoText(`Stalemate, remis`)
                setIsEndGame(true)
                console.info("Stalemate, remis")
            }
            if(!whiteMove && !isPawnPromotion && !isTwoPlayer) {
                doRandomComputerMove()
            }
        }, [whiteMove, boardState, castleInformation, previousMove, isPawnPromotion, isTwoPlayer])

    return(
        <div className="boardContainer">
            <div className="board">
                {tiles}
            </div>
            <div className="info-display">
                <h1>Chess</h1>
                <h3>Game Mode: {isTwoPlayer ? "Two player" : "Machine"} </h3>
                <button onClick={() => setIsTwoPlayer(true)}>TwoPlayer</button>
                <button onClick={() => setIsTwoPlayer(false)}>Machine</button>
                <h2>{whiteMove ? "White" : "Black"} to move</h2>
                <h3>White captures:</h3>
                <Captures pieces={whiteCaptures} />
                <h3>Black captures:</h3>
                <Captures pieces={blackCaptures} />
                {isPawnPromotion && <PieceSelector white={!whiteMove} getPiece={promotePawn}/>}
                {infoText !== "" && <p className="warning-text">{infoText}</p>}
            </div>
        </div>
    ) 
}  

export default Board;
