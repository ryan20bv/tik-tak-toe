import { ISaveGame, IGameTileData, IHistory } from "@/data/modelTypes";
import {
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
} from "./tiktakSlice";

export const getAllSavedGamesAction =
	(savedGames: ISaveGame[]) => async (dispatch: any, getState: any) => {
		dispatch(getAllSavedGamesRed({ savedGames: savedGames }));
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

		const { message } = await dispatch(
			updateHistoryInDatabaseAction(copyOfHistory)
		);
		console.log(message);
		if (message === "history updated") {
			await dispatch(updateSaveGameAction(copyOfSelectedGame));
			await dispatch(setSelectedGameRed({ selectedGame: copyOfSelectedGame }));
			dispatch(checkIfThereIsAWinnerAction(copyOfSelectedGame));
		}
	};

export const updateHistoryInDatabaseAction =
	(updatedHistory: IHistory) => async (dispatch: any, getState: any) => {
		const { selectedGame } = getState().tikTakToeReducer;
		try {
			const bodyData = {
				newHistory: updatedHistory,
			};
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				"/api/tiktaktoe/history/update/" +
				selectedGame._id;
			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyData),
			};

			const response = await fetch(url, options);

			const data = await response.json();
			if (!response.ok) {
				console.log("updateHistoryInDatabaseAction", data);
				return;
			}
			// console.log(data);
			return { message: data.message };
		} catch (err) {
			console.log("updateHistoryInDatabaseAction", err);
		}
	};

export const checkIfThereIsAWinnerAction =
	(updatedSelectedGame: ISaveGame) => async (dispatch: any, getState: any) => {
		const areAllTilesFilled: boolean = await dispatch(
			checkIfAllTilesAreFilled(updatedSelectedGame.history.gameHistory)
		);
		console.log(areAllTilesFilled);
		if (areAllTilesFilled) {
			// game is DRAW
			console.log("Game is DRAW");
			return;
		}
	};

export const checkIfAllTilesAreFilled =
	(gameHistory: IGameTileData[][]) => async (dispatch: any, getState: any) => {
		for (const row of gameHistory) {
			for (const cell of row) {
				if (!cell.filled) {
					return false;
				}
			}
		}
		return true;
	};
