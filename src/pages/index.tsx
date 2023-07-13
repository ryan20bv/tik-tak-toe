import React, { useEffect } from "react";

import Home from "@/components/home/Home";

import { ISaveGame } from "@/data/modelTypes";
// for redux purposes
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { getAllSavedGamesAction } from "@/reduxToolkit/tiktak/tiktakAction";

interface PropsType {
	allSavedGames: ISaveGame[];
}

const HomePage: React.FC<PropsType> = ({ allSavedGames }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllSavedGamesAction(allSavedGames));
	}, [dispatch, allSavedGames]);

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
