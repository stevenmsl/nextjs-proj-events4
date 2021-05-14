import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Head from "next/head";
import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Events - Default Title</title>
          <meta name="description" content="default description" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />;
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
