import {createSlice} from '@reduxjs/toolkit'
import {ISaveGame, ISendingData} from '@/data/modelTypes'

interface ITikTakToeState {
	currPage: number
	totalSavedGames: number
	isLoadingSavedGame: boolean
	savedGames: ISaveGame[]
	selectedGame: ISaveGame
	isSendingData: ISendingData
}

const initialTikTakState: ITikTakToeState = {
	currPage: 1,
	totalSavedGames: 0,
	isLoadingSavedGame: false,
	savedGames: [],
	selectedGame: {} as ISaveGame,
	isSendingData: {
		status: false,
		message: ''
	}
	// token: "",
}
const tikTakToeSlice = createSlice({
	name: 'TikTakToe Slice',
	initialState: initialTikTakState,
	reducers: {
		updateIsLoadingRed(state, action) {
			state.isLoadingSavedGame = action.payload.isLoadingStatus
		},
		// !included
		getAllSavedGamesRed(state, action) {
			;(state.savedGames = action.payload.savedGames),
				(state.totalSavedGames = action.payload.totalSavedGames)
		},
		// !included
		setSelectedGameRed(state, action) {
			state.selectedGame = action.payload.selectedGame
		},
		// !included
		resetTikTakRed(state, action) {
			state.currPage = 1
			state.isLoadingSavedGame = false
			state.isSendingData = {
				status: false,
				message: ''
			}
			state.selectedGame = {} as ISaveGame
		},
		// !included
		updateSendingDataRed(state, action) {
			state.isSendingData = action.payload.sendingDataStatus
		},
		updateDataAsPageChangeRed(state, action) {
			state.currPage = action.payload.currPage
			state.savedGames = action.payload.savedGames
			state.totalSavedGames = action.payload.totalSavedGames
		}
	}
})

export const {
	updateIsLoadingRed,
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
	updateSendingDataRed,
	updateDataAsPageChangeRed
} = tikTakToeSlice.actions
export default tikTakToeSlice
