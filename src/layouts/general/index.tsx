'use client'
import {useState} from 'react'
// ===================================
import {MoonIcon, SunIcon} from '@heroicons/react/24/solid'
// =========== components ============
import {ButtonUI} from '@/components/button'

type Props = {
	children: React.ReactNode
}
export default function GeneralLayout({children}: Props) {
	const [mode, setMode] = useState<string>('light')

	const lightStyle = 'hover:bg-slate-400 bg-slate-200'
	const darkStyle = 'hover:bg-slate-200 bg-slate-400 text-amber-400'

	const toggleMode = () => {
		setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
	}
	return (
		<div>
			<nav className='flex justify-end items-center py-2 px-6'>
				<ButtonUI
					style={mode === 'light' ? lightStyle : darkStyle}
					handleClick={toggleMode}
				>
					{mode === 'light' ? (
						<MoonIcon className='h-8 w-8' />
					) : (
						<SunIcon className='h-8 w-8' />
					)}
				</ButtonUI>
			</nav>
			<h1>General Layout</h1>
			<h1>current mode: {mode}</h1>
			{children}
		</div>
	)
}
