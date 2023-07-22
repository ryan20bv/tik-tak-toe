import React from "react";
import { IPlayer } from "@/data/modelTypes";
interface PropsType {
	playerInfo: IPlayer;
	infoTitle: string;
}

const IndivInfo: React.FC<PropsType> = ({ playerInfo, infoTitle }) => {
	const cardBackground =
		infoTitle === "Player-1" ? "bg-blue-400" : "bg-yellow-300";
	return (
		<div
			className={`flex flex-col sm:items-center border border-black ${cardBackground} rounded-lg p-2`}
		>
			<div className='flex items-center justify-center'>
				<p className='mr-6'>{infoTitle}</p>
				<span>{`${infoTitle === "Player-1" ? `" X "` : `" O "`} `}</span>
			</div>

			<div className='flex items-end justify-between sm:flex-col'>
				<h3 className='text-2xl'> {playerInfo.name}</h3>
				<div className='flex items-end'>
					<p>Win:</p>
					<p className='px-2 text-2xl'>{playerInfo.win}</p>
				</div>
			</div>
		</div>
	);
};

export default IndivInfo;
