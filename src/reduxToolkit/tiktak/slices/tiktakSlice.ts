import { createSlice } from "@reduxjs/toolkit";
import { ISaveGame } from "@/data/modelTypes";

interface ITikTakToeState {
	isLoadingSavedGame: boolean;
	savedGames: ISaveGame[];
	selectedGame: ISaveGame;
	gameMessage: string;
	isGameMessageOpen: boolean;
}

const initialTikTakState: ITikTakToeState = {
	isLoadingSavedGame: false,
	savedGames: [],
	selectedGame: {} as ISaveGame,
	gameMessage: "",
	isGameMessageOpen: false,
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
			state.gameMessage = "";
			state.isGameMessageOpen = false;
		},
		updateGameMessageRed(state, action) {
			state.gameMessage = action.payload.gameMessage;
			state.isGameMessageOpen = action.payload.isGameMessageOpen;
		},
	},
});

export const {
	updateIsLoadingRed,
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
	updateGameMessageRed,
} = tikTakToeSlice.actions;
export default tikTakToeSlice;
