import React, {useEffect, useState} from 'react'
import {Icon} from '@iconify/react'

import GameBoard from './GameBoard'
import PlayersInfo from './PlayersInfo'
import GameNotification from '../ui/GameNotification'

import {useRouter} from 'next/router'
import UiPortal from '../ui/UiPortal'
// for redux purposes
import {
	useAppDispatch,
	RootState,
	useAppSelector
} from '@/reduxToolkit/indexStore/indexStore'
import {
	updateHistoryInDatabaseAction,
	resetTikTakToeReducerAction
} from '@/reduxToolkit/tiktak/actions/tiktakAction'
import {resetBoardHistoryInDatabaseAction} from '@/reduxToolkit/tiktak/actions/historyAction'
import {
	updateIsSendingDataAction,
	resetIsSendingDataAction
} from '@/reduxToolkit/tiktak/actions/newGameAction'

// for next authentication
import {getSession} from 'next-auth/react'
import {signOut} from 'next-auth/react'
const SpecificGame = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {selectedGame, isSendingData} = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	)
	const [isFetchingData, setIsFetchingData] = useState<boolean>(true)
	const [nextSession, setNextSession] = useState<string>('')

	useEffect(() => {
		dispatch(resetIsSendingDataAction())
		const checkForSession = async () => {
			setIsFetchingData(true)
			const session = await getSession()
			if (!session) {
				setNextSession('')
				router.push('/')
			} else {
				const data: any = session.user?.name

				setNextSession(data.token)
				setIsFetchingData(false)
			}
		}

		checkForSession()
	}, [router, dispatch])

	const stopGameHandler = async () => {
		dispatch(updateIsSendingDataAction({status: true, message: 'Saving Data...'}))
		const result = await dispatch(
			updateHistoryInDatabaseAction(selectedGame, nextSession)
		)

		if (result?.message === 'history updated') {
			setIsFetchingData(true)
			setNextSession('')
			signOut()
			dispatch(resetIsSendingDataAction())
		}
	}

	const resetBoardHandler = async () => {
		dispatch(
			updateIsSendingDataAction({status: true, message: 'Starting New Game...'})
		)
		const result = await dispatch(
			resetBoardHistoryInDatabaseAction(selectedGame, nextSession)
		)
		if (result?.message === 'reset history') {
			dispatch(resetIsSendingDataAction())
		}
	}
	const addedInfo = selectedGame.playerTurn === '1' ? `" X "` : `" O "`
	const spanColor =
		selectedGame.playerTurn === '1' ? 'text-blue-600' : 'text-yellow-500'

	if (isFetchingData) {
		return (
			<div className='flex justify-center items-center mt-36'>
				<Icon icon='eos-icons:bubble-loading' className='h-20 w-20' />
			</div>
		)
	}

	const renderedIcon =
		selectedGame.playerTurn === '1' ? (
			<Icon icon='icomoon-free:cross' className='h-10 w-10 text-[#2C91DA]' />
		) : (
			<Icon icon='fa-solid:dot-circle' className='h-10 w-10 text-[#49CF33]' />
		)

	if (!isFetchingData) {
		return (
			<main className=' mt-6'>
				{!selectedGame.gameIsDone && (
					<>
						<section className='text-right md:w-3/6 m-auto max-w-xl'>
							<button
								className='border border-[#2C91DA] bg-[#2C91DA] text-gray-100 px-4 rounded-lg text-lg'
								onClick={stopGameHandler}
							>
								Save
							</button>
						</section>
						<section className='my-6 flex justify-center items-end border-b-2 border-black w-min m-auto'>
							{renderedIcon}
							<h1 className='text-2xl font-semibold ml-4'> TURN</h1>
						</section>
					</>
				)}
				{selectedGame.gameIsDone && (
					<div>
						<h1>{selectedGame.gameMessage.replace(/"([^"]*)"/, '').trim()}</h1>
					</div>
				)}

				<div className='m-auto'>
					<GameBoard selectedGame={selectedGame} nextSession={nextSession} />
				</div>

				{/* {!selectedGame.gameIsDone && (
					<div className=' my-4 flex justify-center'>
						<button className='bg-red-400 ' onClick={stopGameHandler}>
							Stop
						</button>
					</div>
				)} */}
				<PlayersInfo gameDetail={selectedGame} />
				{selectedGame.gameIsDone && (
					<UiPortal>
						<GameNotification
							gameMessage={selectedGame.gameMessage}
							onContinue={resetBoardHandler}
							goBackHandler={stopGameHandler}
						/>
					</UiPortal>
				)}
				{isSendingData.status && (
					<UiPortal>
						<div className='px-10 py-2'>{isSendingData.message}</div>
					</UiPortal>
				)}
			</main>
		)
	}
}

export default SpecificGame
