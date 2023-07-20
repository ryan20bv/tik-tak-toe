import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";

interface PropsType {
	gameMessage: string;
	onResetBoard: () => void;
}

const GameNotification: React.FC<PropsType> = ({
	gameMessage,
	onResetBoard,
}) => {
	const router = useRouter();
	const [messagePortal, setMessagePortal] = useState<any>();
	useEffect(() => {
		setMessagePortal(document?.getElementById("notificationPortal"));
	}, []);
	const goBackHandler = () => {
		router.back();
	};
	return (
		<>
			{messagePortal &&
				ReactDOM.createPortal(
					<main className='absolute top-0   w-full h-full flex justify-center items-center'>
						<section
							className='absolute top-0 z-5 w-full h-full  bg-gray-300 bg-opacity-40 flex items-center justify-center'
							// onClick={onCloseModal}
						></section>
						<div className='z-10 bg-white p-4 rounded-2xl mt-[-80px]'>
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
									onClick={onResetBoard}
								>
									Continue
								</button>
							</div>
						</div>
					</main>,
					messagePortal
				)}
		</>
	);
};

export default GameNotification;
