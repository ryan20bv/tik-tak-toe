import React from 'react'
import {IGameTileData, ISaveGame} from '@/data/modelTypes'
import GameTile from './GameTile'
import Box from './Box'
// for redux purposes
import useGameUpdate from '@/customhooks/use-game'
import {useAppDispatch} from '@/reduxToolkit/indexStore/indexStore'
import {setSelectedGameAction} from '@/reduxToolkit/tiktak/actions/tiktakAction'

interface PropsType {
	selectedGame: ISaveGame
	nextSession: string
}

const GameBoard: React.FC<PropsType> = ({selectedGame, nextSession}) => {
	const dispatch = useAppDispatch()
	const {clickTileHandler} = useGameUpdate(selectedGame, nextSession)
	const updateGameHistory = (tileData: IGameTileData) => {
		const {updatedSelectedGame} = clickTileHandler(tileData)

		dispatch(setSelectedGameAction(updatedSelectedGame))
	}

	return (
		<section className=' grid grid-cols-3 gap-4 max-w-xl  m-auto'>
			{selectedGame.history.gameHistory.map((rowTile: IGameTileData[]) =>
				rowTile.map((tileData: IGameTileData) => (
					<Box
						tileData={tileData}
						key={tileData.tile_id}
						updateGameHistory={updateGameHistory}
						gameIsDone={selectedGame.gameIsDone}
					/>
				))
			)}
		</section>
	)
}

export default GameBoard
