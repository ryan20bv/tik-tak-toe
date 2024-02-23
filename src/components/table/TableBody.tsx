import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {IAccessData, ISaveGame} from '@/data/modelTypes'
import PasswordInput from '../home/PasswordInput'
import UiPortal from '../ui/UiPortal'
import DeleteModal from '../ui/DeleteModal'

import {
	TrashIcon,
	EllipsisHorizontalCircleIcon,
	ArrowRightEndOnRectangleIcon
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

interface PropsType {
	eachGame: ISaveGame
	index: number
	showInput: boolean
	showInputHandler: () => void
	closeInputHandler: () => void
}

const TableBody: React.FC<PropsType> = ({
	eachGame,
	index,

	showInput,
	showInputHandler,
	closeInputHandler
}) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {selectedGame, isSendingData} = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	)
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
	const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false)

	const {player1, player2, _id, draw} = eachGame
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
		<>
			{!isOpenInputWithSameId && (
				<>
					<tr className={`${addedClass}`}>
						<td rowSpan={2}>{index + 1}</td>
						<td>{player1.name}</td>
						<td>{player1.win}</td>
						<td>{player2.win}</td>
						<td rowSpan={2}>{draw}</td>
						<td rowSpan={2}>
							{!isWithTheSameId && (
								<>
									<button onClick={() => moreActionHandler(eachGame)}>
										<EllipsisHorizontalCircleIcon className='text-green-500 h-8 ' />
									</button>
								</>
							)}
							{isWithTheSameId && (
								<div className='flex'>
									<div onClick={openInputHandler}>
										<ArrowRightEndOnRectangleIcon className='text-blue-500 h-8 ' />
									</div>
									<div onClick={deleteIconHandler}>
										<TrashIcon className='text-red-500 h-8 ' />
									</div>
								</div>
							)}
						</td>
					</tr>
					<tr className={`${addedClass}`}>
						<td>{player2.name}</td>
						<td>{player2.win}</td>
						<td>{player1.win}</td>
					</tr>
				</>
			)}
			{isOpenInputWithSameId && (
				<PasswordInput
					index={index}
					eachGame={eachGame}
					onCloseInput={onCloseInputHandler}
					goToGamePageHandler={goToGamePageHandler}
					passwordErrorMessage={passwordErrorMessage}
					updatePasswordErrorMessage={updatePasswordErrorMessage}
					addedClass={addedClass}
				/>
			)}
			{isPortalOpen && (
				<UiPortal>
					<DeleteModal
						game={selectedGame}
						onCancel={cancelDeleteHandler}
						confirmDeleteHandler={confirmDeleteHandler}
						isSendingData={isSendingData}
					/>
				</UiPortal>
			)}
		</>
	)
}

export default TableBody
