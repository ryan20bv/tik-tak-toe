import React, { FormEvent, useRef, useState } from "react";
import { IAccessData, ISaveGame } from "@/data/modelTypes";
import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useSanitizeHook from "@/customhooks/use-input";
// for redux
import { accessGameAction } from "@/reduxToolkit/tiktak/actions/newGameAction";

interface PropsType {
	eachGame: ISaveGame;
	onCloseInput: () => void;
	goToGamePageHandler: (game: ISaveGame, enteredPassword: string) => void;
	passwordErrorMessage: string;
	updatePasswordErrorMessage: (message: string) => void;
	index: number;
}

const PasswordInput: React.FC<PropsType> = ({
	onCloseInput,
	goToGamePageHandler,
	eachGame,
	passwordErrorMessage,
	updatePasswordErrorMessage,
	index,
}) => {
	const { handlerInputPasswordSanitizer } = useSanitizeHook();
	const passwordRef = useRef<HTMLInputElement>(null);
	// const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

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
	console.log(eachGame);
	return (
		<>
			<tr>
				<td rowSpan={2}>{index + 1}</td>
				<td
					colSpan={5}
					className='text-center'
				>{`${eachGame.player1.name} VS ${eachGame.player2.name}`}</td>
			</tr>
			<tr>
				<td colSpan={5}>
					<div className='flex items-center justify-center'>
						<form
							action=''
							className='flex border border-black'
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

							<button className='border-0 p-0 mx-4'>
								<PaperAirplaneIcon className='text-green-500 h-8 ' />
							</button>
						</form>
						<div
							onClick={onCloseInput}
							className='border border-black'
						>
							<XCircleIcon className='text-red-500 h-8 ' />
						</div>
					</div>
				</td>
			</tr>
		</>
	);
};

export default PasswordInput;
