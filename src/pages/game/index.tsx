import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import StartNewGame from "@/components/startNewGame/StartNewGame";

import { IGameTileData } from "@/data/modelTypes";

interface PropsType {
	startGameData: IGameTileData[];
}

const GamePage: React.FC<PropsType> = ({ startGameData }) => {
	return <StartNewGame startGameData={startGameData} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const startGameData: IGameTileData[] = await getStartGameData();

	return {
		props: {
			startGameData,
		},
	};
};

export default GamePage;
