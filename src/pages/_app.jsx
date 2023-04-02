import '../styles/globals.scss'
import {Fragment} from "react";
import Head from "next/head";
import MainLayout from "@/components/layout/MainLayout";

function App({ Component, pageProps }) {
    const Layout = Component.Layout ?? MainLayout;
    return (
        <Layout>
            <Fragment>
                <Head>
                    <meta name="title" content="Thi thử THPT" property="og:title"/>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                    />
                    <link rel="icon" href="/icon1.png" />
                    <title>Thi thử THPT</title>
                </Head>
                <Component {...pageProps} />
            </Fragment>
        </Layout>
    )
}

export default App;
