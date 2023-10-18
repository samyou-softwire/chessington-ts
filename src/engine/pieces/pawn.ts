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

        if (this.player === Player.WHITE) {
            if (square.row === 1)
                this.project(moves, square, 0, 1, board, {maxLength: 2, canCapture: false});
            else this.project(moves, square, 0, 1, board, {maxLength: 1, canCapture: false});

            this.project(moves, square, 1, 1, board, { maxLength: 1, needsCapture: true });
            this.project(moves, square, -1, 1, board, { maxLength: 1, needsCapture: true });
        }
        else {
            if (square.row === 6)
                this.project(moves, square, 0, 1, board, {maxLength: 2, canCapture: false});
            else this.project(moves, square, 0, 1, board, {maxLength: 1, canCapture: false});

            this.project(moves, square, 1, 1, board, { maxLength: 1, needsCapture: true });
            this.project(moves, square, -1, 1, board, { maxLength: 1, needsCapture: true });
        }
        return moves;
    }
}
