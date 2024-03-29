import axios from 'axios'
import {ISaveGame} from '@/data/modelTypes'
import {
	getAllSavedGamesRed,
	resetTikTakRed,
	setSelectedGameRed,
	updateDataAsPageChangeRed
} from '../slices/tiktakSlice'
import {resetIsSendingDataAction} from './newGameAction'

// ! included
export const getAllSavedGamesAction =
	(allSavedGames: ISaveGame[], totalSavedGames: number) =>
	async (dispatch: any, getState: any) => {
		dispatch(getAllSavedGamesRed({savedGames: allSavedGames, totalSavedGames}))
	}
// ! included
export const setSelectedGameAction =
	(game: ISaveGame) => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({selectedGame: game}))
	}
// ! included
export const unSetSelectedGameAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(setSelectedGameRed({selectedGame: {} as ISaveGame}))
	}
// !included
export const updateSaveGameAction =
	(updatedSelectedGame: ISaveGame) => async (dispatch: any, getState: any) => {
		const {savedGames} = getState().tikTakToeReducer
		const foundGameIndex = savedGames.findIndex(
			(item: ISaveGame) => item._id === updatedSelectedGame._id
		)
		if (foundGameIndex < 0) {
			return
		}

		const updatedSaveGame = [...savedGames]
		updatedSaveGame[foundGameIndex] = updatedSelectedGame

		dispatch(getAllSavedGamesRed({savedGames: updatedSaveGame}))
	}

// ! included
export const updateHistoryInDatabaseAction =
	(updatedGame: ISaveGame, nextSession: string) =>
	async (dispatch: any, getState: any) => {
		try {
			const bodyData = {
				updatedGame
			}
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				'/api/tiktaktoe/history/update/' +
				updatedGame._id
			const options = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + nextSession
				},
				body: JSON.stringify(bodyData)
			}

			const response = await fetch(url, options)

			const data = await response.json()

			if (!response.ok) {
				console.log('updateHistoryInDatabaseAction', data)
				dispatch(resetIsSendingDataAction())
				return
			}

			const {message, latestUpdateGame} = data
			return {message, latestUpdateGame}
		} catch (err) {
			console.log('updateHistoryInDatabaseAction', err)
		}
	}

export const resetTikTakToeReducerAction =
	() => async (dispatch: any, getState: any) => {
		dispatch(resetTikTakRed({}))
	}

export const confirmDeleteGameAction =
	(gameToDelete: ISaveGame, password: string) =>
	async (dispatch: any, getState: any) => {
		try {
			const bodyData = {
				// game_id: gameToDelete._id,
				password: password
			}
			const url =
				process.env.NEXT_PUBLIC_BACK_END_URL +
				'/api/tiktaktoe/game/' +
				gameToDelete._id
			const options = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bodyData)
			}

			const response = await fetch(url, options)

			const data = await response.json()

			return data
		} catch (err) {
			console.log('confirm delete', err)
		}
	}

export const deleteFromSavedGamesAction =
	(gameToDelete: ISaveGame) => async (dispatch: any, getState: any) => {
		const {savedGames, totalSavedGames} = getState().tikTakToeReducer
		const copyOfSavedGames = savedGames.map((eachGame: ISaveGame) => eachGame)
		const updatedTotalSavedGames = totalSavedGames - 1
		const filteredSavedGames = copyOfSavedGames.filter(
			(eachGame: ISaveGame) => eachGame._id !== gameToDelete._id
		)

		dispatch(getAllSavedGamesAction(filteredSavedGames, updatedTotalSavedGames))
	}

export const updateDataAsPageChangeAction =
	(value: number) => async (dispatch: any, getState: any) => {
		try {
			// get all games
			const response = await axios.post(
				process.env.NEXT_PUBLIC_BACK_END_URL + '/api/tiktaktoe/game/pagination',
				{page: value}
			)

			const {savedGames, totalSavedGames} = response.data
			if (response.status !== 200) {
				return
			}
			dispatch(
				updateDataAsPageChangeRed({currPage: value, savedGames, totalSavedGames})
			)
		} catch (err) {
			console.log(err)
		}

		// const copyOfSavedGames = savedGames.map((eachGame: ISaveGame) => eachGame)
		// const updatedTotalSavedGames = totalSavedGames - 1
		// const filteredSavedGames = copyOfSavedGames.filter(
		// 	(eachGame: ISaveGame) => eachGame._id !== gameToDelete._id
		// )
	}
