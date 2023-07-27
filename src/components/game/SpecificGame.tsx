import React, { useEffect, useState } from "react";

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
import {
	updateHistoryInDatabaseAction,
	resetTikTakToeReducerAction,
} from "@/reduxToolkit/tiktak/actions/tiktakAction";
import { resetBoardHistoryInDatabaseAction } from "@/reduxToolkit/tiktak/actions/historyAction";
import {
	updateIsSendingDataAction,
	resetIsSendingDataAction,
	updateTokenDataAction,
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

	useEffect(() => {
		const checkForSession = async () => {
			setIsFetchingData(true);
			const session = await getSession();
			if (!session) {
				router.push("/");
			} else {
				const data: any = session.user?.name;
				const token = data.token;
				dispatch(updateTokenDataAction(token));
				setIsFetchingData(false);
			}
		};

		checkForSession();
	}, [router, dispatch]);

	const stopGameHandler = async () => {
		dispatch(
			updateIsSendingDataAction({ status: true, message: "Saving Data..." })
		);
		const result = await dispatch(updateHistoryInDatabaseAction(selectedGame));

		if (result?.message === "history updated") {
			setIsFetchingData(true);
			signOut();
			dispatch(resetIsSendingDataAction());
			dispatch(resetTikTakToeReducerAction());
			// router.push("/");
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
	}
};

export default SpecificGame;
