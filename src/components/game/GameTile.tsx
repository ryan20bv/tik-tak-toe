import React from "react";
import { IGameTileData } from "@/data/modelTypes";
interface PropsType {
	tileData: IGameTileData;
}

const GameTile: React.FC<PropsType> = ({ tileData }) => {
	const toggleTileHandler = () => {
		console.log(tileData.id);
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
