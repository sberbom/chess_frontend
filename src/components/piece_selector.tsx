import Piece from "./piece";
import "../styles/piece_selector.css"

interface IProps {
    white: boolean
    getPiece: (name: string) => void;
}

const PieceSelector = ({white, getPiece}: IProps) => {
    if(white) {
        return (
            <>
                <h2>Promote pawn</h2>
                <div className="pieceSelectorContainer">
                        <div className="pieceContainer">
                            <Piece piece={"wP"} onClick={() => getPiece("wP")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"wR"} onClick={() => getPiece("wR")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"wKn"} onClick={() => getPiece("wKn")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"wB"} onClick={() => getPiece("wB")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"wQ"} onClick={() => getPiece("wQ")}/>
                        </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <h2>Promote pawn</h2>
                <div className="pieceSelectorContainer">
                <div className="pieceContainer">
                            <Piece piece={"bP"} onClick={() => getPiece("bP")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"bR"} onClick={() => getPiece("bR")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"bKn"} onClick={() => getPiece("bKn")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"bB"} onClick={() => getPiece("bB")}/>
                        </div>
                        <div className="pieceContainer">
                            <Piece piece={"bQ"} onClick={() => getPiece("bQ")}/>
                        </div>
                </div>
            </>
        )
    }
}

export default PieceSelector;