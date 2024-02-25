'use client'
import {Icon} from '@iconify/react'
import {IGameTileData} from '@/data/modelTypes'
// import {XMarkIcon} from '@heroicons/react/24/solid'
// ==================================
interface IPropsType {
	tileData: IGameTileData
	updateGameHistory?: (tileData: IGameTileData) => void
	gameIsDone: boolean
}

export default function Box({
	tileData,
	updateGameHistory,
	gameIsDone
}: IPropsType) {
	const toggleTileHandler = (e: React.MouseEvent<HTMLElement>) => {
		if (tileData.filled || gameIsDone) {
			return
		}
		if (updateGameHistory) {
			updateGameHistory(tileData)
		}
	}

	let renderedChildren
	if (tileData.item === 'X') {
		renderedChildren = (
			<Icon icon='icomoon-free:cross' className='h-16 w-16 text-[#2C91DA]' />
		)
	} else if (tileData.item === 'O') {
		renderedChildren = (
			<Icon icon='fa-solid:dot-circle' className='h-16 w-16 text-[#49CF33]' />
		)
	} else {
		renderedChildren = ''
	}

	return (
		<button
			disabled={gameIsDone}
			className={`border border-gray-400  text-center w-24 h-24 sm:h-28 sm:w-32 shadow-xl rounded-lg flex justify-center items-center ${
				renderedChildren !== '' && 'bg-gray-200'
			}`}
			onClick={toggleTileHandler}
		>
			{renderedChildren}
		</button>
	)
}
