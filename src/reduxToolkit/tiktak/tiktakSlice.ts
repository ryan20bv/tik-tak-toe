import { createSlice } from "@reduxjs/toolkit";
import { ISaveGame } from "@/data/modelTypes";

interface ITikTakToeState {
	savedGames: ISaveGame[];
	selectedGame: ISaveGame;
	gameMessage: string;
	isGameMessageOpen: boolean;
}

const initialTikTakState: ITikTakToeState = {
	savedGames: [],
	selectedGame: {} as ISaveGame,
	gameMessage: "",
	isGameMessageOpen: false,
};

const tikTakToeSlice = createSlice({
	name: "TikTakToe Slice",
	initialState: initialTikTakState,
	reducers: {
		getAllSavedGamesRed(state, action) {
			state.savedGames = action.payload.savedGames;
		},
		setSelectedGameRed(state, action) {
			state.selectedGame = action.payload.selectedGame;
		},
		resetTikTakRed(state, action) {
			state.savedGames = [];
		},
		updateGameMessageRed(state, action) {
			state.gameMessage = action.payload.gameMessage;
			state.isGameMessageOpen = action.payload.isGameMessageOpen;
		},
	},
});

export const {
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
	updateGameMessageRed,
} = tikTakToeSlice.actions;
export default tikTakToeSlice;
