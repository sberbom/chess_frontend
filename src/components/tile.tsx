import classNames from "classnames";
import { Colors } from "../types";
import "../styles/tile.css"
import Piece from "./piece";

interface IProps {
    color: Colors,
    piece: String,
    selected: Boolean,
    movePiece: () => void;
}

const Tile = ({color, piece, selected, movePiece}: IProps ): JSX.Element => {

    var tileClass = classNames("tile", `${color}-tile`);
    var selectedClass = classNames({"selected": selected})

    return(
        <div className={tileClass} onClick={movePiece}>
            <div className={selectedClass}>
                {piece && <Piece piece={piece}/>}
            </div>
        </div>
    )
}

export default Tile;