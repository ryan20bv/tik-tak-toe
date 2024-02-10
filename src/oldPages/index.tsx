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
		dispatch(getAllSavedGamesAction(allSavedGames))
		dispatch(resetTikTakToeReducerAction())
	}, [dispatch, allSavedGames])

	return <Home savedGames={savedGames} totalSavedGames={totalSavedGames} />
}

export const getServerSideProps = async () => {
	let allSavedGames
	let totalSavedGames
	try {
		const res = await fetch(
			process.env.NEXT_PUBLIC_FRONT_END_URL + '/api/game/getSavedGames'
		)
		const {data} = await res.json()
		const savedData = data.allSavedGames
		totalSavedGames = data.totalSavedGames
		allSavedGames = savedData
	} catch (err) {
		console.log('error fetching ', err)
	}

	return {
		props: {allSavedGames, totalSavedGames}
	}
}

export default HomePage
