import React from "react";

import { ISaveGame } from "@/data/modelTypes";

interface PropsType {
	gameDetail: ISaveGame;
}

const PlayersInfo: React.FC<PropsType> = ({ gameDetail }) => {
	const { player1, player2, id, draw } = gameDetail;
	return (
		<section className='flex flex-col justify-between mb-2'>
			<div className='flex flex-col '>
				<div className='flex'>
					<p className='mr-6'>Player 1 </p>
					<span>{`" X "`}</span>
				</div>

				<div className='flex items-end justify-between'>
					<h3 className='text-2xl'> {player1.name}</h3>
					<div className='flex '>
						<p>Win:</p>
						<p className='px-2'>{player1.win}</p>
					</div>
				</div>
			</div>
			<div className='flex  items-center justify-around'>
				<p>vs</p>
				<div className='flex '>
					<p>Draw:</p>
					<p className='px-2'>{draw}</p>
				</div>
			</div>
			<div className='flex flex-col '>
				<div className='flex'>
					<p className='mr-6'>Player 2 </p>
					<span>{`" O "`}</span>
				</div>
				<div className='flex items-end justify-between'>
					<h3 className='text-2xl'> {player2.name}</h3>
					<div className='flex '>
						<p>Win:</p>
						<p className='px-2'>{player2.win}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PlayersInfo;
