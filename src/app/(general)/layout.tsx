import GeneralLayout from '@/layouts/general'
type Props = {
	children: React.ReactNode
}
export default function RootGeneralLayout({children}: Props) {
	return (
		<GeneralLayout>
			<h1>ROOT General Layout</h1>
			{children}
		</GeneralLayout>
	)
}
