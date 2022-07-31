import {fireEvent, render, screen} from "@testing-library/react"
import Board from "../components/board"
import * as constants from "../constants"

test("Board render", () => {
    render(<Board />)

    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Chess")
    expect(screen.getAllByTestId("tile")).toHaveLength(64)
})

test("Game modes", () => {
    render(<Board />)
    
    fireEvent.change(screen.getByTestId("GameMode"), {target: {value: constants.TwoPlayer}})
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Game Mode: Two Player")
    

    fireEvent.change(screen.getByTestId("GameMode"), {target: {value: constants.Random}})
    expect(screen.getByText("Game Mode: Machine Random")).toHaveTextContent("Game Mode: Machine Random")
})

test("Checkmate", () => {
    render(<Board />)
    
    fireEvent.change(screen.getByTestId("GameMode"), {target: {value: constants.TwoPlayer}})

    //Move white pawn
    fireEvent.click(screen.getAllByTestId("tile")[12])
    fireEvent.click(screen.getAllByTestId("tile")[20])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[48])
    fireEvent.click(screen.getAllByTestId("tile")[40])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[3])
    fireEvent.click(screen.getAllByTestId("tile")[39])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[40])
    fireEvent.click(screen.getAllByTestId("tile")[32])

    //White bishop
    fireEvent.click(screen.getAllByTestId("tile")[5])
    fireEvent.click(screen.getAllByTestId("tile")[26])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[32])
    fireEvent.click(screen.getAllByTestId("tile")[24])
    
    //White Queen
    fireEvent.click(screen.getAllByTestId("tile")[39])
    fireEvent.click(screen.getAllByTestId("tile")[53])

    
    expect(screen.getByText("Check mate white player won!")).toHaveTextContent("Check mate white player won!")
})

test("Check", () => {
    render(<Board />)

    fireEvent.change(screen.getByTestId("GameMode"), {target: {value: constants.TwoPlayer}})

    //Move white pawn
    fireEvent.click(screen.getAllByTestId("tile")[12])
    fireEvent.click(screen.getAllByTestId("tile")[20])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[48])
    fireEvent.click(screen.getAllByTestId("tile")[40])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[3])
    fireEvent.click(screen.getAllByTestId("tile")[39])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[40])
    fireEvent.click(screen.getAllByTestId("tile")[32])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[39])
    fireEvent.click(screen.getAllByTestId("tile")[53])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[32])
    fireEvent.click(screen.getAllByTestId("tile")[24])


    expect(screen.getByText("Move not allowed, you can not put your own piece in check")).toHaveTextContent("Move not allowed, you can not put your own piece in check")
})

test("Chekc nr.2", () => {
    render(<Board />)

    fireEvent.change(screen.getByTestId("GameMode"), {target: {value: constants.TwoPlayer}})

    //"White pawn"
    fireEvent.click(screen.getAllByTestId("tile")[12])
    fireEvent.click(screen.getAllByTestId("tile")[20])

    //"Black pawn"
    fireEvent.click(screen.getAllByTestId("tile")[52])
    fireEvent.click(screen.getAllByTestId("tile")[36])

    //"White bishop"
    fireEvent.click(screen.getAllByTestId("tile")[5])
    fireEvent.click(screen.getAllByTestId("tile")[33])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[51])
    fireEvent.click(screen.getAllByTestId("tile")[35])

    expect(screen.getByText("Move not allowed, you can not put your own piece in check")).toHaveTextContent("Move not allowed, you can not put your own piece in check")
})

test("Stalemate", () => {
    render(<Board />)

    fireEvent.change(screen.getByTestId("GameMode"), {target: {value: constants.TwoPlayer}})

    //Move white pawn
    fireEvent.click(screen.getAllByTestId("tile")[12])
    fireEvent.click(screen.getAllByTestId("tile")[20])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[48])
    fireEvent.click(screen.getAllByTestId("tile")[32])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[3])
    fireEvent.click(screen.getAllByTestId("tile")[39])

    //Black rock
    fireEvent.click(screen.getAllByTestId("tile")[56])
    fireEvent.click(screen.getAllByTestId("tile")[40])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[39])
    fireEvent.click(screen.getAllByTestId("tile")[32])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[55])
    fireEvent.click(screen.getAllByTestId("tile")[39])

    //White pawn
    fireEvent.click(screen.getAllByTestId("tile")[15])
    fireEvent.click(screen.getAllByTestId("tile")[31])

    //Black rock
    fireEvent.click(screen.getAllByTestId("tile")[40])
    fireEvent.click(screen.getAllByTestId("tile")[47])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[32])
    fireEvent.click(screen.getAllByTestId("tile")[50])

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[53])
    fireEvent.click(screen.getAllByTestId("tile")[45])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[50])
    fireEvent.click(screen.getAllByTestId("tile")[51])

    //Black king
    fireEvent.click(screen.getAllByTestId("tile")[60])
    fireEvent.click(screen.getAllByTestId("tile")[53])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[51])
    fireEvent.click(screen.getAllByTestId("tile")[49])

    //Black queen
    fireEvent.click(screen.getAllByTestId("tile")[59])
    fireEvent.click(screen.getAllByTestId("tile")[19])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[49])
    fireEvent.click(screen.getAllByTestId("tile")[57])

    //Black queen
    fireEvent.click(screen.getAllByTestId("tile")[19])
    fireEvent.click(screen.getAllByTestId("tile")[55])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[57])
    fireEvent.click(screen.getAllByTestId("tile")[58])

    //Black king
    fireEvent.click(screen.getAllByTestId("tile")[53])
    fireEvent.click(screen.getAllByTestId("tile")[46])

    //White queen
    fireEvent.click(screen.getAllByTestId("tile")[58])
    fireEvent.click(screen.getAllByTestId("tile")[44])


    expect(screen.getByText("Stalemate, remis")).toHaveTextContent("Stalemate, remis")

    //Black pawn
    fireEvent.click(screen.getAllByTestId("tile")[45])
    fireEvent.click(screen.getAllByTestId("tile")[37])


    expect(screen.getByText("Stalemate, remis")).toHaveTextContent("Stalemate, remis")
})