import bpawn from "../images/pdt45.svg";
import bBishop from "../images/bdt45.svg";
import bKnight from "../images/ndt45.svg";
import bQeen from "../images/qdt45.svg";
import bRook from "../images/rdt45.svg";
import bKing from "../images/kdt45.svg";
import wpawn from "../images/plt45.svg";
import wBishop from "../images/blt45.svg";
import wKnight from "../images/nlt45.svg";
import wQeen from "../images/qlt45.svg";
import wRook from "../images/rlt45.svg";
import wKing from "../images/klt45.svg";
import "../styles/piece.css";

interface IProps {
  piece: String;
  onClick?: React.MouseEventHandler;
}

const Piece = ({ piece, onClick }: IProps) => {
  switch (piece) {
    case "bP":
      return (
        <img src={bpawn} className={"piece"} alt="bPawn" onClick={onClick} />
      );
    case "bB":
      return (
        <img
          src={bBishop}
          className={"piece"}
          alt="bBishop"
          onClick={onClick}
        />
      );
    case "bKn":
      return (
        <img
          src={bKnight}
          className={"piece"}
          alt="bKnight"
          onClick={onClick}
        />
      );
    case "bQ":
      return (
        <img src={bQeen} className={"piece"} alt="bQueen" onClick={onClick} />
      );
    case "bR":
      return (
        <img src={bRook} className={"piece"} alt="bRook" onClick={onClick} />
      );
    case "bK":
      return (
        <img src={bKing} className={"piece"} alt="bKing" onClick={onClick} />
      );
    case "wP":
      return (
        <img
          src={wpawn}
          className={"piece  whitePiece"}
          alt="wPawn"
          onClick={onClick}
        />
      );
    case "wB":
      return (
        <img
          src={wBishop}
          className={"piece  whitePiece"}
          alt="wBishop"
          onClick={onClick}
        />
      );
    case "wKn":
      return (
        <img
          src={wKnight}
          className={"piece  whitePiece"}
          alt="wKnight"
          onClick={onClick}
        />
      );
    case "wQ":
      return (
        <img
          src={wQeen}
          className={"piece  whitePiece"}
          alt="wQueen"
          onClick={onClick}
        />
      );
    case "wR":
      return (
        <img
          src={wRook}
          className={"piece  whitePiece"}
          alt="wRook"
          onClick={onClick}
        />
      );
    case "wK":
      return (
        <img
          src={wKing}
          className={"piece  whitePiece"}
          alt="wKing"
          onClick={onClick}
        />
      );
    default:
      return null;
  }
};

export default Piece;
