import React from 'react'
import Title from './Title'

interface propsTypes {
	children: React.ReactNode
}
const Layout: React.FC<propsTypes> = props => {
	return (
		<main>
			<Title />
			<section className='p-10'>{props.children}</section>
		</main>
	)
}

export default Layout
