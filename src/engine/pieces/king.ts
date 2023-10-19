import Piece, {Move} from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Rook from "./rook";

export default class King extends Piece {
    moved: boolean

    public constructor(player: Player) {
        super(player);

        this.moved = false;
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);
        const moves: Move[] = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i !== 0 || j !== 0) this.tryAdd(moves, Square.at(square.row + i, square.col + j), square, board);
            }
        }

        if (!this.moved) {
            const row = this.player === Player.WHITE ? 0 : 7;

            const kingsideRook = board.getPiece(Square.at(row, 7));

            if (kingsideRook && kingsideRook instanceof Rook && !kingsideRook.moved) {
                const tryMoves: Move[] = []
                this.project(tryMoves, square, 1, 0, board, { canCapture: false, maxLength: 2 });

                if (tryMoves.length == 2) { // both squares unused
                    moves.push({
                        to: Square.at(row, 6),
                        from: square,
                        special: (_, board) => {
                            kingsideRook.moveTo(board, {
                                to: Square.at(row, 5),
                                from: Square.at(row, 7)
                            });
                            board.move--;
                            board.currentPlayer = (board.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
                        }
                    })
                }
            }

            const queensideRook = board.getPiece(Square.at(row, 0));

            if (queensideRook && queensideRook instanceof Rook && !queensideRook.moved) {
                const tryMoves: Move[] = []
                this.project(tryMoves, square, -1, 0, board, { canCapture: false, maxLength: 3 });

                if (tryMoves.length == 3) { // both squares unused
                    moves.push({
                        to: Square.at(row, 2),
                        from: square,
                        special: (_, board) => {
                            queensideRook.moveTo(board, {
                                to: Square.at(row, 3),
                                from: Square.at(row, 0)
                            });
                            board.move--;
                            board.currentPlayer = (board.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
                        }
                    })
                }
            }
        }

        return moves;
    }

    public postMove(board: Board) {
        this.moved = true;
    }

    protected isKing(): boolean {
        return true;
    }
}
