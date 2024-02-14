'use client'
import {useState, useEffect} from 'react'
// ===================================
import {MoonIcon, SunIcon} from '@heroicons/react/24/solid'
import {useTheme} from 'next-themes'
// =========== components ============
import {ButtonUI} from '@/components/button'

type Props = {
	children: React.ReactNode
}

export default function GeneralLayout({children}: Props) {
	const [mounted, setMounted] = useState(false)
	const {systemTheme, theme, setTheme} = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	const lightStyle = 'hover:bg-slate-300 bg-slate-200 border-black'
	const darkStyle = 'hover:bg-gray-800 bg-gray-600 text-amber-400'
	const handleToggleMode = () => {
		let currTheme = currentTheme
		if (currentTheme === 'light') {
			currTheme = 'dark'
		} else {
			currTheme = 'light'
		}
		setTheme(currTheme)
	}
	return (
		<div>
			<nav className='flex justify-end items-center py-2 px-4'>
				{/* <ButtonUI
					style={currentTheme === 'light' ? lightStyle : darkStyle}
					handleClick={handleToggleMode}
				>
					{currentTheme === 'light' ? (
						<MoonIcon className='h-6 w-6' />
					) : (
						<SunIcon className='h-6 w-6' />
					)}
				</ButtonUI> */}
				<div onClick={handleToggleMode}>
					{currentTheme === 'light' ? (
						<MoonIcon className='h-6 w-6 shadow-md' />
					) : (
						<SunIcon className='h-6 w-6 text-amber-400' />
					)}
				</div>
			</nav>

			<h1 className='text-center text-[30px] font-bold '>TIK TAK TOE</h1>

			{children}
		</div>
	)
}
