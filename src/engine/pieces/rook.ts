import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);

        const moves = [];

        for (let row = 0; row < 8; row++)
            if (row !== square.row)
                moves.push(Square.at(row, square.col));

        for (let col = 0; col < 8; col++)
            if (col !== square.col)
                moves.push(Square.at(square.row, col));

        return moves;
    }
}
