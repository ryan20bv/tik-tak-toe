import React from "react";
import { IGameTileData, ISaveGame } from "@/data/modelTypes";
import GameTile from "./GameTile";
// for redux purposes
import { useAppDispatch } from "@/reduxToolkit/indexStore/indexStore";
import { updateSelectedGameHistoryAction } from "@/reduxToolkit/tiktak/tiktakAction";

interface PropsType {
	selectedGame: ISaveGame;
}

const GameBoard: React.FC<PropsType> = ({ selectedGame }) => {
	const dispatch = useAppDispatch();

	const updateGameHistory = (tileData: IGameTileData) => {
		dispatch(updateSelectedGameHistoryAction(tileData));
	};
	return (
		<main className='border-2 border-black max-w-max '>
			<section className='flex w-[12rem] flex-wrap'>
				{selectedGame.history.gameHistory.map((rowTile: IGameTileData[]) =>
					rowTile.map((tileData: IGameTileData) => (
						<GameTile
							tileData={tileData}
							key={tileData.tile_id}
							updateGameHistory={updateGameHistory}
						/>
					))
				)}
			</section>
		</main>
	);
};

export default GameBoard;
