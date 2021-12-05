import Piece from "./piece"

interface IProps {
    pieces: string[]
}

const Captures = ({pieces}: IProps) => {
    let piecesToRender = pieces.sort().map((piece, index) => 
        <Piece piece={piece} key={index}/>
    )

    return(
        <>
            {piecesToRender}
        </>
    )
}

export default Captures;