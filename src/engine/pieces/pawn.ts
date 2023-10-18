import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);
        const moves: Square[] = [];

        if (this.player === Player.WHITE)
            if (square.row === 1)
                this.project(moves, square, 0, 1, this.player, board, 2);
            else this.project(moves, square, 0, 1, this.player, board, 1);
        else
            if (square.row === 6)
                this.project(moves, square, 0, 1, this.player, board, 2);
            else this.project(moves, square, 0, 1, this.player, board, 1);

        return moves;
    }
}
