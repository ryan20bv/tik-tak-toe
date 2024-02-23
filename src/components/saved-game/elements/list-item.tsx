import {EllipsisHorizontalIcon} from '@heroicons/react/24/solid'
// =========== Components =============

// ==================================
export default function ListItem() {
	return (
		<div className='border border-solid border-gray-400 flex shadow-md rounded-lg overflow-hidden my-2 max-w-sm h-14 min-w-[330px]'>
			<div className='relative w-[50%] '>
				<div className='px-4 border-b-2 border-solid border-black'>
					<h1 className='text-base font-semibold'>Kenjie</h1>
				</div>
				<div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
					<h1 className='text-red-600 font-bold text-xs p-0 px-2 m-0'>VS</h1>
				</div>
				<div className='px-4'>
					<h1 className='text-base font-semibold'>Sarah</h1>
				</div>
			</div>
			<div className='border-l-2 border-r-2 border-solid border-black w-[20%] text-center'>
				<div className='border-b-2  border-solid border-black px-2'>
					<h1>3-W</h1>
				</div>
				<div className='px-2'>
					<h1>1-W</h1>
				</div>
			</div>
			<div className='border-r-2 border-solid border-black w-[15%] flex items-center justify-center'>
				<h1>1-D</h1>
			</div>
			<div className=' w-[15%] flex items-center justify-center'>
				<button className='bg-[#8FF57E] shadow-md px-0 py-0'>
					<EllipsisHorizontalIcon className='h-6 w-6' />
				</button>
			</div>
		</div>
	)
}
