import React from "react";
import GameTile from "../game/GameTile";
import InputModal from "./InputModal";
import { IGameTileData } from "@/data/modelTypes";

interface PropsType {
	startGameData: IGameTileData[];
}

const StartNewGame: React.FC<PropsType> = ({ startGameData }) => {
	return (
		<main>
			<section className='border-2 border-black max-w-max mt-20'>
				<div className='flex w-[12rem] flex-wrap'>
					{startGameData.map((tileData: IGameTileData) => (
						<GameTile
							tileData={tileData}
							key={tileData.id}
							updateGameHistory={() => {}}
						/>
					))}
				</div>
			</section>
			<InputModal />
		</main>
	);
};

export default StartNewGame;
