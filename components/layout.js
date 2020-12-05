import Head from 'next/head'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

import Link from 'next/link'

const name = 'People VS'
export const siteTitle = 'People VS'

export default function Layout({ children }) {
  return (
    <div className="site clearfix">

      <Head>
        <link rel="icon" href="https://pplvs.org/favicon.ico" />
        <meta
          name="description"
          content="People VS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://pplvs.org/people-vs-open-graph-2.jpg" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <Navigation />

      <main className="site-content">
        <div className="site-content__inner clearfix">
          {children}
        </div>
      </main>

      <Footer />

    </div>
  )
}
