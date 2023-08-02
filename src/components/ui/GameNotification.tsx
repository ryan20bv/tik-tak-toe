import React from "react";

import { useRouter } from "next/router";

interface PropsType {
	gameMessage: string;
	onContinue: () => void;
	goBackHandler: () => void;
}

const GameNotification: React.FC<PropsType> = ({
	gameMessage,
	onContinue,
	goBackHandler,
}) => {
	const router = useRouter();

	return (
		<div className='z-10 bg-white p-4 rounded-2xl mt-[-80px] border border-black'>
			<p>Last game result:</p>
			<h1 className='mb-4 text-center'>{gameMessage}</h1>
			<div className='flex'>
				<button
					className='bg-red-400 mx-2'
					onClick={goBackHandler}
				>
					Back
				</button>

				<button
					className='bg-blue-400 mx-2'
					onClick={onContinue}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default GameNotification;
