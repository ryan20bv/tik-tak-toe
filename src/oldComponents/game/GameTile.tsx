import React from "react";
import { IGameTileData } from "@/data/modelTypes";
interface PropsType {
	tileData: IGameTileData;
	updateGameHistory: (tileData: IGameTileData) => void;
	gameIsDone: boolean;
}

const GameTile: React.FC<PropsType> = ({
	tileData,
	updateGameHistory,
	gameIsDone,
}) => {
	const toggleTileHandler = (e: React.MouseEvent<HTMLElement>) => {
		if (tileData.filled || gameIsDone) {
			return;
		}
		updateGameHistory(tileData);
	};

	const tileBackground = tileData.filled ? "bg-gray-800" : "bg-gray-200";
	const textColor = tileData.item === "X" ? "text-blue-600" : "text-yellow-500";
	return (
		<div
			className={`w-[4rem] h-[4rem] flex items-center justify-center border-r-2 border-b-2 border-black text-5xl ${tileBackground} ${textColor} font-bold`}
			id={tileData.tile_id}
			onClick={toggleTileHandler}
		>
			{tileData.item}
		</div>
	);
};

export default GameTile;
