'use client'
import {ThemeProvider as NextThemeProvider} from 'next-themes'

type Props = {
	children: React.ReactNode
}
export default function Providers({children}: Props) {
	return <NextThemeProvider attribute='class'>{children}</NextThemeProvider>
}
