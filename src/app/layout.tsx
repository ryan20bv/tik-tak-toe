import '@/globals.css'

import {Metadata} from 'next'
import Providers from './providers'

export const metadata: Metadata = {
	title: 'Tik-Tak-Toe',
	description: 'Welcome to Next.js'
}

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
