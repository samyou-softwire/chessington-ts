import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);
        const patterns = [[1, 2], [2, 1]]; // the two-ish unique moves a knight can make
        const moves: Square[] = [];

        for (const pattern of patterns) {
            this.tryAdd(moves, Square.at(square.row + pattern[0], square.col + pattern[1]));
            this.tryAdd(moves, Square.at(square.row - pattern[0], square.col + pattern[1]));
            this.tryAdd(moves, Square.at(square.row + pattern[0], square.col - pattern[1]));
            this.tryAdd(moves, Square.at(square.row - pattern[0], square.col - pattern[1]));
        }

        return moves;
    }
}
