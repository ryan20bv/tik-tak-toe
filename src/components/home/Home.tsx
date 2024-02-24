import React, {useState} from 'react'
import Table from '../table/Table'
import {ISaveGame} from '@/data/modelTypes'
import {useRouter} from 'next/router'

import GameList from '../saved-game/game-list'
import {Pagination} from '../saved-game/elements'

interface PropsType {
	savedGames: ISaveGame[]
	totalSavedGames: number
}

const Home: React.FC<PropsType> = ({savedGames, totalSavedGames}) => {
	const router = useRouter()
	const stateNewGameHandler = () => {
		router.push('/game')
	}
	return (
		<section className='flex items-center flex-col  '>
			<div className=' mb-4'>
				<button
					className='border border-[#8FF57E] bg-[#8FF57E] px-4 text-lg font-bold shadow-md m-6 w-max'
					onClick={stateNewGameHandler}
				>
					Start New Game
				</button>
			</div>

			{!savedGames ||
				(savedGames.length === 0 && (
					<div className='w-[300px] text-center mt-20 text-2xl'>No saved Games</div>
				))}
			{savedGames && savedGames.length > 0 && (
				<>
					{/* <Table savedGames={savedGames} totalSavedGames={totalSavedGames} /> */}
					<GameList />
					<Pagination />
				</>
			)}
		</section>
	)
}

export default Home
