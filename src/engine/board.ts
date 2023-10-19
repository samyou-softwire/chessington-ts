import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece, {Move} from './pieces/piece';

export default class Board {
    public currentPlayer: Player;
    public move: number;
    private readonly board: (Piece | undefined)[][];

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.move = 0;
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(move: Move) {
        const movingPiece = this.getPiece(move.from);
        if (movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(move.to, movingPiece);
            this.setPiece(move.from, undefined);
            movingPiece.postMove(this); // actions specific to this piece
            if (move.special) move.special(movingPiece, this); // actions specific to this move
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            this.move++;
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
