import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';

describe('Pawn', () => {

    let board: Board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {

        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingPiece);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.WHITE);
            const friendlyPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), friendlyPiece);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKing = new King(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingKing);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('can take en passant', () => {
            board = new Board(Player.BLACK);

            const pawn = new Pawn(Player.WHITE);
            const opposingPawn = new Pawn(Player.WHITE);

            board.setPiece(Square.at(4, 5), pawn);
            board.setPiece(Square.at(6, 6), opposingPawn);

            opposingPawn.moveTo(board, Square.at(4, 6)); // move forwards 2 squares

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include({
                to: Square.at(5, 6),
                capture: Square.at(4, 6)
            });
        });

        it('cant take en passant after a move', () => {
            board = new Board(Player.BLACK);

            const pawn = new Pawn(Player.WHITE);
            const opposingPawn = new Pawn(Player.WHITE);
            const king = new King(Player.WHITE);
            const opposingKing = new King(Player.BLACK); // need some extra pieces to waste moves

            board.setPiece(Square.at(4, 5), pawn);
            board.setPiece(Square.at(6, 6), opposingPawn);
            board.setPiece(Square.at(0, 0), king);
            board.setPiece(Square.at(7, 0), opposingKing);

            opposingPawn.moveTo(board, Square.at(4, 6)); // move forwards 2 squares
            king.moveTo(board, Square.at(1, 0));
            opposingKing.moveTo(board, Square.at(6, 0));

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(5, 6));
        });

        it('cant take en passant if no double', () => {
            board = new Board(Player.BLACK);

            const pawn = new Pawn(Player.WHITE);
            const opposingPawn = new Pawn(Player.WHITE);

            board.setPiece(Square.at(4, 5), pawn);
            board.setPiece(Square.at(5, 6), opposingPawn);

            opposingPawn.moveTo(board, Square.at(4, 6)); // move forwards 1 square

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(5, 6));
        });
    });

    describe('black pawns', () => {

        let board: Board;
        beforeEach(() => board = new Board(Player.BLACK));

        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingPiece);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.deep.include(Square.at(3, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.BLACK);
            const friendlyPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), friendlyPiece);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKing = new King(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKing);

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('can take en passant', () => {
            board = new Board(Player.WHITE);

            const pawn = new Pawn(Player.BLACK);
            const opposingPawn = new Pawn(Player.WHITE);

            board.setPiece(Square.at(3, 2), pawn);
            board.setPiece(Square.at(1, 1), opposingPawn);

            opposingPawn.moveTo(board, Square.at(3, 1)); // move forwards 2 squares

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include({
                to: Square.at(2, 1),
                capture: Square.at(3, 1)
            });
        });

        it('cant take en passant after a move', () => {
            board = new Board(Player.WHITE);

            const pawn = new Pawn(Player.BLACK);
            const opposingPawn = new Pawn(Player.WHITE);
            const king = new King(Player.BLACK);
            const opposingKing = new King(Player.WHITE); // need some extra pieces to waste moves

            board.setPiece(Square.at(3, 2), pawn);
            board.setPiece(Square.at(1, 1), opposingPawn);
            board.setPiece(Square.at(7, 7), king);
            board.setPiece(Square.at(0, 7), opposingKing);

            opposingPawn.moveTo(board, Square.at(3, 1)); // move forwards 2 squares
            king.moveTo(board, Square.at(6, 7));
            opposingKing.moveTo(board, Square.at(1, 7));

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(2, 1));
        });

        it('cant take en passant if no double', () => {
            board = new Board(Player.WHITE);

            const pawn = new Pawn(Player.BLACK);
            const opposingPawn = new Pawn(Player.WHITE);

            board.setPiece(Square.at(3, 2), pawn);
            board.setPiece(Square.at(2, 1), opposingPawn);

            opposingPawn.moveTo(board, Square.at(3, 1)); // move forwards 1 square

            const moves = pawn.getAvailableMoveTos(board);

            moves.should.not.deep.include(Square.at(2, 1));
        });
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoveTos(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoveTos(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });
});
