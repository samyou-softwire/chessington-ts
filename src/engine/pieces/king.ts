import Piece, {Move} from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);
        const moves: Move[] = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i !== 0 || j !== 0) this.tryAdd(moves, Square.at(square.row + i, square.col + j), board);
            }
        }

        return moves;
    }


    protected isKing(): boolean {
        return true;
    }
}
