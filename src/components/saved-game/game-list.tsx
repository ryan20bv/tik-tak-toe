'use client'
import {useState} from 'react'

import {ListItem, Pagination} from './elements'

// ==================================
export default function GameList() {
	const [currPage, setCurrPage] = useState<number>(1)
	const [maxPage, setMaxPage] = useState<number>(10)

	const handleUpdateCurrentPage = (value: number) => {
		setCurrPage(value)
	}

	return (
		<main className=' w-full my-4 '>
			{/* <h1 className='font-medium'>Recent</h1>
			<div className=' my-2'>
				<ListItem />
			</div> */}

			<h1 className='font-medium'>List</h1>
			<section className='p-1 overflow-y-scroll'>
				<div className='h-[45vh]  grid  grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-min-4 gap-max-8'>
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
				</div>
			</section>
			<Pagination
				currPage={currPage}
				maxPage={maxPage}
				handleUpdateCurrentPage={handleUpdateCurrentPage}
			/>
		</main>
	)
}
