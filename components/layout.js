import Head from 'next/head'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'People VS'
export const siteTitle = 'People VS'

export default function Layout({ children, home }) {
  return (
    <div className="site clearfix">

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="People VS built with Next.js"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="/people-vs-open-graph-2.jpg"/>
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