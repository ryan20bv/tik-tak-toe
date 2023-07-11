import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/ui/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>TIK-TAK-TOE</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<meta
					http-equiv='Content-Type'
					content='text/html;charset=UTF-8'
				/>
				<meta
					name='description'
					content='Tik Tak Toe game using NextJS'
				/>
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}
