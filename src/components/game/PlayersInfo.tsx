import React from "react";
import IndivInfo from "./IndivInfo";
import { ISaveGame } from "@/data/modelTypes";

interface PropsType {
	gameDetail: ISaveGame;
}

const PlayersInfo: React.FC<PropsType> = ({ gameDetail }) => {
	const { player1, player2, draw } = gameDetail;
	return (
		<section className='flex flex-col sm:flex-row justify-between mb-2'>
			<IndivInfo
				playerInfo={player1}
				infoTitle='Player-1'
			/>
			<div className='flex  items-center justify-around sm:mx-6 sm:flex-col  '>
				<p>vs</p>
				<div className='flex items-end sm:items-center'>
					<p>Draw:</p>
					<p className='px-2 text-2xl'>{draw}</p>
				</div>
			</div>
			<IndivInfo
				playerInfo={player2}
				infoTitle='Player-2'
			/>
		</section>
	);
};

export default PlayersInfo;
