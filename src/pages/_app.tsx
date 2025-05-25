import type { AppProps } from "next/app";
import Head from "next/head"

import '../app/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
<>
  <Head>
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/icon_192.png"></link>
    <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
  </Head>
  <Component {...pageProps} />
  </>
)

export default MyApp
