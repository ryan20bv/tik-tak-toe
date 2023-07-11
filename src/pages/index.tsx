import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Home from "@/components/home/Home";

import { getAllSavedGames } from "@/data/dummydata";
import { ISaveGame } from "@/data/modelTypes";

interface PropsType {
	savedGames: ISaveGame[];
}

const HomePage: React.FC<PropsType> = ({ savedGames }) => {
	return <Home savedGames={savedGames} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const savedGames: ISaveGame[] = await getAllSavedGames();

	return {
		props: {
			savedGames,
		},
	};
};

export default HomePage;
