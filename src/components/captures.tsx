import Piece from "./piece";
import "../styles/captures.css";
import { getPieceValue } from "../utlis/chess_utils";

interface IProps {
  pieces: string[];
}

const Captures = ({ pieces }: IProps) => {
  console.log(pieces);
  const countedPieces: { [piece: string]: number } = pieces
    .sort((a, b) => getPieceValue(b) - getPieceValue(a))
    .reduce(
      (count: { [pieces: string]: number }, current: string) => (
        (count[current] = count[current] + 1 || 1), count
      ),
      {}
    );
  console.log(countedPieces);
  let piecesToRender = Object.entries(countedPieces).map(([piece, count]) => (
    <div className="captured-piece-container" key={piece}>
      <Piece piece={piece} />
      {count !== 1 && <p>x{count}</p>}
    </div>
  ));

  return <div className="captures-container">{piecesToRender}</div>;
};

export default Captures;
