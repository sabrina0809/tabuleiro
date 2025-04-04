document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');

 
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 1) {
                square.classList.add('black');
            }
            chessboard.appendChild(square);
        }
    }

    const pieces = [
        { color: 'white', position: { row: 1, col: 0 } },
        { color: 'white', position: { row: 1, col: 1 } },
        { color: 'black', position: { row: 6, col: 0 } },
        { color: 'black', position: { row: 6, col: 1 } }

    ];

    pieces.forEach(piece => {
        const pieceDiv = document.createElement('div');
        pieceDiv.classList.add('piece', piece.color);
        pieceDiv.dataset.row = piece.position.row;
        pieceDiv.dataset.col = piece.position.col;
        const square = chessboard.children[piece.position.row * 8 + piece.position.col];
        square.appendChild(pieceDiv);

        pieceDiv.addEventListener('click', (e) => {
            const selectedPiece = e.target;
            chessboard.addEventListener('click', (event) => {
                const targetSquare = event.target;

                if (targetSquare.classList.contains('square')) {
                    const targetRow = Math.floor(Array.from(chessboard.children).indexOf(targetSquare) / 8);
                    const targetCol = Array.from(chessboard.children).indexOf(targetSquare) % 8;

                    if (isValidMove(selectedPiece, targetRow, targetCol)) {
                        targetSquare.appendChild(selectedPiece);
                    }
                }
            });
        });
    });

    function isValidMove(piece, targetRow, targetCol) {
        const currentRow = parseInt(piece.dataset.row);
        const currentCol = parseInt(piece.dataset.col);

        if (piece.classList.contains('white') && targetRow === currentRow + 1 && targetCol === currentCol) {
            return true;
        }

        if (piece.classList.contains('black') && targetRow === currentRow - 1 && targetCol === currentCol) {
            return true;
        }

        return false;
    }
});
