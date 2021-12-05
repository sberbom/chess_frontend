import bpawn from "../images/pawn.png"
import bBishop from "../images/bishop.png"
import bKnight from "../images/knight.png"
import bQeen from "../images/queen.png"
import bRook from "../images/rook.png"
import bKing from "../images/king.png"
import wpawn from "../images/wpawn.png"
import wBishop from "../images/wbishop.png"
import wKnight from "../images/wknight.png"
import wQeen from "../images/wqueen.png"
import wRook from "../images/wrook.png"
import wKing from "../images/wking.png"
import "../styles/piece.css"

interface IProps {
    piece: String
    onClick?: React.MouseEventHandler; 
}

const Piece = ({piece, onClick}: IProps) => {
    switch(piece){
        case "bP":
            return <img src={bpawn} className={"piece"} alt="bPawn" onClick={onClick}/>
        case "bB":
            return <img src={bBishop} className={"piece"} alt="bBishop" onClick={onClick}/>
        case "bKn":
            return <img src={bKnight} className={"piece"} alt="bKnight" onClick={onClick}/>
        case "bQ":
            return <img src={bQeen} className={"piece"} alt="bQueen" onClick={onClick}/>
        case "bR":
            return <img src={bRook} className={"piece"} alt="bRook" onClick={onClick}/>
        case "bK":
            return <img src={bKing} className={"piece"} alt="bKing" onClick={onClick}/>
        case "wP":
            return <img src={wpawn} className={"piece  whitePiece"} alt="wPawn" onClick={onClick}/>
        case "wB":
            return <img src={wBishop} className={"piece  whitePiece"} alt="wBishop" onClick={onClick}/>
        case "wKn":
            return <img src={wKnight} className={"piece  whitePiece"} alt="wKnight" onClick={onClick}/>
        case "wQ":
            return <img src={wQeen} className={"piece  whitePiece"} alt="wQueen" onClick={onClick}/>
        case "wR":
            return <img src={wRook} className={"piece  whitePiece"} alt="wRook" onClick={onClick}/>
        case "wK":
            return <img src={wKing} className={"piece  whitePiece"} alt="wKing" onClick={onClick}/>
        default:
            return null;
    }
}

export default Piece;