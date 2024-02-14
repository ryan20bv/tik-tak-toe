import {MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/solid'
// =========== Components =============
import {ButtonUI} from '@/components/button'

// =========== Modules ==============
import {GameList} from './modules'
// ==================================

export default function HomeView() {
	return (
		<main className='flex justify-center flex-col px-4 items-center'>
			<ButtonUI style='border border-[8FF57E] bg-[#8FF57E] px-4 text-lg font-bold shadow-md m-4 w-max'>
				Start New Game
			</ButtonUI>

			<section className='border border-black m-auto rounded-lg flex overflow-hidden max-w-3xl w-full'>
				<input
					type='text'
					className='w-[80%] ml-3 my-1 focus:border-none focus:outline-none'
					placeholder='Enter name here...'
				/>
				<ButtonUI style='rounded-none'>
					<XMarkIcon className='h-6 w-6 m-auto' />
				</ButtonUI>
				<ButtonUI style='bg-[#2C91DA] w-[20%] rounded-none '>
					<MagnifyingGlassIcon className='h-6 w-6 m-auto text-white' />
				</ButtonUI>
			</section>

			<GameList />
		</main>
	)
}
