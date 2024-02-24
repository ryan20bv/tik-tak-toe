import React from 'react'
import IndivInfo from './IndivInfo'
import {ISaveGame} from '@/data/modelTypes'

interface PropsType {
	gameDetail: ISaveGame
}

const PlayersInfo: React.FC<PropsType> = ({gameDetail}) => {
	const {player1, player2, draw} = gameDetail
	return (
		// <section className='flex flex-row justify-between mb-4'>
		// 	<IndivInfo
		// 		playerInfo={player1}
		// 		infoTitle='Player-1'
		// 	/>

		// 	<div className='flex flex-col  border border-black items-center justify-center p-2 rounded-lg m-4 '>
		// 		<p>Draw:</p>
		// 		<p className='px-2 text-2xl'>{draw}</p>
		// 	</div>
		// 	<IndivInfo
		// 		playerInfo={player2}
		// 		infoTitle='Player-2'
		// 	/>
		// </section>
		<section className='flex justify-center items-center mt-4'>
			<div className='border bg-[#2C91DA] rounded-lg p-2 text-center shadow-lg'>
				<h3 className='text-xl'>X ({player1.name})</h3>
				<h1 className='text-3xl font-bold'>{player1.win}</h1>
			</div>
			<div className='border bg-gray-200 rounded-lg p-2 text-center m-6 shadow-lg'>
				<h3 className='text-xl'>DRAW</h3>
				<h1 className='text-3xl font-bold'>{draw}</h1>
			</div>
			<div className='border bg-[#49CF33] rounded-lg p-2 text-center shadow-lg'>
				<h3 className='text-xl'>O ({player2.name})</h3>
				<h1 className='text-3xl font-bold'>{player2.win}</h1>
			</div>
		</section>
	)
}

export default PlayersInfo
