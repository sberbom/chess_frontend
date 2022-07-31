import { Colors, defualtCastleInformation, noPreviousMove } from "../types"
import Tile from "./tile"
import "../styles/board.css"
import { useEffect, useState } from "react"
import { getAllowedMoves, getPieceValue, isCheck, isCheckMate, isStaleMate } from "../utlis/chess_utils"
import PieceSelector from "./piece_selector"
import Captures from "./captures"
import { getAvoidCheckRandomComputerMove, getRandomComputerMove } from "../bots/random"
import * as constants from "../constants"
import { getAvoidCheckGreedyComputerMove, getGreedyComputerMove } from "../bots/greedy"
import { getAvoidCheckRulyComputerMove, getRulyComputerMove } from "../bots/rules"


//v4
//Castle bug - computer somethimes castles when in check
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
    const [previousMove, setPreviousMove] = useState(noPreviousMove)
    const [blackCaptures, setBlackCaptures] = useState<string[]>([])
    const [whiteCaptures, setWhiteCaptures] = useState<string[]>([])
    const [infoText, setInfoText] = useState("")
    const [gameMode, setGameMode] = useState(constants.Rules)
    const [isEndGame, setIsEndGame] = useState(false)
    const [whitePoints, setWhitePoitns] = useState(0)
    const [blackPoints, setBlackPoints] = useState(0)

    const getSelectedTiles = () => {
        let selectedTiles = []
        if(selectedRow !== -1 && selectedColumn !== -1) {
            selectedTiles.push(8*selectedRow+selectedColumn)
            getAllowedMoves(selectedRow, selectedColumn, boardState, castleInformation, false, previousMove).forEach(move => {
                selectedTiles.push(8*move.row+move.column)
            })
        }
        return selectedTiles
    }

    let nextColorWhite = true
    let tiles = boardState.flat().map((piece, index) => {
        if(index === previousMove.fromTile.row*8 + previousMove.fromTile.column || index === (previousMove.toTile.row*8) + previousMove.toTile.column){
            if((index+1)%8 !== 0){
                nextColorWhite = !nextColorWhite
            }
            return(<Tile color={Colors.red} piece={piece} movePiece={() => movePiece(index)} selected={getSelectedTiles().includes(index)} key={index} index={index}/>)
        }
        if(nextColorWhite) {
            if((index+1)%8 !== 0){
                nextColorWhite = !nextColorWhite
            }
            return(<Tile color={Colors.white} piece={piece} movePiece={() => movePiece(index)} selected={getSelectedTiles().includes(index)} key={index} index={index}/>)
        }
        else{
            if((index+1)%8 !== 0){
                nextColorWhite = !nextColorWhite
            }
            return(<Tile color={Colors.black} piece={piece} movePiece={() => movePiece(index)} selected={getSelectedTiles().includes(index)} key={index} index={index}/>)
        }
    })

    const movePiece = (index: number, isComputerMove?: Boolean, selectedRowNumber?: number, selectedColumnNumber?: number) => {
        try{
            if(!isEndGame){
                let rowNumber = selectedRow;
                let columnNumber = selectedColumn;

                //Slected piece from computer
                if(typeof selectedRowNumber !== "undefined" && typeof selectedColumnNumber !== "undefined") {
                    rowNumber = selectedRowNumber;
                    columnNumber = selectedColumnNumber;
                }

                //Select piece player
                if((rowNumber === -1 || columnNumber === -1) && boardState[Math.floor(index/8)][index%8] !== "" && 
                    ((whiteMove && boardState[Math.floor(index/8)][index%8][0] === "w") || 
                    (!whiteMove && boardState[Math.floor(index/8)][index%8][0] === "b")) &&
                    !isPawnPromotion) {

                    setSelectedRow(Math.floor(index/8))
                    setSelectedColumn(index%8)
                    getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, false, previousMove)
                }
                //MovePice
                else if((rowNumber !== -1 && columnNumber !== -1 && 
                    getAllowedMoves(rowNumber, columnNumber, boardState, castleInformation, false, previousMove).some( r => r.row === Math.floor(index/8) && r.column === index%8) && !isPawnPromotion) 
                    || (isComputerMove && !isPawnPromotion)) {

                    let updatedBoard = JSON.parse(JSON.stringify(boardState));
                    updatedBoard[Math.floor(index/8)][index%8] = boardState[rowNumber][columnNumber]
                    updatedBoard[rowNumber][columnNumber]=""

                    //Move gets you in check -> not allowed
                    if(isCheck(whiteMove, updatedBoard, castleInformation, previousMove)) {
                        if(gameMode ===  constants.TwoPlayer || whiteMove) {
                            console.info("Move not allowed, you can not put your own piece in check");
                            setInfoText("Move not allowed, you can not put your own piece in check")
                        }
                        else{
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
                            if(gameMode === constants.TwoPlayer){
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
                            setWhitePoitns(whitePoints + getPieceValue(boardState[Math.floor(index/8)][index%8]))
                        }
                        else if(boardState[Math.floor(index/8)][index%8][0] === "w") {
                            setBlackCaptures([...blackCaptures, boardState[Math.floor(index/8)][index%8]])
                            setBlackPoints(blackPoints + getPieceValue(boardState[Math.floor(index/8)][index%8]))
                        }
                        setBoardState(updatedBoard)
                        updateCastleInformation(index)
                        setWhiteMove(!whiteMove)
                        setPreviousMove({piece: boardState[rowNumber][columnNumber], fromTile: {row: rowNumber, column: columnNumber}, toTile: {row: Math.floor(index/8), column: index%8}})
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
            if(!whiteMove && gameMode !== constants.TwoPlayer) {
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

    const doComputerMove = async () => {
        let computerMove = getRandomComputerMove(boardState, castleInformation, previousMove)
        switch(gameMode){
            case constants.Greedy:
                computerMove = getGreedyComputerMove(false, boardState, castleInformation, previousMove)
                break
            case constants.Rules:
                computerMove = getRulyComputerMove(boardState, castleInformation, previousMove)
                break
            default:
                break
        }
        movePiece(computerMove.toTile.row*8+computerMove.toTile.column, true, computerMove.fromTile.row, computerMove.fromTile.column)
    }
    
    const avoidCheckComputerMove = () => {
        let computerMove = getAvoidCheckRandomComputerMove(boardState, castleInformation, previousMove)
        switch(gameMode){
            case constants.Greedy:
                computerMove = getAvoidCheckGreedyComputerMove(boardState, castleInformation, previousMove)
                break
            case constants.Rules:
                computerMove = getAvoidCheckRulyComputerMove(boardState, castleInformation, previousMove)
                break
            default:
                break
        }
        if(computerMove != null){
            movePiece(computerMove.toTile.row*8+computerMove.toTile.column, true, computerMove.fromTile.row, computerMove.fromTile.column)
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
            if(!whiteMove && !isPawnPromotion && gameMode !== constants.TwoPlayer) {
                doComputerMove()
            }
        }, [whiteMove, boardState, castleInformation, previousMove, isPawnPromotion, gameMode === constants.TwoPlayer])

    return(
        <div className="boardContainer">
            <div className="board">
                {tiles}
            </div>
            <div className="info-display">
                <h1>Chess</h1>
                <h3>Game Mode: {gameMode} </h3>
                <label htmlFor="GameMode">Select Game Mode:</label>
                <select name="GameMode" id="GameMode" data-testid="GameMode" onChange={(event) => setGameMode(event.target.value)} value={gameMode}>
                    <option value={constants.TwoPlayer}>Two Player</option>
                    <option value={constants.Random}>Randy (Level 1)</option>
                    <option value={constants.Greedy}>Greedy (Level 2)</option>
                    <option value={constants.Rules}>Jules (Level 3)</option>
                </select>
                <h2>{whiteMove ? "White" : "Black"} to move</h2>
                <h3>White captures:</h3>
                <p>{whitePoints} points</p>
                <Captures pieces={whiteCaptures} />
                <h3>Black captures:</h3>
                <p>{blackPoints} points</p>
                <Captures pieces={blackCaptures} />
                {isPawnPromotion && <PieceSelector white={!whiteMove} getPiece={promotePawn}/>}
                {infoText !== "" && <p className="warning-text">{infoText}</p>}
            </div>
        </div>
    ) 
}  

export default Board;
