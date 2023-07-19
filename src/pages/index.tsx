import React, { useEffect } from "react";

import Home from "@/components/home/Home";

import { ISaveGame } from "@/data/modelTypes";
// for redux purposes
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { getAllSavedGamesAction } from "@/reduxToolkit/tiktak/actions/tiktakAction";
import { appSocket } from "@/socket-io/socket-io";

interface PropsType {
	allSavedGames: ISaveGame[];
}

const HomePage: React.FC<PropsType> = ({ allSavedGames }) => {
	// const HomePage = () => {
	// console.log(allSavedGames);
	const dispatch = useAppDispatch();
	// 	const { isLoadingSavedGame, savedGames } = useAppSelector(
	// 		(state: RootState) => state.tikTakToeReducer
	// 	);

	useEffect(() => {
		dispatch(getAllSavedGamesAction(allSavedGames));
	}, [dispatch, allSavedGames]);

	// appSocket.on("allSavedGames", (allSavedGames) => {
	// 	// console.log("from appSocket", allSavedGames);
	// 	dispatch(getAllSavedGamesAction(allSavedGames));
	// });

	// if (isLoadingSavedGame) {
	// 	return <div>Loading</div>;
	// }
	// if (!isLoadingSavedGame) {
	// 	return <Home savedGames={savedGames} />;
	// }
	return <Home savedGames={allSavedGames} />;
};

export const getServerSideProps = async () => {
	const res = await fetch(
		process.env.NEXT_PUBLIC_FRONT_END_URL + "/api/game/getSavedGames"
	);

	const { data } = await res.json();
	const { allSavedGames } = data;
	return {
		props: { allSavedGames },
	};
};

export default HomePage;
