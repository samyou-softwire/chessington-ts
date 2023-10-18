import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);

        if (this.player === Player.WHITE)
            return [Square.at(square.row+1, square.col)];
        else return [Square.at(square.row-1, square.col)];
    }
}
