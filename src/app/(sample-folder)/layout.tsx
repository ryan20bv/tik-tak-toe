type Props = {
	children: React.ReactNode
}
export default function RootSampleLayout({children}: Props) {
	return (
		<div>
			<h1>Root Sample Layout</h1>
			{children}
		</div>
	)
}
