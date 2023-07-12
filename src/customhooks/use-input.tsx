// function checkWinner() {
// 	// Check rows
// 	for (let row = 0; row < 3; row++) {
// 		if (
// 			board[row][0] !== "" &&
// 			board[row][0] === board[row][1] &&
// 			board[row][1] === board[row][2]
// 		) {
// 			alert(`${board[row][0]} wins!`);
// 			resetBoard();
// 			return;
// 		}
// 	}

// 	// Check columns
// 	for (let col = 0; col < 3; col++) {
// 		if (
// 			board[0][col] !== "" &&
// 			board[0][col] === board[1][col] &&
// 			board[1][col] === board[2][col]
// 		) {
// 			alert(`${board[0][col]} wins!`);
// 			resetBoard();
// 			return;
// 		}
// 	}

// 	// Check diagonals
// 	if (
// 		(board[0][0] !== "" &&
// 			board[0][0] === board[1][1] &&
// 			board[1][1] === board[2][2]) ||
// 		(board[0][2] !== "" &&
// 			board[0][2] === board[1][1] &&
// 			board[1][1] === board[2][0])
// 	) {
// 		alert(`${board[1][1]} wins!`);
// 		resetBoard();
// 		return;
// 	}

// 	// Check for a draw
// 	if (isBoardFull()) {
// 		alert("It's a draw!");
// 		resetBoard();
// 	}
// }
