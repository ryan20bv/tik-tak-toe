import React from "react";
import { IGameTileData } from "@/data/modelTypes";
interface PropsType {
	tileData: IGameTileData;
	updateGameHistory: (tileData: IGameTileData) => void;
}

const GameTile: React.FC<PropsType> = ({ tileData, updateGameHistory }) => {
	const toggleTileHandler = (e: React.MouseEvent<HTMLElement>) => {
		if (tileData.filled) {
			return;
		}
		updateGameHistory(tileData);
	};

	const tileBackground = tileData.filled ? "bg-white" : "bg-red-300";

	return (
		<div
			className={`w-[4rem] h-[4rem] flex items-center justify-center border-r-2 border-b-2 border-black text-2xl ${tileBackground}`}
			id={tileData.id}
			onClick={toggleTileHandler}
		>
			{tileData.item}
		</div>
	);
};

export default GameTile;
