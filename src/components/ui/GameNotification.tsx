import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PropsType {
	gameMessage: string;
	onUpdateBoard: () => void;
}

const GameNotification: React.FC<PropsType> = ({
	gameMessage,
	onUpdateBoard,
}) => {
	const [messagePortal, setMessagePortal] = useState<any>();
	useEffect(() => {
		setMessagePortal(document?.getElementById("notificationPortal"));
	}, []);
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
							<h1 className='mb-4'>{gameMessage}</h1>
							<button
								className='bg-blue-400 '
								onClick={onUpdateBoard}
							>
								OK
							</button>
						</div>
					</main>,
					messagePortal
				)}
		</>
	);
};

export default GameNotification;
