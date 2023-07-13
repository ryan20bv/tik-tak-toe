import { createSlice } from "@reduxjs/toolkit";
import { ISaveGame } from "@/data/modelTypes";

interface ITikTakToeState {
	savedGames: ISaveGame[];
	selectedGame: ISaveGame;
}

const initialTikTakState: ITikTakToeState = {
	savedGames: [],
	selectedGame: {} as ISaveGame,
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
	},
});

export const { getAllSavedGamesRed, resetTikTakRed, setSelectedGameRed } =
	tikTakToeSlice.actions;
export default tikTakToeSlice;
