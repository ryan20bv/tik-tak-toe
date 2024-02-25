'use client'
import {useState} from 'react'
import {ISaveGame} from '@/data/modelTypes'

import {ListItem} from './elements'

import {
	useAppDispatch,
	useAppSelector,
	RootState
} from '@/reduxToolkit/indexStore/indexStore'

// ==================================
export default function GameList() {
	const [showInput, setShowInput] = useState<boolean>(false)
	const {savedGames} = useAppSelector(
		(state: RootState) => state.tikTakToeReducer
	)

	const showInputHandler = () => {
		setShowInput(true)
	}
	const closeInputHandler = () => {
		setShowInput(false)
	}

	return (
		<main className='border'>
			{/* <h1 className='font-medium'>Recent</h1>
			<div className=' my-2'>
				<ListItem />
			</div> */}
			<div className='flex justify-between items-center'>
				<h1 className='font-medium'>List</h1>
			</div>

			<section className='p-1 overflow-y-scroll'>
				<div className='h-[45vh]  grid  grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{savedGames.map((eachGame: ISaveGame, index: number) => (
						<ListItem
							key={eachGame._id}
							eachGame={eachGame}
							index={index}
							showInput={showInput}
							showInputHandler={showInputHandler}
							closeInputHandler={closeInputHandler}
						/>
					))}
				</div>
			</section>
		</main>
	)
}
