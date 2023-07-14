import React from "react";
import GameBoard from "./GameBoard";
import PlayersInfo from "./PlayersInfo";
import GameNotification from "../ui/GameNotification";
import { ISaveGame } from "@/data/modelTypes";
import { useRouter } from "next/router";
// for redux purposes
import {
	useAppDispatch,
	RootState,
	useAppSelector,
} from "@/reduxToolkit/indexStore/indexStore";
import { updateGameMessageAction } from "@/reduxToolkit/tiktak/tiktakAction";
import { resetBoardHistoryInDatabaseAction } from "@/reduxToolkit/tiktak/historyAction";

const SpecificGame = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { selectedGame, gameMessage, isGameMessageOpen } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);
	// console.log(isGameMessageOpen);
	const stopGameHandler = () => {
		router.push("/");
	};
	const updateGameMessageHandler = () => {
		dispatch(updateGameMessageAction());
	};

	const resetBoardHandler = () => {
		console.log("reset");
		dispatch(resetBoardHistoryInDatabaseAction(selectedGame));
	};
	const addedInfo = selectedGame.playerTurn === "1" ? "X" : "O";
	return (
		<section>
			<PlayersInfo gameDetail={selectedGame} />
			<div className='text-center my-2'>
				{`Player ${selectedGame.playerTurn} turn " ${addedInfo} "`}
			</div>
			<GameBoard selectedGame={selectedGame} />
			<div className=' my-4 flex justify-center'>
				<button
					className='bg-red-400 '
					onClick={stopGameHandler}
				>
					Stop
				</button>
				{selectedGame.gameIsDone && (
					<button
						className='bg-blue-300'
						onClick={resetBoardHandler}
					>
						Reset Board
					</button>
				)}
			</div>
			{isGameMessageOpen && (
				<GameNotification
					gameMessage={gameMessage}
					onUpdateBoard={updateGameMessageHandler}
				/>
			)}
		</section>
	);
};

export default SpecificGame;
