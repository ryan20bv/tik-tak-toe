import {MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/solid'
// =========== Components =============
import {ButtonUI} from '@/components/button'

// =========== Modules ==============
import {GameList, SearchBar} from './modules'
// ==================================

export default function HomeView() {
	return (
		<main className='flex justify-center flex-col px-4 items-center'>
			<ButtonUI style='border border-[8FF57E] bg-[#8FF57E] px-4 text-lg font-bold shadow-md m-2 w-max'>
				Start New Game
			</ButtonUI>
			<SearchBar />
			<GameList />
		</main>
	)
}
