import Piece, {Move} from './piece';
import Player from '../player';
import Board from '../board';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves: Move[] = [];
        const square = board.findPiece(this);

        this.project(moves, square, 1, 1, board);
        this.project(moves, square, 1, -1, board);
        this.project(moves, square, -1, -1, board);
        this.project(moves, square, -1, 1, board);

        return moves;
    }
}
