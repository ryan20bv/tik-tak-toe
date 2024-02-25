import React from 'react'
import Title from './Title'

interface propsTypes {
	children: React.ReactNode
}
const Layout: React.FC<propsTypes> = props => {
	return (
		<main className='flex flex-col'>
			<Title />
			{props.children}
		</main>
	)
}

export default Layout
