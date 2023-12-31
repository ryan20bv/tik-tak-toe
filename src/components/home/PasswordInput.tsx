import React, { FormEvent, useRef } from "react";
import { ISaveGame } from "@/data/modelTypes";
import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useSanitizeHook from "@/customhooks/use-input";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
interface PropsType {
	eachGame: ISaveGame;
	onCloseInput: () => void;
	goToGamePageHandler: (game: ISaveGame, enteredPassword: string) => void;
	passwordErrorMessage: string;
	updatePasswordErrorMessage: (message: string) => void;
	index: number;
	addedClass: string;
}

const PasswordInput: React.FC<PropsType> = ({
	onCloseInput,
	goToGamePageHandler,
	eachGame,
	passwordErrorMessage,
	updatePasswordErrorMessage,
	index,
	addedClass,
}) => {
	const { handlerInputPasswordSanitizer } = useSanitizeHook();
	const { isSendingData } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);
	const passwordRef = useRef<HTMLInputElement>(null);

	const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		updatePasswordErrorMessage("");
		const validatedValue = handlerInputPasswordSanitizer(value);
		if (!passwordRef.current) {
			return;
		}
		passwordRef.current.value = validatedValue;
	};

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const enteredPassword = passwordRef.current?.value;

		if (!enteredPassword || enteredPassword.trim().length === 0) {
			updatePasswordErrorMessage("Please enter Password");
			return;
		}

		goToGamePageHandler(eachGame, enteredPassword);
	};

	return (
		<>
			<tr className={`${addedClass}`}>
				<td rowSpan={2}>{index + 1}</td>
				<td
					colSpan={5}
					className='text-center'
				>{`${eachGame.player1.name} VS ${eachGame.player2.name}`}</td>
			</tr>
			<tr className={`${addedClass}`}>
				<td colSpan={5}>
					<div className='flex items-center justify-center'>
						<form
							action=''
							className='flex'
							onSubmit={submitFormHandler}
						>
							<div>
								<input
									type='text'
									placeholder='enter password'
									className='px-4 border-2 border-black bg-gray-200 h-8 w-[180px]'
									ref={passwordRef}
									onChange={inputHandler}
								/>
								{passwordErrorMessage && passwordErrorMessage.trim().length > 0 && (
									<p className='text-red-500 text-xs '>*{passwordErrorMessage}</p>
								)}
							</div>
							{!isSendingData.status && (
								<button className='border-0 p-0 mx-4'>
									<PaperAirplaneIcon className='text-green-500 h-8 ' />
								</button>
							)}
						</form>
						{!isSendingData.status && (
							<div onClick={onCloseInput}>
								<XCircleIcon className='text-red-500 h-8 ' />
							</div>
						)}
						{isSendingData.status && <LoadingSpinner />}
					</div>
				</td>
			</tr>
		</>
	);
};

export default PasswordInput;
