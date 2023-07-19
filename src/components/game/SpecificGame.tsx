import React from "react";
import Link from "next/link";
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
import { updateGameMessageAction } from "@/reduxToolkit/tiktak/actions/tiktakAction";
import { resetBoardHistoryInDatabaseAction } from "@/reduxToolkit/tiktak/actions/historyAction";

const SpecificGame = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { selectedGame } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);

	// const stopGameHandler = () => {
	// 	router.push("/");
	// };
	const updateGameMessageHandler = () => {
		dispatch(updateGameMessageAction());
	};

	const resetBoardHandler = () => {
		dispatch(resetBoardHistoryInDatabaseAction(selectedGame));
	};
	const addedInfo = selectedGame.playerTurn === "1" ? `" X "` : `" O "`;
	return (
		<section className='flex flex-col  '>
			<PlayersInfo gameDetail={selectedGame} />
			<div className='text-center my-2 '>
				Player{" "}
				<span className='text-red-500 text-xl'>{selectedGame.playerTurn}</span> turn{" "}
				<span className='text-red-500 text-xl'>{addedInfo}</span>
			</div>
			<div className='m-auto'>
				<GameBoard selectedGame={selectedGame} />
			</div>
			{!selectedGame.gameIsDone && (
				<div className=' my-4 flex justify-center'>
					<Link
						href='/'
						className='bg-red-400 '
					>
						Stop
					</Link>
				</div>
			)}
			{selectedGame.gameIsDone && (
				<GameNotification
					gameMessage={selectedGame.gameMessage}
					onUpdateBoard={() => {}}
				/>
			)}
		</section>
	);
};

export default SpecificGame;
