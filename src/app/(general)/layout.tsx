import GeneralLayout from '@/layouts/general'
type Props = {
	children: React.ReactNode
}
export default function RootGeneralLayout({children}: Props) {
	return <GeneralLayout>{children}</GeneralLayout>
}
