import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from '@/oldComponents/ui/Layout'
import Head from 'next/head'
// for redux settings
import {Provider as ReduxProvider} from 'react-redux'
// import indexStore from "@/reduxToolkit/indexStore/indexStore";
// for redux persistor
import {indexStore, persistor} from '@/reduxToolkit/indexStore/indexStore'
import {PersistGate} from 'redux-persist/integration/react'

export default function App({Component, pageProps}: AppProps) {
	return (
		<ReduxProvider store={indexStore}>
			<PersistGate loading={null} persistor={persistor}>
				<Layout>
					<Head>
						<title>TIK-TAK-TOE</title>
						<meta name='viewport' content='width=device-width, initial-scale=1.0' />
						<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
						<meta name='description' content='Tik Tak Toe game using NextJS' />
					</Head>
					<Component {...pageProps} />
				</Layout>
			</PersistGate>
		</ReduxProvider>
	)
}
