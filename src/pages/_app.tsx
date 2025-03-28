import type { AppProps } from "next/app";

import '../app/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => <Component {...pageProps} />

export default MyApp
