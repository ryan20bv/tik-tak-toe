import React from "react";
import { getAllSavedGames, getSavedGamesById } from "@/data/dummydata";
import type {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPaths,
} from "next";
import { ISaveGame } from "@/data/modelTypes";

import SpecificGame from "@/components/game/SpecificGame";

interface PropsTypes {
	gameDetail: ISaveGame;
}

const SpecificGamePage: React.FC<PropsTypes> = ({ gameDetail }) => {
	return <SpecificGame />;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const savedGames: ISaveGame[] = getAllSavedGames();
	return {
		paths: [
			{ params: { gameId: savedGames[0].id } },
			{ params: { gameId: savedGames[1].id } },
			{ params: { gameId: savedGames[2].id } },
		],
		fallback: true, // false or "blocking"
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const gameId = context.params?.gameId;
	let foundGame: ISaveGame | undefined;
	if (typeof gameId === "string") {
		foundGame = getSavedGamesById(gameId);
	}
	return { props: { gameDetail: foundGame } };
};

export default SpecificGamePage;
