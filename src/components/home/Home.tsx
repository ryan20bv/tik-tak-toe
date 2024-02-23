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
	const [currPage, setCurrPage] = useState<number>(1)
	const [maxPage, setMaxPage] = useState<number>(10)
	const handleUpdateCurrentPage = (value: number) => {
		setCurrPage(value)
	}
	const router = useRouter()
	const stateNewGameHandler = () => {
		router.push('/game')
	}
	return (
		<section className='flex items-center flex-col  '>
			<div className=' mb-4'>
				<button
					className='bg-green-300 border border-green-300'
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
					<Table savedGames={savedGames} totalSavedGames={totalSavedGames} />
					<GameList savedGames={savedGames} totalSavedGames={totalSavedGames} />
					<Pagination
						currPage={currPage}
						maxPage={maxPage}
						handleUpdateCurrentPage={handleUpdateCurrentPage}
					/>
				</>
			)}
		</section>
	)
}

export default Home
