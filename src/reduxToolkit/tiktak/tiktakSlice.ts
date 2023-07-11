import { createSlice } from "@reduxjs/toolkit";
import { ISaveGame } from "@/data/modelTypes";

interface ITikTakToeState {
	savedGames: ISaveGame[];
}

const initialTikTakState: ITikTakToeState = {
	savedGames: [],
};

const tikTakToeSlice = createSlice({
	name: "TikTakToe Slice",
	initialState: initialTikTakState,
	reducers: {
		getAllSavedGamesRed(state, action) {
			state.savedGames = action.payload.savedGames;
		},
		resetTikTakRed(state, action) {
			state.savedGames = [];
		},
	},
});

export const { getAllSavedGamesRed, resetTikTakRed } = tikTakToeSlice.actions;
export default tikTakToeSlice;
