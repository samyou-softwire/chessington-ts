import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from "../../../src/engine/pieces/rook";
import Bishop from "../../../src/engine/pieces/bishop";
import {should} from "chai";

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoveTos(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoveTos(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoveTos(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoveTos(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoveTos(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoveTos(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    describe("white king", () => {
        beforeEach(() => board = new Board(Player.WHITE));

        it('can castle kingside', () => {
            const king = new King(Player.WHITE);
            const rook = new Rook(Player.WHITE);
            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 7), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.deep.include(Square.at(0, 6));
        });

        it('can castle queenside', () => {
            const king = new King(Player.WHITE);
            const rook = new Rook(Player.WHITE);
            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 0), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.deep.include(Square.at(0, 2));
        });

        it('cannot castle kingside if piece in way', () => {
            const king = new King(Player.WHITE);
            const bishop = new Bishop(Player.WHITE);
            const rook = new Rook(Player.WHITE);
            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 5), bishop);
            board.setPiece(Square.at(0, 7), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(0, 6));
        });

        it('cannot castle queenside if piece in way', () => {
            const king = new King(Player.WHITE);
            const bishop = new Bishop(Player.WHITE);
            const rook = new Rook(Player.WHITE);
            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 2), bishop);
            board.setPiece(Square.at(0, 0), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(0, 2));
        });

        it('moves the rook when castling kingside', () => {
            const king = new King(Player.WHITE);
            const rook = new Rook(Player.WHITE);
            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 7), rook);

            const moves = king.getAvailableMoves(board);

            const move = moves.find(move => move.to.equals(Square.at(0, 6)))

            if (move) {
                king.moveTo(board, move);
            }

            const foundRook = board.getPiece(Square.at(0, 5));
            should().exist(foundRook);

            const empty = board.getPiece(Square.at(0, 7));
            should().not.exist(empty);
        });

        it('moves the rook when castling queenside', () => {
            const king = new King(Player.WHITE);
            const rook = new Rook(Player.WHITE);
            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 0), rook);

            const moves = king.getAvailableMoves(board);

            const move = moves.find(move => move.to.equals(Square.at(0, 2)))

            if (move) {
                king.moveTo(board, move);
            }

            const foundRook = board.getPiece(Square.at(0, 3));
            should().exist(foundRook);

            const empty = board.getPiece(Square.at(0, 0));
            should().not.exist(empty);
        });
    });

    describe("black king", () => {
        beforeEach(() => board = new Board(Player.BLACK));

        it('can castle kingside', () => {
            const king = new King(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            board.setPiece(Square.at(7, 4), king);
            board.setPiece(Square.at(7, 7), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.deep.include(Square.at(7, 6));
        });

        it('can castle queenside', () => {
            const king = new King(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            board.setPiece(Square.at(7, 4), king);
            board.setPiece(Square.at(7, 0), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.deep.include(Square.at(7, 2));
        });

        it('cannot castle kingside if piece in way', () => {
            const king = new King(Player.BLACK);
            const bishop = new Bishop(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            board.setPiece(Square.at(7, 4), king);
            board.setPiece(Square.at(7, 5), bishop);
            board.setPiece(Square.at(7, 7), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(7, 6));
        });

        it('cannot castle queenside if piece in way', () => {
            const king = new King(Player.BLACK);
            const bishop = new Bishop(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            board.setPiece(Square.at(7, 4), king);
            board.setPiece(Square.at(7, 2), bishop);
            board.setPiece(Square.at(7, 0), rook);

            const moves = king.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(7, 2));
        });

        it('moves the rook when castling queenside', () => {
            const king = new King(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            board.setPiece(Square.at(7, 4), king);
            board.setPiece(Square.at(7, 7), rook);

            const moves = king.getAvailableMoves(board);

            const move = moves.find(move => move.to.equals(Square.at(7, 6)))

            if (move) {
                king.moveTo(board, move);
            }

            const foundRook = board.getPiece(Square.at(7, 5));
            should().exist(foundRook);

            const empty = board.getPiece(Square.at(7, 7));
            should().not.exist(empty);
        });

        it('moves the rook when castling queenside', () => {
            const king = new King(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            board.setPiece(Square.at(7, 4), king);
            board.setPiece(Square.at(7, 0), rook);

            const moves = king.getAvailableMoves(board);

            const move = moves.find(move => move.to.equals(Square.at(7, 2)))

            if (move) {
                king.moveTo(board, move);
            }

            const foundRook = board.getPiece(Square.at(7, 3));
            should().exist(foundRook);

            const empty = board.getPiece(Square.at(7, 0));
            should().not.exist(empty);
        });
    });
});
