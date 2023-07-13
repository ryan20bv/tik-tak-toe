import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Home from "@/components/home/Home";

import { getAllSavedGames } from "@/data/dummydata";
import { ISaveGame } from "@/data/modelTypes";
// for redux purposes
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from "@/reduxToolkit/indexStore/indexStore";
import { getAllSavedGamesAction } from "@/reduxToolkit/tiktak/tiktakAction";

// interface PropsType {
// 	savedGames: ISaveGame[];
// }

const HomePage = () => {
	const { savedGames } = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	);
	return <Home savedGames={savedGames} />;
};

// export const getStaticProps: GetStaticProps = async () => {
// 	const savedGames: ISaveGame[] = await getAllSavedGames();

// 	return {
// 		props: {
// 			savedGames,
// 		},
// 	};
// };

export default HomePage;
