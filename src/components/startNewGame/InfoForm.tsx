import React from "react";
import InputUI from "../ui/InputUI";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const InfoForm = () => {
	const router = useRouter();

	const cancelStartGameHandler = () => {
		router.push("/");
	};
	const submitGameHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push("/game/g1");
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
				/>
				<InputUI
					type={"text"}
					info={"player 2"}
					placeholderInfo='Player 2 name'
				/>
				<div className='flex justify-between'>
					<button className='bg-green-400 border border-green-400'>submit</button>
				</div>
			</form>
		</section>
	);
};

export default InfoForm;
