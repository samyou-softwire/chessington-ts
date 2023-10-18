import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);

        return bishopMoves(square);
    }
}

export function bishopMoves(square: Square): Square[] {
    const moves: Square[] = [];

    for (let i = 1; i < 7; i++) {
        tryAdd(moves, Square.at(square.row + i, square.col + i));
        tryAdd(moves, Square.at(square.row - i, square.col + i));
        tryAdd(moves, Square.at(square.row - i, square.col - i));
        tryAdd(moves, Square.at(square.row + i, square.col - i));
    }

    return moves;
}

function tryAdd(moves: Square[], square: Square) {
    if (square.row >= 0 && square.col >= 0 && square.row <= 7 && square.col <= 7)
        moves.push(square);
}
