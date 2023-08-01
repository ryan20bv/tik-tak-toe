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
// import { appSocket } from "@/socket-io/socket-io";

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
		localStorage.removeItem("persist:root");
	}, []);

	useEffect(() => {
		dispatch(getAllSavedGamesAction(allSavedGames));
	}, [dispatch, allSavedGames]);

	// appSocket.on("allSavedGames", (allSavedGames) => {
	// 	// console.log("from appSocket", allSavedGames);

	return <Home savedGames={allSavedGames} />;
};

export const getServerSideProps = async () => {
	let allSavedGames;
	try {
		const res = await fetch(
			process.env.NEXT_PUBLIC_FRONT_END_URL + "/api/game/getSavedGames"
		);
		const { data } = await res.json();
		const savedData = data.allSavedGames;
		allSavedGames = savedData;
	} catch (err) {
		console.log("error fetching ", err);
	}

	return {
		props: { allSavedGames },
	};
};

export default HomePage;
