import React, { useRef, useState } from "react";
import InputUI from "../ui/InputUI";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { INewGameUser } from "@/data/modelTypes";
// for redux purposes
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import {
	startNewGameAction,
	addNewGameToSavedGamesAction,
} from "@/reduxToolkit/tiktak/actions/newGameAction";
import { setSelectedGameAction } from "@/reduxToolkit/tiktak/actions/tiktakAction";

// for custom hooks

import useSanitizeHook from "@/customhooks/use-input";
// for next authentication
import { getSession } from "next-auth/react";

const InfoForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { handlerInputNameSanitizer, handlerInputPasswordSanitizer } =
		useSanitizeHook();

	const player1Ref = useRef<HTMLInputElement>(null);
	const player2Ref = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [player1Error, setPlayer1Error] = useState<boolean>(false);
	const [player2Error, setPlayer2Error] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);

	const cancelStartGameHandler = () => {
		router.push("/");
	};
	const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const { value, id } = e.currentTarget;

		if (id === "player 1") {
			const validatedValue = handlerInputNameSanitizer(value);
			if (!player1Ref.current) {
				return;
			}
			setPlayer1Error(false);
			player1Ref.current.value = validatedValue;
		} else if (id === "player 2") {
			const validatedValue = handlerInputNameSanitizer(value);
			if (!player2Ref.current) {
				return;
			}
			setPlayer2Error(false);
			player2Ref.current.value = validatedValue;
		} else if (id === "password") {
			const validatedValue = handlerInputNameSanitizer(value);
			if (!passwordRef.current) {
				return;
			}
			setPasswordError(false);
			passwordRef.current.value = validatedValue;
		}
	};

	const submitGameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const player1_Name = player1Ref.current?.value;
		const player2_Name = player2Ref.current?.value;
		const enteredPassword = passwordRef.current?.value;
		if (!player1_Name || player1_Name.trim().length === 0) {
			setPlayer1Error(true);
		}
		if (!player2_Name || player2_Name.trim().length === 0) {
			setPlayer2Error(true);
		}
		if (
			!enteredPassword ||
			enteredPassword.trim().length === 0 ||
			enteredPassword.trim().length < 4
		) {
			setPasswordError(true);
		}
		if (
			!player1_Name ||
			player1_Name.trim().length === 0 ||
			!player2_Name ||
			player2_Name.trim().length === 0 ||
			!enteredPassword ||
			enteredPassword.trim().length === 0 ||
			enteredPassword.trim().length < 4
		) {
			return;
		}
		// submit to redux
		const newUser: INewGameUser = {
			player1_Name,
			player2_Name,
			password: enteredPassword,
		};
		await dispatch(startNewGameAction(newUser));

		const session = await getSession();

		let dataSession: any = session?.user?.name;
		await dispatch(setSelectedGameAction(dataSession?.newGame));
		await dispatch(addNewGameToSavedGamesAction(dataSession?.newGame));
		if (dataSession?.message === "New Game Created") {
			router.push(`/game/${player1_Name}vs${player2_Name}`);
		}
	};

	return (
		<section className='border border-black p-4 rounded-2xl'>
			<div className='flex '>
				<p onClick={cancelStartGameHandler}>
					<ArrowLeftCircleIcon className='text-red-500 h-8 mr-4' />
				</p>
				<p className='text-center mb-6'>Enter Player Details</p>
			</div>

			<form onSubmit={submitGameHandler}>
				<InputUI
					type={"text"}
					info={"player 1"}
					placeholderInfo='Player 1 name'
					inputRef={player1Ref}
					inputHandler={inputHandler}
					hasError={player1Error}
					errorMessage='*Please enter name max 8 characters'
				/>
				<InputUI
					type={"text"}
					info={"player 2"}
					placeholderInfo='Player 2 name'
					inputRef={player2Ref}
					inputHandler={inputHandler}
					hasError={player2Error}
					errorMessage='*Please enter name max 8 characters'
				/>
				<InputUI
					type={"text"}
					info={"password"}
					placeholderInfo='Password'
					inputRef={passwordRef}
					inputHandler={inputHandler}
					hasError={passwordError}
					errorMessage='*Min of 4 characters'
				/>
				<div className='flex justify-between'>
					<button className='bg-green-400 border border-green-400'>submit</button>
				</div>
			</form>
		</section>
	);
};

export default InfoForm;
