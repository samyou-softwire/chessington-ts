import Piece, {Move} from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    firstTouched: number;

    public constructor(player: Player) {
        super(player);

        this.firstTouched = -1;
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);
        const moves: Move[] = [];

        if (this.player === Player.WHITE) {
            if (square.row === 1)
                this.project(moves, square, 0, 1, board, {maxLength: 2, canCapture: false });
            else this.project(moves, square, 0, 1, board, {maxLength: 1, canCapture: false });

            this.project(moves, square, 1, 1, board, { maxLength: 1, needsCapture: true });
            this.project(moves, square, -1, 1, board, { maxLength: 1, needsCapture: true });
        }
        else {
            if (square.row === 6)
                this.project(moves, square, 0, 1, board, {maxLength: 2, canCapture: false });
            else this.project(moves, square, 0, 1, board, {maxLength: 1, canCapture: false });

            this.project(moves, square, 1, 1, board, { maxLength: 1, needsCapture: true });
            this.project(moves, square, -1, 1, board, { maxLength: 1, needsCapture: true });
        }

        this.checkPassant(moves, Square.at(square.row, square.col + 1), board);
        this.checkPassant(moves, Square.at(square.row, square.col - 1), board);

        return moves;
    }

    private checkPassant(moves: Move[], toSquare: Square, board: Board) {
        const square = board.findPiece(this);
        const yFacing = this.getYFacing();

        const opposingPiece = board.getPiece(toSquare);

        if (opposingPiece && opposingPiece instanceof Pawn) {
            if (opposingPiece.firstTouched === board.move - 1) { // if it just moved
                moves.push({
                    to: Square.at(toSquare.row + yFacing, toSquare.col),
                    from: square,
                    special: (_, board) => {
                        board.setPiece(toSquare, undefined); // remove the pawn (it's not overwritten)
                    }
                });
            }
        }
    }

    public postMove(board: Board) {
        if (this.firstTouched === -1)
            this.firstTouched = board.move;
    }
}
