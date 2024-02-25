import React, {useEffect, useState} from 'react'

import Home from '@/components/home/Home'

import {ISaveGame} from '@/data/modelTypes'
// for redux purposes
import {
	useAppDispatch,
	useAppSelector,
	RootState
} from '@/reduxToolkit/indexStore/indexStore'
import {
	getAllSavedGamesAction,
	resetTikTakToeReducerAction
} from '@/reduxToolkit/tiktak/actions/tiktakAction'

interface PropsType {
	allSavedGames: ISaveGame[]
	totalSavedGames: number
}

const HomePage: React.FC<PropsType> = ({allSavedGames, totalSavedGames}) => {
	const dispatch = useAppDispatch()
	const {savedGames} = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	)

	useEffect(() => {
		localStorage.removeItem('persist:root')
	}, [])

	useEffect(() => {
		dispatch(getAllSavedGamesAction(allSavedGames, totalSavedGames))
		dispatch(resetTikTakToeReducerAction())
	}, [dispatch, allSavedGames, totalSavedGames])

	return <Home savedGames={savedGames} totalSavedGames={totalSavedGames} />
}

export const getServerSideProps = async () => {
	let allSavedGames
	let totalSavedGames
	try {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// Add any other headers if needed
			},
			body: JSON.stringify({page: 1})
		}
		const resPerPage = await fetch(
			process.env.NEXT_PUBLIC_FRONT_END_URL + '/api/game/getSavedGamesPerPage',
			options
		)
		// console.log('### resPerPage: ', await resPerPage.json())
		const data = await resPerPage.json()
		const {totalSavedGames: total, savedGames} = data
		totalSavedGames = total
		allSavedGames = savedGames
		// this is for all saved games
		/* const res = await fetch(
			process.env.NEXT_PUBLIC_FRONT_END_URL + '/api/game/getSavedGames'
		)
		const {totalSavedGames: total, allSavedGames: savedData} = await res.json()
		totalSavedGames = total || 0
		allSavedGames = savedData || [] */
	} catch (err) {
		console.log('error fetching ', err)
	}

	return {
		props: {allSavedGames, totalSavedGames}
	}
}

export default HomePage
