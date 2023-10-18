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

    protected tryAdd(moves: Square[], square: Square, board: Board): boolean {
        if (
            square.row >= 0 && square.col >= 0 && square.row <= 7 && square.col <= 7
            && !board.getPiece(square)
        ) {
            moves.push(square);
            return true;
        }

        return false;
    }

    protected project(moves: Square[], square: Square, dx: number, dy: number, player: Player, board: Board, maxLength?: number) {
        let length = 1;
        let yFacing = player === Player.WHITE ? 1 : -1; // reverse moves if black

        while (!maxLength || length <= maxLength) {
            const result = this.tryAdd(moves, Square.at(
                square.row + dy * length * yFacing,
                square.col + dx * length
            ), board);

            if (!result) break;

            length++;
        }
    }
}
