import React, {useRef, useState} from 'react'
import {ISaveGame, ISendingData} from '@/data/modelTypes'
interface PropsType {
	game: ISaveGame
	onCancel: () => void
	confirmDeleteHandler: (
		gameToDelete: ISaveGame,
		password: string
	) => Promise<any>
	isSendingData: ISendingData
}
import useSanitizeHook from '@/customhooks/use-input'

const DeleteModal: React.FC<PropsType> = ({
	game,
	onCancel,
	confirmDeleteHandler,
	isSendingData
}) => {
	const {handlerInputPasswordSanitizer} = useSanitizeHook()
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
	const passwordRef = useRef<HTMLInputElement>(null)

	const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const {value} = e.currentTarget
		setPasswordErrorMessage('')
		const validatedValue = handlerInputPasswordSanitizer(value)
		if (!passwordRef.current) {
			return
		}
		passwordRef.current.value = validatedValue
	}

	const onConfirmDeleteGame = async (gameToDelete: ISaveGame) => {
		if (!passwordRef.current) {
			return
		}
		const enteredPassword = passwordRef.current.value
		if (!enteredPassword || enteredPassword.trim().length < 4) {
			setPasswordErrorMessage('min 4 characters')
			return
		}

		const promise = await confirmDeleteHandler(gameToDelete, enteredPassword)

		setPasswordErrorMessage(promise?.message)
	}

	return (
		<main>
			<header className='bg-blue-400 px-4 py-2 rounded-t-2xl font-medium'>
				<p>Are you sure you want to delete?</p>
			</header>
			<section className='bg-white'>
				<div className='flex justify-center items-center font-medium my-2'>
					<h1 className=' text-lg'>{`${game.player1.name} `}</h1>
					<p className='mx-4 text-red-500'>vs</p>
					<h1 className='text-lg '>{`${game.player2.name}`}</h1>
				</div>

				<div className='flex justify-center items-center'>
					<input
						type='text'
						placeholder='enter password'
						className='px-4 border-2 border-black bg-gray-200 h-8  rounded-md'
						ref={passwordRef}
						onChange={inputHandler}
					/>
					{passwordErrorMessage && passwordErrorMessage.trim().length > 0 && (
						<p className='text-red-500 text-xs '>*{passwordErrorMessage}</p>
					)}
				</div>

				<div className='flex m-4 items-center justify-between '>
					{!isSendingData.status && (
						<>
							<button className='border border-black' onClick={onCancel}>
								No
							</button>
							<button className='bg-red-400' onClick={() => onConfirmDeleteGame(game)}>
								Yes
							</button>
						</>
					)}
					{isSendingData.status && (
						<p className='text-center'>{isSendingData.message}</p>
					)}
				</div>
			</section>
		</main>
	)
}

export default DeleteModal
