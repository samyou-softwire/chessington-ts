import Piece, {Move} from './piece';
import Player from '../player';
import Board from '../board';
import player from "../player";

export default class Rook extends Piece {
    moved: boolean

    public constructor(player: Player) {
        super(player);

        this.moved = false;
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

    postMove(board: Board) {
        this.moved = true;
    }
}
