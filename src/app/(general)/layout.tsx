type Props = {
	children: React.ReactNode
}
export default function GeneralLayout({children}: Props) {
	return (
		<div>
			<h1>General Layout</h1>
			{children}
		</div>
	)
}
