import { ISaveGame, IGameTileData, IHistory } from "@/data/modelTypes";
import {
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
	updateGameMessageRed,
	updateIsLoadingRed,
} from "../slices/tiktakSlice";
// for socket connection
import { appSocket } from "@/socket-io/socket-io";

export const getAllSavedGamesAction =
	(allSavedGames: ISaveGame[]) => async (dispatch: any, getState: any) => {
		// try {
		// 	const bodyData = {};
		// 	const url =
		// 		process.env.NEXT_PUBLIC_BACK_END_URL + "/api/tiktaktoe/game/allGames";
		// 	const options = {
		// 		method: "GET",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	};

		// 	const response = await fetch(url, options);

		// 	console.log(response);
		// 	const data = await response.json();
		// 	console.log(data);
		// 	dispatch(getAllSavedGamesRed({ savedGames: data.allSavedGames }));
		// } catch (err) {
		// 	console.log(err);
		// 	console.log("getAllSavedGamesAction");
		// }
		dispatch(getAllSavedGamesRed({ savedGames: allSavedGames }));
	};
export const setSelectedGameAction =
	(game: ISaveGame) => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({ selectedGame: game }));
	};

export const unSetSelectedGameAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({ selectedGame: {} as ISaveGame }));
	};

export const updateSaveGameAction =
	(updatedSelectedGame: ISaveGame) => async (dispatch: any, getState: any) => {
		const { savedGames } = getState().tikTakToeReducer;
		// console.log(updatedSelectedGame);
		const foundGameIndex = savedGames.findIndex(
			(item: ISaveGame) => item._id === updatedSelectedGame._id
		);
		// console.log(foundGameIndex);
		if (foundGameIndex < 0) {
			return;
		}

		const updatedSaveGame = [...savedGames];
		updatedSaveGame[foundGameIndex] = updatedSelectedGame;

		dispatch(getAllSavedGamesRed({ savedGames: updatedSaveGame }));
	};

export const updateSelectedGameHistoryAction =
	(tileData: IGameTileData) => async (dispatch: any, getState: any) => {
		const { selectedGame } = getState().tikTakToeReducer;
		const { playerTurn, history } = selectedGame;
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
		// dispatch(updateHistoryInDatabaseAction(copyOfSelectedGame));
		const data = await dispatch(
			updateHistoryInDatabaseAction(copyOfSelectedGame)
		);

		const { message, latestUpdateGame } = data;

		if (message === "history updated") {
			await dispatch(updateSaveGameAction(latestUpdateGame));
			await dispatch(setSelectedGameRed({ selectedGame: latestUpdateGame }));
			dispatch(checkIfThereIsAWinnerAction(latestUpdateGame));
		}
		// await dispatch(setSelectedGameRed({ selectedGame: copyOfSelectedGame }));
		// dispatch(checkIfThereIsAWinnerAction(copyOfSelectedGame));
	};

export const updateHistoryInDatabaseAction =
	(updatedGame: ISaveGame) => async (dispatch: any, getState: any) => {
		// const { selectedGame } = getState().tikTakToeReducer;
		try {
			const bodyData = {
				updatedGame,
			};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/tiktaktoe/history/update/" +
				updatedGame._id;
			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);
			appSocket.on("history updated", (data) => {
				console.log("updateHistoryInDatabaseAction", data);
			});
			const data = await response.json();
			if (!response.ok) {
				console.log("updateHistoryInDatabaseAction", data);
				return;
			}

			// console.log(data);
			const { message, latestUpdateGame } = data;
			return { message, latestUpdateGame };
			// if (message === "history updated") {
			// 	await dispatch(updateSaveGameAction(latestUpdateGame));
			// 	await dispatch(setSelectedGameRed({ selectedGame: latestUpdateGame }));
			// 	dispatch(checkIfThereIsAWinnerAction(latestUpdateGame));
			// }
		} catch (err) {
			console.log("updateHistoryInDatabaseAction", err);
		}
	};

