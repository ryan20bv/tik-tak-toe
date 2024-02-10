import React from "react";
import IndivInfo from "./IndivInfo";
import { ISaveGame } from "@/data/modelTypes";

interface PropsType {
	gameDetail: ISaveGame;
}

const PlayersInfo: React.FC<PropsType> = ({ gameDetail }) => {
	const { player1, player2, draw } = gameDetail;
	return (
		<section className='flex flex-row justify-between mb-4'>
			<IndivInfo
				playerInfo={player1}
				infoTitle='Player-1'
			/>

			<div className='flex flex-col  border border-black items-center justify-center p-2 rounded-lg m-4 '>
				<p>Draw:</p>
				<p className='px-2 text-2xl'>{draw}</p>
			</div>
			<IndivInfo
				playerInfo={player2}
				infoTitle='Player-2'
			/>
		</section>
	);
};

export default PlayersInfo;
