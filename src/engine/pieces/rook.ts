import Piece, {Move} from './piece';
import Player from '../player';
import Board from '../board';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);

        const moves: Move[] = [];

        this.project(moves, square, 1, 0, board);
        this.project(moves, square, 0, 1, board);
        this.project(moves, square, 0, -1, board);
        this.project(moves, square, -1, 0, board);

        return moves;
    }
}
