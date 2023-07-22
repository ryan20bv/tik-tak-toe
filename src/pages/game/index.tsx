import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import StartNewGame from "@/components/startNewGame/StartNewGame";
import { getStartGameData } from "@/data/dummydata";
import { IGameTileData } from "@/data/modelTypes";

interface PropsType {
	startGameData: IGameTileData[];
}

const GamePage: React.FC<PropsType> = ({ startGameData }) => {
	return <StartNewGame startGameData={startGameData} />;
};

export const getStaticProps: GetStaticProps = async () => {
	// this is to get the tile background information
	const startGameData: IGameTileData[] = await getStartGameData();

	return {
		props: {
			startGameData,
		},
	};
};

export default GamePage;
