import React from "react";
import GameTile from "../game/GameTile";
import { IGameTileData } from "@/data/modelTypes";

interface PropsType {
	startGameData: IGameTileData[];
}

const StartNewGame: React.FC<PropsType> = ({ startGameData }) => {
	return (
		<main className='border-2 border-black max-w-max mt-20'>
			<section className='flex w-[12rem] flex-wrap'>
				{startGameData.map((tileData: IGameTileData) => (
					<GameTile
						tileData={tileData}
						key={tileData.id}
					/>
				))}
			</section>
		</main>
	);
};

export default StartNewGame;
