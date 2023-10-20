import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    protected tryAdd(moves: Square[], square: Square, board: Board, options: {
        canCapture?: boolean,
        needsCapture?: boolean
    } = {}): boolean {
        if (square.row >= 0 && square.col >= 0 && square.row <= 7 && square.col <= 7) {
            const piece = board.getPiece(square);

            if (piece) {
                if (piece.player !== this.player && (options.canCapture === undefined || options.canCapture) && !piece.isKing()) {
                    moves.push(square);
                    return false; // add move (capture) but stop projecting
                } else {
                    return false; // no add move and stop projecting
                }
            } else {
                if (!options.needsCapture) { // if specified can only capture
                    moves.push(square); // add move and keep projecting
                    return true;
                }
            }
        }

        return false;
    }

    protected project(moves: Square[], square: Square, dx: number, dy: number, board: Board, options: {
        maxLength?: number,
        canCapture?: boolean,
        needsCapture?: boolean
    } = {}) {
        let length = 1;
        let yFacing = this.player === Player.WHITE ? 1 : -1; // reverse moves if black

        while (!options.maxLength || length <= options.maxLength) {
            const result = this.tryAdd(moves, Square.at(
                square.row + dy * length * yFacing,
                square.col + dx * length
            ), board, options);

            if (!result) break;

            length++;
        }
    }

    protected isKing() {
        return false;
    }
}
