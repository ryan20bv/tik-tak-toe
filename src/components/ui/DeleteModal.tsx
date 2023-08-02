import React, { useRef, useState } from "react";
import { ISaveGame } from "@/data/modelTypes";
interface PropsType {
	game: ISaveGame;
	onCancel: () => void;
	confirmDeleteHandler: (
		gameToDelete: ISaveGame,
		password: string
	) => Promise<any>;
}
import useSanitizeHook from "@/customhooks/use-input";

const DeleteModal: React.FC<PropsType> = ({
	game,
	onCancel,
	confirmDeleteHandler,
}) => {
	const { handlerInputPasswordSanitizer } = useSanitizeHook();
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
	const passwordRef = useRef<HTMLInputElement>(null);
	// const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

	const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setPasswordErrorMessage("");
		const validatedValue = handlerInputPasswordSanitizer(value);
		if (!passwordRef.current) {
			return;
		}
		passwordRef.current.value = validatedValue;
	};

	const onConfirmDeleteGame = async (gameToDelete: ISaveGame) => {
		if (!passwordRef.current) {
			return;
		}
		const enteredPassword = passwordRef.current.value;
		if (!enteredPassword || enteredPassword.trim().length < 4) {
			setPasswordErrorMessage("min 4 characters");
			return;
		}

		const promise = await confirmDeleteHandler(gameToDelete, enteredPassword);
		console.log("promise", promise);
		if (!promise.status) {
			setPasswordErrorMessage(promise.message);
		}
	};

	return (
		<section className='flex flex-col items-center'>
			<header className='bg-blue-400 px-4 py-2 rounded-t-2xl'>
				<p>Are you sure you want to delete?</p>
			</header>

			<p className='text-center my-4'>{`${game.player1.name} VS ${game.player2.name}`}</p>
			<div>
				<input
					type='text'
					placeholder='enter password'
					className='px-4 border-2 border-black bg-gray-200 h-8 w-[180px] '
					ref={passwordRef}
					onChange={inputHandler}
				/>
				{passwordErrorMessage && passwordErrorMessage.trim().length > 0 && (
					<p className='text-red-500 text-xs '>*{passwordErrorMessage}</p>
				)}
			</div>
			<div className='flex my-4 w-[80%]'>
				<button
					className='bg-red-400'
					onClick={() => onConfirmDeleteGame(game)}
				>
					Yes
				</button>
				<button
					className='border border-black'
					onClick={onCancel}
				>
					No
				</button>
			</div>
		</section>
	);
};

export default DeleteModal;
