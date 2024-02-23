import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {IAccessData, ISaveGame} from '@/data/modelTypes'
import PasswordInput from '@/components/home/PasswordInput'
import UiPortal from '@/components/ui/UiPortal'
import DeleteModal from '@/components/ui/DeleteModal'
import ResumeInput from './resume-input'

import {
	TrashIcon,
	EllipsisHorizontalCircleIcon,
	ArrowRightEndOnRectangleIcon,
	EllipsisHorizontalIcon
} from '@heroicons/react/24/solid'
// for redux
import {
	useAppDispatch,
	useAppSelector,
	RootState
} from '@/reduxToolkit/indexStore/indexStore'
import {
	setSelectedGameAction,
	unSetSelectedGameAction,
	confirmDeleteGameAction,
	deleteFromSavedGamesAction,
	resetTikTakToeReducerAction
} from '@/reduxToolkit/tiktak/actions/tiktakAction'
import {
	accessGameAction,
	updateIsSendingDataAction,
	resetIsSendingDataAction
} from '@/reduxToolkit/tiktak/actions/newGameAction'
// ==================================

interface PropsType {
	eachGame: ISaveGame
	index: number
	showInput: boolean
	showInputHandler: () => void
	closeInputHandler: () => void
}

export default function ListItem({
	eachGame,
	index,
	showInput,
	showInputHandler,
	closeInputHandler
}: PropsType) {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {selectedGame, isSendingData} = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	)
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
	const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false)

	const {player1, player2, draw} = eachGame
	const goToGamePageHandler = async (
		game: ISaveGame,
		enteredPassword: string
	) => {
		dispatch(updateIsSendingDataAction({status: true, message: ''}))

		let accessData: IAccessData = {
			game_id: game._id,
			password: enteredPassword
		}
		const result = await dispatch(accessGameAction(accessData))

		if (result && result?.message === 'authenticated') {
			router.push(`/game/${player1.name}vs${player2.name}`)
		} else if (result && result?.message === 'Invalid Password!') {
			updatePasswordErrorMessage(result?.message)
		}
		dispatch(resetIsSendingDataAction())
	}

	let isWithTheSameId = selectedGame._id === eachGame._id ? true : false
	let isOpenInputWithSameId =
		selectedGame._id === eachGame._id ? showInput : false

	const addedClass = index % 2 === 0 ? 'bg-blue-100' : 'bg-white'
	const updatePasswordErrorMessage = (message: string) => {
		setPasswordErrorMessage(message)
	}
	const openInputHandler = () => {
		showInputHandler()
	}

	const onCloseInputHandler = () => {
		closeInputHandler()
		setPasswordErrorMessage('')

		dispatch(unSetSelectedGameAction())
	}

	const moreActionHandler = (game: ISaveGame) => {
		closeInputHandler()
		dispatch(setSelectedGameAction(game))
		setPasswordErrorMessage('')
	}

	const deleteIconHandler = () => {
		setIsPortalOpen(true)
	}
	const cancelDeleteHandler = () => {
		setIsPortalOpen(false)
	}
	const confirmDeleteHandler = async (
		gameToDelete: ISaveGame,
		password: string
	) => {
		dispatch(updateIsSendingDataAction({status: true, message: 'Deleting...'}))
		const result = await dispatch(confirmDeleteGameAction(gameToDelete, password))
		if (result?.message === 'Delete Game') {
			dispatch(resetTikTakToeReducerAction())
			dispatch(deleteFromSavedGamesAction(gameToDelete))
		}
		dispatch(resetIsSendingDataAction())

		return result
	}

	return (
		<div
			className={`border border-solid border-gray-400 flex shadow-md rounded-lg overflow-hidden my-2 max-w-sm h-14 min-w-[330px] ${addedClass}`}
		>
			{!isOpenInputWithSameId && (
				<>
					<div className='relative w-[50%] '>
						<div className='px-4 border-b-2 border-solid border-black'>
							<h1 className=' font-semibold'>{player1.name}</h1>
						</div>
						<div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
							<h1 className='text-red-600 font-bold text-xs p-0 px-2 m-0'>VS</h1>
						</div>
						<div className='px-4'>
							<h1 className='text-base font-semibold'>{player2.name}</h1>
						</div>
					</div>
					<div className='border-l-2 border-r-2 border-solid border-black w-[20%] text-center'>
						<div className='border-b-2  border-solid border-black px-2'>
							<h1>{player1.win}-W</h1>
						</div>
						<div className='px-2'>
							<h1>{player2.win}-W</h1>
						</div>
					</div>
					{!isWithTheSameId && (
						<>
							<div className='border-r-2 border-solid border-black w-[15%] flex items-center justify-center'>
								<h1>{draw}-D</h1>
							</div>
							<div className=' w-[15%] flex items-center justify-center'>
								<button
									className='bg-[#8FF57E] shadow-md px-0 py-0'
									onClick={() => moreActionHandler(eachGame)}
								>
									<EllipsisHorizontalIcon className='h-6 w-6' />
								</button>
							</div>
						</>
					)}
					{isWithTheSameId && (
						<div className='flex justify-between items-center m-auto'>
							<button onClick={openInputHandler} className='p-0 m-2'>
								<ArrowRightEndOnRectangleIcon className='text-blue-500 h-8' />
							</button>

							<button onClick={deleteIconHandler} className='p-0 m-2'>
								<TrashIcon className='text-red-500 h-8' />
							</button>
						</div>
					)}
				</>
			)}
			{isOpenInputWithSameId && (
				<ResumeInput
					index={index}
					eachGame={eachGame}
					onCloseInput={onCloseInputHandler}
					goToGamePageHandler={goToGamePageHandler}
					passwordErrorMessage={passwordErrorMessage}
					updatePasswordErrorMessage={updatePasswordErrorMessage}
					addedClass={addedClass}
				/>
			)}
		</div>
	)
}
