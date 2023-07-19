import { ISaveGame, IGameTileData, IHistory } from "@/data/modelTypes";
const useGameUpdate = (selectedGame: ISaveGame) => {
	const { draw, gameIsDone, history, player1, player2, playerTurn, _id } =
		selectedGame;
	const clickTileHandler = (tileData: IGameTileData) => {
		let newItem: string = "";
		let newPlayerTurn: string = playerTurn;
		if (playerTurn === "1") {
			newItem = "X";
			newPlayerTurn = "2";
		} else if (playerTurn === "2") {
			newItem = "O";
			newPlayerTurn = "1";
		}
		const separatedId = tileData.tile_id.split("-");
		const rowIndex = +separatedId[0] - 1; // "2"
		const colIndex = +separatedId[1] - 1; // "1"
		const newTileData: IGameTileData = {
			tile_id: tileData.tile_id,
			filled: true,
			item: newItem,
		};
		const copyOfHistory: IHistory = { ...history };
		const copyOfGameHistory: IGameTileData[][] = history.gameHistory.map(
			(rowTile: IGameTileData[]) => {
				return rowTile.map((eachTile: IGameTileData) => {
					return eachTile;
				});
			}
		);

		copyOfGameHistory[rowIndex][colIndex] = { ...newTileData };
		copyOfHistory.gameHistory = copyOfGameHistory;
		const copyOfSelectedGame: ISaveGame = { ...selectedGame };
		copyOfSelectedGame.history = { ...copyOfHistory };

		copyOfSelectedGame.playerTurn = newPlayerTurn;
		const { hasWinner, message, item } = checkIfThereIsAWinner(
			copyOfSelectedGame.history.gameHistory
		);

		if (hasWinner) {
			if (item === "X") {
				let updatePlayer1Win = {
					...copyOfSelectedGame.player1,
					win: copyOfSelectedGame.player1.win + 1,
				};
				copyOfSelectedGame.player1 = updatePlayer1Win;
			} else if (item === "O") {
				// update player 2 win
				let updatePlayer2Win = {
					...copyOfSelectedGame.player2,
					win: copyOfSelectedGame.player2.win + 1,
				};
				copyOfSelectedGame.player2 = updatePlayer2Win;
			}
			copyOfSelectedGame.gameMessage = message;
			copyOfSelectedGame.gameIsDone = true;
		}
		return { updatedSelectedGame: copyOfSelectedGame };
	};

	const checkIfThereIsAWinner = (latestGameHistory: IGameTileData[][]) => {
		let gameHasWinner,
			gameMessage = "",
			gameItem = "",
			gameIsTie = false;
		const { hasWinner, message, item } =
			lookForThreeSameTilesAction(latestGameHistory);

		// console.log("hasWinner", hasWinner);
		gameHasWinner = hasWinner;
		gameMessage = message;
		gameItem = item;

		if (!gameHasWinner) {
			gameIsTie = checkIfAllTilesAreFilled(latestGameHistory);
		}
		if (gameIsTie) {
			gameMessage = "it's a DRAW";
		}

		return { gameHasWinner, message, item, gameIsTie };
	};

	const checkIfAllTilesAreFilled = (gameHistory: IGameTileData[][]) => {
		for (const row of gameHistory) {
			for (const cell of row) {
				if (!cell.filled) {
					return false;
				}
			}
		}
		return true;
	};

	const lookForThreeSameTilesAction = (gameHistory: IGameTileData[][]) => {
		let message: string = `Player 1 WIN  "X" `;
		let item: string = "";
		// check for horizontal winner
		for (let row = 0; row < 3; row++) {
			if (
				gameHistory[row][0].item === gameHistory[row][1].item &&
				gameHistory[row][0].item === gameHistory[row][2].item &&
				gameHistory[row][1].item === gameHistory[row][2].item &&
				gameHistory[row][0].item !== ""
			) {
				item = gameHistory[row][0].item;
			}
		}
		// check for vertical winner
		for (let col = 0; col < 3; col++) {
			if (
				gameHistory[0][col].item === gameHistory[1][col].item &&
				gameHistory[0][col].item === gameHistory[2][col].item &&
				gameHistory[1][col].item === gameHistory[2][col].item &&
				gameHistory[0][col].item !== ""
			) {
				item = gameHistory[0][col].item;
			}
		}
		// check for diagonal winner
		if (
			(gameHistory[0][0].item === gameHistory[1][1].item &&
				gameHistory[0][0].item === gameHistory[2][2].item &&
				gameHistory[1][1].item === gameHistory[2][2].item &&
				gameHistory[1][1].item !== "") ||
			(gameHistory[0][2].item === gameHistory[1][1].item &&
				gameHistory[0][2].item === gameHistory[2][0].item &&
				gameHistory[1][1].item === gameHistory[2][0].item &&
				gameHistory[1][1].item !== "")
		) {
			item = gameHistory[1][1].item;
		}

		if (!item || item === "") {
			return { hasWinner: false, message: "", item };
		}
		if (item === "O") {
			message = `Player 2 WIN  "O" `;
		}

		return { hasWinner: true, message: message, item };
	};

	return { clickTileHandler };
};
export default useGameUpdate;
