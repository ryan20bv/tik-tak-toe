import {redirect} from 'next/navigation'
import {REDIRECT_TO_HOME_VIEW} from '@/config-global'

export default function RootPage() {
	redirect(REDIRECT_TO_HOME_VIEW)
}
