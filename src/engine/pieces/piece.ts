import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board): Move[] {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public postMove(board: Board) {}

    public moveTo(board: Board, move: Move | Square) {
        if ("to" in move) { // it's a move
            board.movePiece(move);
        } else { // it's a square
            // so try to find a move to that square
            const moves = this.getAvailableMoves(board);
            const square = move;
            const foundMove = moves.find(move => move.to.equals(square));

            if (foundMove) {
                this.moveTo(board, foundMove)
            } else {
                throw Error("could not move to this square!");
            }
        }
    }

    public getAvailableMoveTos(board: Board): Square[] {
        return this.getAvailableMoves(board).map(move => move.to);
    }

    protected tryAdd(moves: Move[], square: Square, from: Square, board: Board, options: {
        canCapture?: boolean,
        needsCapture?: boolean,
        special?: (piece: Piece, board: Board) => void
    } = {}): boolean {
        if (square.row >= 0 && square.col >= 0 && square.row <= 7 && square.col <= 7) {
            const piece = board.getPiece(square);

            if (piece) {
                if (piece.player !== this.player && (options.canCapture === undefined || options.canCapture) && !piece.isKing()) {
                    moves.push({from: from, to: square, special: options.special});
                    return false; // add move (capture) but stop projecting
                } else {
                    return false; // no add move and stop projecting
                }
            } else {
                if (!options.needsCapture) { // if specified can only capture
                    moves.push({from: from, to: square, special: options.special}); // add move and keep projecting
                    return true;
                }
            }
        }

        return false;
    }

    protected project(moves: Move[], square: Square, dx: number, dy: number, board: Board, options: {
        maxLength?: number,
        canCapture?: boolean,
        needsCapture?: boolean,
        special?: (piece: Piece, board: Board) => void
    } = {}) {
        let length = 1;
        let yFacing = this.getYFacing();

        while (!options.maxLength || length <= options.maxLength) {
            const result = this.tryAdd(moves, Square.at(
                square.row + dy * length * yFacing,
                square.col + dx * length
            ), square, board, options);

            if (!result) break;

            length++;
        }
    }

    protected isKing() {
        return false;
    }

    protected getYFacing() {
        return this.player === Player.WHITE ? 1 : -1; // reverse moves if black
    }
}

export interface Move {
    from: Square,
    to: Square,
    special?: (piece: Piece, board: Board) => void
}
