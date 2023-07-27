import { ISaveGame, IGameTileData, IHistory } from "@/data/modelTypes";
import {
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
	updateIsLoadingRed,
} from "../slices/tiktakSlice";
import {
	resetIsSendingDataAction,
	updateIsSendingDataAction,
} from "./newGameAction";
// for next authentication
import { getSession } from "next-auth/react";
// for socket connection
import { appSocket } from "@/socket-io/socket-io";

// ! included
export const getAllSavedGamesAction =
	(allSavedGames: ISaveGame[]) => async (dispatch: any, getState: any) => {
		dispatch(getAllSavedGamesRed({ savedGames: allSavedGames }));
	};
// ! included
export const setSelectedGameAction =
	(game: ISaveGame) => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({ selectedGame: game }));
	};
// ! included
export const unSetSelectedGameAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({ selectedGame: {} as ISaveGame }));
	};
// !included
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

// ! included
export const updateHistoryInDatabaseAction =
	(updatedGame: ISaveGame, nextSession: string) =>
	async (dispatch: any, getState: any) => {
		// const { token } = getState().tikTakToeReducer;

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
					Authorization: "Bearer " + nextSession,
				},
				body: JSON.stringify(bodyData),
			};
			appSocket.on("history updated", (data) => {
				console.log("updateHistoryInDatabaseAction", data);
			});
			const response = await fetch(url, options);

			const data = await response.json();

			if (!response.ok) {
				console.log("updateHistoryInDatabaseAction", data);
				dispatch(resetIsSendingDataAction());
				return;
			}

			// console.log(data);
			const { message, latestUpdateGame } = data;
			return { message, latestUpdateGame };
			// if (message === "history updated") {
			// 	await dispatch(updateSaveGameAction(latestUpdateGame));
			// 	await dispatch(setSelectedGameRed({ selectedGame: latestUpdateGame }));

			// }
		} catch (err) {
			console.log("updateHistoryInDatabaseAction", err);
		}
	};

export const resetTikTakToeReducerAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(resetTikTakRed({}));
	};
