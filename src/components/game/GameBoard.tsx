import React from "react";
import { IGameTileData } from "@/data/modelTypes";
import { gameData } from "@/data/dummydata";
import GameTile from "./GameTile";

const GameBoard = () => {
	return (
		<main className='border-2 border-black max-w-max '>
			<section className='flex w-[12rem] flex-wrap'>
				{gameData.map((tileData: IGameTileData) => (
					<GameTile
						tileData={tileData}
						key={tileData.id}
					/>
				))}
			</section>
		</main>
	);
};

export default GameBoard;
