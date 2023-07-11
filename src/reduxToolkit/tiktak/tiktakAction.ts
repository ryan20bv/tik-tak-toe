import { ISaveGame } from "@/data/modelTypes";
import {
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
} from "./tiktakSlice";

export const setSelectedGameAction =
	(game: ISaveGame) => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({ selectedGame: game }));
	};

export const unSetSelectedGameAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({ selectedGame: {} as ISaveGame }));
	};
