import {MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/solid'
// =========== Components =============
import {ButtonUI} from '@/components/button'

// ==================================

export default function SearchBar() {
	return (
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
	)
}
