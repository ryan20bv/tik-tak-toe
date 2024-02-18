import {MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/solid'
// =========== Components =============
import {ButtonUI} from '@/components/button'
import {ModalUI} from '@/components/modal'
import {NewGameForm} from '@/components/form'

// =========== Modules ==============
import {GameList, SearchBar} from './modules'
// ==================================

export default function HomeView() {
	return (
		<main className='flex justify-center flex-col mx-4 sm:mx-24 md:mx-10 lg:mx-4 xl:mx-10 items-center'>
			<ButtonUI style='border border-[8FF57E] bg-[#8FF57E] px-4 text-lg font-bold shadow-md m-2 w-max'>
				Start New Game
			</ButtonUI>
			<SearchBar />
			<GameList />
			<ModalUI>
				<NewGameForm />
			</ModalUI>
		</main>
	)
}
