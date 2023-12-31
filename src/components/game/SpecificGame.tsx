import React, { useEffect, useState } from "react";

import GameBoard from "./GameBoard";
import PlayersInfo from "./PlayersInfo";
import GameNotification from "../ui/GameNotification";

import { useRouter } from "next/router";
import UiPortal from "../ui/UiPortal";
// for redux purposes
import {
	useAppDispatch,
	RootState,
	useAppSelector,
} from "@/reduxToolkit/indexStore/indexStore";
import {
	updateHistoryInDatabaseAction,
	resetTikTakToeReducerAction,
} from "@/reduxToolkit/tiktak/actions/tiktakAction";
import { resetBoardHistoryInDatabaseAction } from "@/reduxToolkit/tiktak/actions/historyAction";
import {
	updateIsSendingDataAction,
	resetIsSendingDataAction,
} from "@/reduxToolkit/tiktak/actions/newGameAction";

// for next authentication
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const SpecificGame = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { selectedGame, isSendingData } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);
	const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
	const [nextSession, setNextSession] = useState<string>("");

	useEffect(() => {
		dispatch(resetIsSendingDataAction());
		const checkForSession = async () => {
			setIsFetchingData(true);
			const session = await getSession();
			if (!session) {
				setNextSession("");
				router.push("/");
			} else {
				const data: any = session.user?.name;

				setNextSession(data.token);
				setIsFetchingData(false);
			}
		};

		checkForSession();
	}, [router, dispatch]);

	const stopGameHandler = async () => {
		dispatch(
			updateIsSendingDataAction({ status: true, message: "Saving Data..." })
		);
		const result = await dispatch(
			updateHistoryInDatabaseAction(selectedGame, nextSession)
		);

		if (result?.message === "history updated") {
			setIsFetchingData(true);
			setNextSession("");
			signOut();
			dispatch(resetIsSendingDataAction());
		}
	};

	const resetBoardHandler = async () => {
		dispatch(
			updateIsSendingDataAction({ status: true, message: "Starting New Game..." })
		);
		const result = await dispatch(
			resetBoardHistoryInDatabaseAction(selectedGame, nextSession)
		);
		if (result?.message === "reset history") {
			dispatch(resetIsSendingDataAction());
		}
	};
	const addedInfo = selectedGame.playerTurn === "1" ? `" X "` : `" O "`;
	const spanColor =
		selectedGame.playerTurn === "1" ? "text-blue-600" : "text-yellow-500";

	if (isFetchingData) {
		return <div>Loading...</div>;
	}

	if (!isFetchingData) {
		return (
			<section className='flex flex-col  '>
				<PlayersInfo gameDetail={selectedGame} />
				<div className='text-center my-2 font-semibold'>
					Player{" "}
					<span className={`${spanColor} text-2xl`}>{selectedGame.playerTurn}</span>{" "}
					turn <span className={`${spanColor} text-2xl`}>{addedInfo}</span>
				</div>
				<div className='m-auto'>
					<GameBoard
						selectedGame={selectedGame}
						nextSession={nextSession}
					/>
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
	}
};

export default SpecificGame;
