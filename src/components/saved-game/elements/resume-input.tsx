import React, {FormEvent, useRef} from 'react'
import {ISaveGame} from '@/data/modelTypes'
import {PaperAirplaneIcon, XCircleIcon} from '@heroicons/react/24/solid'
import useSanitizeHook from '@/customhooks/use-input'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {useAppSelector, RootState} from '@/reduxToolkit/indexStore/indexStore'

interface PropsType {
	index: number
	eachGame: ISaveGame
	onCloseInput: () => void
	goToGamePageHandler: (game: ISaveGame, enteredPassword: string) => void
	passwordErrorMessage: string
	updatePasswordErrorMessage: (message: string) => void
	addedClass: string
}

const ResumeInput = ({
	onCloseInput,
	goToGamePageHandler,
	eachGame,
	passwordErrorMessage,
	updatePasswordErrorMessage,
	index,
	addedClass
}: PropsType) => {
	const {handlerInputPasswordSanitizer} = useSanitizeHook()
	const {isSendingData} = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	)
	const passwordRef = useRef<HTMLInputElement>(null)

	const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const {value} = e.currentTarget
		updatePasswordErrorMessage('')
		const validatedValue = handlerInputPasswordSanitizer(value)
		if (!passwordRef.current) {
			return
		}
		passwordRef.current.value = validatedValue
	}

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const enteredPassword = passwordRef.current?.value

		if (!enteredPassword || enteredPassword.trim().length === 0) {
			updatePasswordErrorMessage('Please enter Password')
			return
		}

		goToGamePageHandler(eachGame, enteredPassword)
	}
	return (
		<section className='w-full'>
			<div className='flex justify-center items-center m-auto '>
				<h1 className='font-semibold'>{eachGame.player1.name}</h1>{' '}
				<span className='text-red-600 font-bold text-xs p-0 px-2 m-0'>VS</span>
				<h1 className='font-semibold'>{eachGame.player2.name}</h1>
			</div>
			<div className='flex items-center justify-center'>
				<form action='' className='flex' onSubmit={submitFormHandler}>
					<div>
						<input
							type='text'
							placeholder='enter password'
							className='px-4 border-2 border-black bg-gray-200 h-6 w-[180px] rounded-md'
							ref={passwordRef}
							onChange={inputHandler}
						/>
						{passwordErrorMessage && passwordErrorMessage.trim().length > 0 && (
							<p className='text-red-500 text-xs '>*{passwordErrorMessage}</p>
						)}
					</div>
					{!isSendingData.status && (
						<button className='border-0 p-0 mx-4'>
							<PaperAirplaneIcon className='text-green-500 h-6 ' />
						</button>
					)}
				</form>
				{!isSendingData.status && (
					<div onClick={onCloseInput}>
						<XCircleIcon className='text-red-500 h-6 ' />
					</div>
				)}
				{isSendingData.status && <LoadingSpinner />}
				{/* <LoadingSpinner /> */}
			</div>
		</section>
	)
}

export default ResumeInput
