import { Colors, defualtCastleInformation, defualtMove } from "../types"
import Tile from "./tile"
import "../styles/board.css"
import { useState } from "react"
import { getAllowedMoves, isCheck, isStaleMate } from "../utlis/chess_utils"
import PieceSelector from "./piece_selector"
import Captures from "./captures"


//v3
//Bot v1 random

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

    const movePiece = (index: number) => {
        if((selectedRow === -1 || selectedColumn === -1) && boardState[Math.floor(index/8)][index%8] !== "" && 
            ((whiteMove && boardState[Math.floor(index/8)][index%8][0] === "w") || (!whiteMove && boardState[Math.floor(index/8)][index%8][0] === "b")) &&
            !isPawnPromotion) {
            setSelectedRow(Math.floor(index/8))
            setSelectedColumn(index%8)
            getAllowedMoves(selectedRow, selectedColumn, boardState, castleInformation, false, previousMove)
        }
        else if(selectedRow*8+selectedColumn === index) {
            setSelectedRow(-1)
            setSelectedColumn(-1)
        }
        else if(selectedRow !== -1 && selectedColumn !== -1 && getAllowedMoves(selectedRow, selectedColumn, boardState, castleInformation, false, previousMove).some( r => r[0] === Math.floor(index/8) && r[1] === index%8) && !isPawnPromotion){
            let updatedBoard = JSON.parse(JSON.stringify(boardState));
            updatedBoard[Math.floor(index/8)][index%8] = boardState[selectedRow][selectedColumn]
            updatedBoard[selectedRow][selectedColumn]=""
            if(isCheck(whiteMove, boardState, castleInformation, previousMove) && isCheck(whiteMove, updatedBoard, castleInformation, previousMove)) {
                console.log("Move not allowed, check");
                setInfoText("Move not allowed, check")
                if(isStaleMate(whiteMove, updatedBoard, castleInformation, previousMove)) {
                    console.log("CheckMate")
                    setInfoText("CheckMate")
                }
            } 
            else if(isStaleMate(whiteMove, updatedBoard, castleInformation, previousMove)) {
                console.log("StaleMate")
                setInfoText("StaleMate")
            }
            else{
                //Pawn promotion
                if(updatedBoard[Math.floor(index/8)][index%8] === "wP" && Math.floor(index/8) === 7) {
                    setIsPawnPromotion(true);
                    setPwanToPromote(index)
                }
                else if(updatedBoard[Math.floor(index/8)][index%8] === "bP" && Math.floor(index/8) === 0) {
                    setIsPawnPromotion(true)
                    setPwanToPromote(index)
                }
                //Castle
                if(boardState[selectedRow][selectedColumn] === "wK"){
                    if(index === 1) {
                        updatedBoard[0][0] = ""
                        updatedBoard[0][2] = "wR"
                    }
                    if(index === 6) {
                        updatedBoard[0][7] = ""
                        updatedBoard[0][5] = "wR"
                    }
                }
                if(boardState[selectedRow][selectedColumn] === "bK"){
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
                if(boardState[selectedRow][selectedColumn][1] === "P" && selectedColumn !== index%8) {
                    if(selectedColumn === (index%8)+1) {
                        updatedBoard[selectedRow][selectedColumn-1] = "";
                    }
                    else if(selectedColumn === (index%8)-1) {
                        updatedBoard[selectedRow][selectedColumn+1] = "";
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
                setPreviousMove({piece: boardState[selectedRow][selectedColumn], from: selectedRow*8+selectedColumn, to: index})
                setInfoText("")
            }
            setSelectedRow(-1)
            setSelectedColumn(-1)
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

    return(
        <div className="boardContainer">
            <div className="board">
                {tiles}
            </div>
            <div className="info-display">
                <h1>Chess</h1>
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
