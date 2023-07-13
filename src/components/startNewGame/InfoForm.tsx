import React, { useRef } from "react";
import InputUI from "../ui/InputUI";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
// for redux purposes
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { startNewGameAction } from "@/reduxToolkit/tiktak/newGameAction";
import { INewGameUser } from "@/data/modelTypes";

const InfoForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const player1Ref = useRef<HTMLInputElement>(null);
	const player2Ref = useRef<HTMLInputElement>(null);

	const cancelStartGameHandler = () => {
		router.push("/");
	};
	const submitGameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const player1_Name = player1Ref.current?.value;
		const player2_Name = player2Ref.current?.value;
		// console.log(player1Name);
		// console.log(player2Name);
		if (
			!player1_Name ||
			player1_Name.trim().length === 0 ||
			!player2_Name ||
			player2_Name.trim().length === 0
		) {
			return;
		}
		// submit to redux
		const newUser: INewGameUser = {
			player1_Name,
			player2_Name,
			password: "123456",
		};
		const result = await dispatch(startNewGameAction(newUser));
		console.log("result:", result);
		if (result?.message === "New Game Created") {
			router.push(`/game/${player1_Name}vs${player2_Name}`);
		}
	};
	return (
		<section className='border border-black p-4 rounded-2xl'>
			<div className='flex'>
				<p onClick={cancelStartGameHandler}>
					<ArrowLeftCircleIcon className='text-red-500 h-6 mx-2' />
				</p>
				<p className='text-center mb-6'>Enter Player Details</p>
			</div>

			<form onSubmit={submitGameHandler}>
				<InputUI
					type={"text"}
					info={"player 1"}
					placeholderInfo='Player 1 name'
					inputRef={player1Ref}
				/>
				<InputUI
					type={"text"}
					info={"player 2"}
					placeholderInfo='Player 2 name'
					inputRef={player2Ref}
				/>
				<div className='flex justify-between'>
					<button className='bg-green-400 border border-green-400'>submit</button>
				</div>
			</form>
		</section>
	);
};

export default InfoForm;
