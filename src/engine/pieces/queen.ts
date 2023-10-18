import Piece from './piece';
import Player from '../player';
import Board from '../board';
import {bishopMoves} from "./bishop";
import {rookMoves} from "./rook";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const square = board.findPiece(this);

        return [
            ...bishopMoves(square),
            ...rookMoves(square)
        ]
    }
}
