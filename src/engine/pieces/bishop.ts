import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const square = board.findPiece(this);

        for (let i = 1; i < 7; i++) {
            this.tryAdd(moves, Square.at(square.row + i, square.col + i), board);
            this.tryAdd(moves, Square.at(square.row - i, square.col + i), board);
            this.tryAdd(moves, Square.at(square.row - i, square.col - i), board);
            this.tryAdd(moves, Square.at(square.row + i, square.col - i), board);
        }

        return moves;
    }
}
