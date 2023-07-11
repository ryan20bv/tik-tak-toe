import React from "react";
import GameBoard from "./GameBoard";
import PlayersInfo from "./PlayersInfo";
import { ISaveGame } from "@/data/modelTypes";
import { useRouter } from "next/router";
// for redux purposes
import {
	useAppDispatch,
	RootState,
	useAppSelector,
} from "@/reduxToolkit/indexStore/indexStore";

const SpecificGame = () => {
	const router = useRouter();

	const { selectedGame } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);

	const stopGameHandler = () => {
		router.push("/");
	};
	return (
		<section>
			<PlayersInfo gameDetail={selectedGame} />
			<div className='text-center my-2'> Player 2 turn</div>
			<GameBoard />
			<div className=' my-4 flex justify-center'>
				<button
					className='bg-red-400 '
					onClick={stopGameHandler}
				>
					Stop
				</button>
			</div>
		</section>
	);
};

export default SpecificGame;
