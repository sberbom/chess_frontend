import classNames from "classnames";
import { Colors } from "../types";
import "../styles/tile.css"
import Piece from "./piece";

interface IProps {
    color: Colors,
    piece: String,
    selected: Boolean,
    movePiece: () => void;
    index?: number
}

const Tile = ({color, piece, selected, movePiece, index}: IProps ): JSX.Element => {

    var tileClass = classNames("tile", `${color}-tile`);
    var selectedClass = classNames({"selected": selected})

    return(
        <div className={tileClass} onClick={movePiece} data-testid="tile">
            <div className={selectedClass}>
                {piece && <Piece piece={piece}/>}
            </div>
        </div>
    )
}

export default Tile;