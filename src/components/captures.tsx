import Piece from "./piece"
import "../styles/captures.css"

interface IProps {
    pieces: string[]
}

const Captures = ({pieces}: IProps) => {
    let piecesToRender = pieces.sort().map((piece, index) => 
        <div className="captured-piece-container" key={index}>
            <Piece piece={piece}/>
        </div>
    )

    return(
        <div className="captures-container">
            {piecesToRender}
        </div>
    )
}

export default Captures;