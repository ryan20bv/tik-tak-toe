import React, { FormEvent, useRef, useState } from "react";
import { IAccessData, ISaveGame } from "@/data/modelTypes";
import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useSanitizeHook from "@/customhooks/use-input";
// for redux
import { accessGameAction } from "@/reduxToolkit/tiktak/actions/newGameAction";

interface PropsType {
	eachGame: ISaveGame;
	accessGameHandler: (id: string) => void;
	goToGamePageHandler: (game: ISaveGame, enteredPassword: string) => void;
	passwordErrorMessage: string;
	updatePasswordErrorMessage: (message: string) => void;
}

const PasswordInput: React.FC<PropsType> = ({
	accessGameHandler,
	goToGamePageHandler,
	eachGame,
	passwordErrorMessage,
	updatePasswordErrorMessage,
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
	return (
		<tr>
			<td colSpan={6}>
				<div className='flex items-center justify-around'>
					<form
						action=''
						className='flex '
						onSubmit={submitFormHandler}
					>
						<div>
							<input
								type='text'
								placeholder='enter password'
								className='px-4 border-2 border-black bg-gray-200 h-8'
								ref={passwordRef}
								onChange={inputHandler}
							/>
							{passwordErrorMessage && passwordErrorMessage.trim().length > 0 && (
								<p className='text-red-500 text-xs '>*{passwordErrorMessage}</p>
							)}
						</div>

						<button>
							<PaperAirplaneIcon className='text-green-500 h-8 ' />
						</button>
					</form>
					<div onClick={() => accessGameHandler("")}>
						<XCircleIcon className='text-red-500 h-8 ' />
					</div>
				</div>
			</td>
		</tr>
	);
};

export default PasswordInput;
