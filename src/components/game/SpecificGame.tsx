import React from "react";
import Link from "next/link";
import GameBoard from "./GameBoard";
import PlayersInfo from "./PlayersInfo";
import GameNotification from "../ui/GameNotification";
import { ISaveGame } from "@/data/modelTypes";
import { useRouter } from "next/router";
import UiPortal from "../ui/UiPortal";
// for redux purposes
import {
	useAppDispatch,
	RootState,
	useAppSelector,
} from "@/reduxToolkit/indexStore/indexStore";
import { updateHistoryInDatabaseAction } from "@/reduxToolkit/tiktak/actions/tiktakAction";
import { resetBoardHistoryInDatabaseAction } from "@/reduxToolkit/tiktak/actions/historyAction";
import {
	updateIsSendingDataAction,
	resetIsSendingDataAction,
} from "@/reduxToolkit/tiktak/actions/newGameAction";

const SpecificGame = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { selectedGame, isSendingData } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);

	const stopGameHandler = async () => {
		dispatch(
			updateIsSendingDataAction({ status: true, message: "Saving Data..." })
		);
		const result = await dispatch(updateHistoryInDatabaseAction(selectedGame));

		if (result?.message === "history updated") {
			dispatch(resetIsSendingDataAction());
			router.push("/");
		}
	};
	// const goBackHandler = () => {
	// 	router.back();
	// };
	const resetBoardHandler = async () => {
		dispatch(
			updateIsSendingDataAction({ status: true, message: "Starting New Game..." })
		);
		const result = await dispatch(
			resetBoardHistoryInDatabaseAction(selectedGame)
		);
		if (result?.message === "reset history") {
			dispatch(resetIsSendingDataAction());
		}
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
					<button
						className='bg-red-400 '
						onClick={stopGameHandler}
					>
						Stop
					</button>
				</div>
			)}
			{selectedGame.gameIsDone && (
				<UiPortal>
					<GameNotification
						gameMessage={selectedGame.gameMessage}
						onContinue={resetBoardHandler}
						goBackHandler={stopGameHandler}
					/>
				</UiPortal>
			)}
			{isSendingData.status && (
				<UiPortal>
					<div className='px-10 py-2'>{isSendingData.message}</div>
				</UiPortal>
			)}
		</section>
	);
};

export default SpecificGame;
