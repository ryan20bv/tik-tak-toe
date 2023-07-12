import { ISaveGame, IGameTileData } from "@/data/modelTypes";
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
			(item: ISaveGame) => item.id === updatedSelectedGame.id
		);
		console.log(foundGameIndex);
		if (foundGameIndex < 0) {
			return;
		}
		console.log(savedGames);
		const updatedSaveGame = [...savedGames];
		updatedSaveGame[foundGameIndex] = updatedSelectedGame;
		console.log(updatedSaveGame);
		dispatch(getAllSavedGamesRed({ savedGames: updatedSaveGame }));
	};

export const updateSelectedGameHistoryAction =
	(tileData: IGameTileData) => async (dispatch: any, getState: any) => {
		const { selectedGame } = getState().tikTakToeReducer;

		const { playerTurn, gameHistory } = selectedGame;
		let newItem: string = "";
		let newPlayerTurn: string = playerTurn;
		if (playerTurn === "1") {
			newItem = "X";
			newPlayerTurn = "2";
		} else if (playerTurn === "2") {
			newItem = "O";
			newPlayerTurn = "1";
		}
		const separatedId = tileData.id.split("-");
		const rowIndex = +separatedId[0] - 1; // "2"
		const colIndex = +separatedId[1] - 1; // "1"
		const newTileData: IGameTileData = {
			id: tileData.id,
			filled: true,
			item: newItem,
		};
		const copyOfGameHistory: IGameTileData[][] = gameHistory.map(
			(rowTile: IGameTileData[]) => {
				return rowTile.map((eachTile: IGameTileData) => {
					return eachTile;
				});
			}
		);

		copyOfGameHistory[rowIndex][colIndex] = { ...newTileData };
		const copyOfSelectedGame: ISaveGame = { ...selectedGame };
		copyOfSelectedGame.gameHistory = [...copyOfGameHistory];
		copyOfSelectedGame.playerTurn = newPlayerTurn;
		await dispatch(updateSaveGameAction(copyOfSelectedGame));
		dispatch(setSelectedGameRed({ selectedGame: copyOfSelectedGame }));
	};
