import { createSlice } from "@reduxjs/toolkit";
import { ISaveGame } from "@/data/modelTypes";

interface ITikTakToeState {
	isLoadingSavedGame: boolean;
	savedGames: ISaveGame[];
	selectedGame: ISaveGame;
}

const initialTikTakState: ITikTakToeState = {
	isLoadingSavedGame: false,
	savedGames: [],
	selectedGame: {} as ISaveGame,
};

const tikTakToeSlice = createSlice({
	name: "TikTakToe Slice",
	initialState: initialTikTakState,
	reducers: {
		updateIsLoadingRed(state, action) {
			state.isLoadingSavedGame = action.payload.isLoadingStatus;
		},
		getAllSavedGamesRed(state, action) {
			state.savedGames = action.payload.savedGames;
		},
		setSelectedGameRed(state, action) {
			state.selectedGame = action.payload.selectedGame;
		},
		resetTikTakRed(state, action) {
			state.isLoadingSavedGame = false;
			state.savedGames = [];
			state.selectedGame = {} as ISaveGame;
		},
	},
});

export const {
	updateIsLoadingRed,
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
} = tikTakToeSlice.actions;
export default tikTakToeSlice;
