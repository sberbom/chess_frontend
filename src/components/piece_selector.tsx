import Piece from "./piece";
import "../styles/piece_selector.css"

interface IProps {
    white: boolean
    getPiece: (name: string) => void;
}

const PieceSelector = ({white, getPiece}: IProps) => {
    if(white) {
        return (
            <div className="pieceSelectorContainer">
                    <Piece piece={"wP"} onClick={() => getPiece("wP")}/>
                    <Piece piece={"wR"} onClick={() => getPiece("wR")}/>
                    <Piece piece={"wKn"} onClick={() => getPiece("wKn")}/>
                    <Piece piece={"wB"} onClick={() => getPiece("wB")}/>
                    <Piece piece={"wQ"} onClick={() => getPiece("wQ")}/>
            </div>
        )
    }
    else {
        return (
            <div className="pieceSelectorContainer">
                    <Piece piece={"bP"} onClick={() => getPiece("bP")}/>
                    <Piece piece={"bR"} onClick={() => getPiece("bR")}/>
                    <Piece piece={"bKn"} onClick={() => getPiece("bKn")}/>
                    <Piece piece={"bB"} onClick={() => getPiece("bB")}/>
                    <Piece piece={"bQ"} onClick={() => getPiece("bQ")}/>
            </div>
        )
    }
}

export default PieceSelector;