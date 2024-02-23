import {useState, useEffect} from 'react'
// =========== Components =============
import {pageMaker} from '@/utils/helper/page-maker'
import {ButtonUI} from '@/components/button'
// ==================================

interface PropsTypes {
	currPage: number
	maxPage: number
	handleUpdateCurrentPage: (value: number) => void
}

export default function Pagination({
	currPage,
	maxPage,
	handleUpdateCurrentPage
}: PropsTypes) {
	const [pageList, setPageList] = useState<string[]>([])

	useEffect(() => {
		const uniquePages = pageMaker(currPage, maxPage)

		if (uniquePages) {
			setPageList(Array.from(uniquePages))
		}
	}, [currPage, maxPage]) // useEffect will run whenever currPage changes

	const handleButtonClick = (value: string) => {
		if (value === 'Prev') {
			handleUpdateCurrentPage(currPage - 1)
		} else if (value === 'Next') {
			handleUpdateCurrentPage(currPage + 1)
		} else {
			handleUpdateCurrentPage(+value)
		}
	}

	return (
		<section className='mt-4 flex'>
			{pageList.map((page: string) => (
				<button
					className={`px-2 ${
						page === currPage.toString() ? 'border border-black rounded-md' : ''
					} ${currPage === maxPage && page === 'Next' ? 'text-gray-300' : ''} ${
						currPage === 1 && page === 'Prev' ? 'text-gray-300' : ''
					}`}
					key={page}
					onClick={() => handleButtonClick(page)}
					disabled={
						(currPage === maxPage && page === 'Next') ||
						(currPage === 1 && page === 'Prev') ||
						page === '...' ||
						page === '..'
					}
				>
					{page}
				</button>
			))}
		</section>
	)
}
