import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Head from "next/head";

/* #TA3-02
   - meta data added here will be added to every page
   - meta data will be merged and conflicts resolved 
     by nextjs
     - meta data defined in the component will override
       the meta dada defined here if the names collide 
*/

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Events - Default Title</title>
        <meta name="description" content="default description" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
