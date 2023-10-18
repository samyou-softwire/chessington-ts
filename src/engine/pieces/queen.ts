import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Rook from "./rook";
import Bishop from "./bishop";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        return [
            ...Bishop.prototype.getAvailableMoves.call(this, board),
            ...Rook.prototype.getAvailableMoves.call(this, board),
        ]
    }
}
