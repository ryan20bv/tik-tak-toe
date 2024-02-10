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
	const [mode, setMode] = useState<string>('light')
	const [mounted, setMounted] = useState(false)
	const {theme, setTheme} = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null
	const lightStyle = 'hover:bg-slate-300 bg-slate-200 hover:border-black'
	const darkStyle = 'hover:bg-gray-800 bg-gray-600 text-amber-400'

	const toggleMode = () => {
		setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
		let currTheme = mode
		if (mode === 'light') {
			currTheme = 'dark'
		} else {
			currTheme = 'light'
		}
		setTheme(currTheme)
	}
	return (
		<div>
			<nav className='flex justify-end items-center py-2 px-6'>
				<ButtonUI
					style={theme === 'light' ? lightStyle : darkStyle}
					handleClick={toggleMode}
				>
					{theme === 'light' ? (
						<MoonIcon className='h-8 w-8' />
					) : (
						<SunIcon className='h-8 w-8' />
					)}
				</ButtonUI>
			</nav>
			<h1>General Layout</h1>
			<h1 className='border bg-black dark:bg-white dark:text-black text-white'>
				current mode: {mode}
			</h1>
			<h1>current mode: {mode}</h1>
			<h1>current theme: {theme}</h1>
			{children}
		</div>
	)
}
