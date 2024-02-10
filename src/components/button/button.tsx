type Props = {
	children: React.ReactNode
	style?: string
	handleClick?: () => void
}
export default function ButtonUI({children, style, handleClick}: Props) {
	return (
		<button onClick={handleClick} className={`border px-2 rounded-lg  ${style}`}>
			{children}
		</button>
	)
}
