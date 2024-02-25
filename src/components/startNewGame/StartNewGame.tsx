import React from 'react'

import {IGameTileData} from '@/data/modelTypes'
import InfoForm from './InfoForm'

import Box from '../game/Box'

const gameData: IGameTileData[] = [
	{
		tile_id: '1',
		item: 'X',
		filled: true
	},
	{
		tile_id: '2',
		item: 'O',
		filled: true
	},
	{
		tile_id: '3',
		item: 'X',
		filled: true
	},
	{
		tile_id: '4',
		item: 'O',
		filled: true
	},
	{
		tile_id: '5',
		item: 'X',
		filled: true
	},
	{
		tile_id: '6',
		item: 'O',
		filled: true
	},
	{
		tile_id: '7',
		item: 'X',
		filled: true
	},
	{
		tile_id: '8',
		item: 'O',
		filled: true
	},
	{
		tile_id: '9',
		item: 'X',
		filled: true
	}
]
interface PropsType {
	startGameData: IGameTileData[]
}

const StartNewGame: React.FC<PropsType> = ({startGameData}) => {
	return (
		<main className='w-screen h-screen flex py-14 justify-evenly items-center relative'>
			<section className='grid grid-cols-3 gap-4 absolute md:relative'>
				{gameData.map((tileData: IGameTileData) => (
					<Box tileData={tileData} key={tileData.tile_id} gameIsDone={true} />
				))}
			</section>
			<InfoForm />
		</main>
	)
}

export default StartNewGame