export const checkIfThereIsAWinnerAction =
	(updatedSelectedGame: ISaveGame) => async (dispatch: any, getState: any) => {
		const hasWinner: boolean = await dispatch(
			lookForThreeSameTilesAction(updatedSelectedGame.history.gameHistory)
		);
		// console.log("hasWinner", hasWinner);
		if (!hasWinner) {
			dispatch(checkIfAllTilesAreFilled(updatedSelectedGame.history.gameHistory));
		}
	};

export const lookForThreeSameTilesAction =
	(gameHistory: IGameTileData[][]) => async (dispatch: any, getState: any) => {
		// check for horizontal winner
		let message: string = `Player 1 WIN  "X" `;
		let item: string = "";
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
			return false;
		}
		if (item === "O") {
			message = `Player 2 WIN  "O" `;
		}
		dispatch(updatePlayerWinAction(item));
		dispatch(
			updateGameMessageRed({
				gameMessage: message,
				isGameMessageOpen: true,
			})
		);

		return true;
	};

export const updatePlayerWinAction =
	(item: string) => async (dispatch: any, getState: any) => {
		const { selectedGame } = getState().tikTakToeReducer;

		const copyOfSelectedGame: ISaveGame = { ...selectedGame };
		if (item === "X") {
			let updatePlayer1Win = {
				...selectedGame.player1,
				win: selectedGame.player1.win + 1,
			};
			copyOfSelectedGame.player1 = updatePlayer1Win;
		} else if (item === "O") {
			// update player 2 win
			let updatePlayer2Win = {
				...selectedGame.player2,
				win: selectedGame.player2.win + 1,
			};

			copyOfSelectedGame.player2 = updatePlayer2Win;
		}
		copyOfSelectedGame.gameIsDone = true;
		// dispatch(updateHistoryInDatabaseAction(copyOfSelectedGame));
		// await dispatch(updateSaveGameAction(copyOfSelectedGame));
		// dispatch(setSelectedGameRed({ selectedGame: copyOfSelectedGame }));
		const data = await dispatch(
			updateHistoryInDatabaseAction(copyOfSelectedGame)
		);

		const { message, latestUpdateGame } = data;

		if (message === "history updated") {
			await dispatch(updateSaveGameAction(latestUpdateGame));
			dispatch(setSelectedGameRed({ selectedGame: latestUpdateGame }));
			// dispatch(checkIfThereIsAWinnerAction(latestUpdateGame));
		}
	};

export const checkIfAllTilesAreFilled =
	(gameHistory: IGameTileData[][]) => async (dispatch: any, getState: any) => {
		const { selectedGame } = getState().tikTakToeReducer;
		for (const row of gameHistory) {
			for (const cell of row) {
				if (!cell.filled) {
					return false;
				}
			}
		}
		let gameMessage: string = "it's a DRAW";
		dispatch(
			updateGameMessageRed({
				gameMessage: gameMessage,
				isGameMessageOpen: true,
			})
		);
		// console.log("Game is DRAW");
		// // need to update the draw
		// console.log(selectedGame.draw);
		let updatedDraw = selectedGame.draw + 1;
		const copyOfSelectedGame: ISaveGame = { ...selectedGame };
		copyOfSelectedGame.draw = updatedDraw;
		copyOfSelectedGame.gameIsDone = true;
		// dispatch(updateHistoryInDatabaseAction(copyOfSelectedGame));
		// await dispatch(updateSaveGameAction(copyOfSelectedGame));
		// dispatch(setSelectedGameRed({ selectedGame: copyOfSelectedGame }));
		const data = await dispatch(
			updateHistoryInDatabaseAction(copyOfSelectedGame)
		);

		const { message, latestUpdateGame } = data;

		if (message === "history updated") {
			await dispatch(updateSaveGameAction(latestUpdateGame));
			dispatch(setSelectedGameRed({ selectedGame: latestUpdateGame }));
			// dispatch(checkIfThereIsAWinnerAction(latestUpdateGame));
		}
		return;
	};

export const updateGameMessageAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(
			updateGameMessageRed({
				gameMessage: "",
				isGameMessageOpen: false,
			})
		);
	};
