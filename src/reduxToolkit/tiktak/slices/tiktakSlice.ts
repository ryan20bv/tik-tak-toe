import { createSlice } from "@reduxjs/toolkit";
import { ISaveGame, ISendingData } from "@/data/modelTypes";

interface ITikTakToeState {
	isLoadingSavedGame: boolean;
	savedGames: ISaveGame[];
	selectedGame: ISaveGame;
	isSendingData: ISendingData;
}

const initialTikTakState: ITikTakToeState = {
	isLoadingSavedGame: false,
	savedGames: [],
	selectedGame: {} as ISaveGame,
	isSendingData: {
		status: false,
		message: "",
	},
	// token: "",
};
const tikTakToeSlice = createSlice({
	name: "TikTakToe Slice",
	initialState: initialTikTakState,
	reducers: {
		updateIsLoadingRed(state, action) {
			state.isLoadingSavedGame = action.payload.isLoadingStatus;
		},
		// !included
		getAllSavedGamesRed(state, action) {
			state.savedGames = action.payload.savedGames;
		},
		// !included
		setSelectedGameRed(state, action) {
			state.selectedGame = action.payload.selectedGame;
		},
		// !included
		resetTikTakRed(state, action) {
			state.isLoadingSavedGame = false;
			// state.savedGames = [];
			// state.selectedGame = {} as ISaveGame;
			state.isSendingData = {
				status: false,
				message: "",
			};
		},
		// !included
		updateSendingDataRed(state, action) {
			state.isSendingData = action.payload.sendingDataStatus;
		},
	},
});

export const {
	updateIsLoadingRed,
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
	updateSendingDataRed,
} = tikTakToeSlice.actions;
export default tikTakToeSlice;
