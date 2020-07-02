import Head from 'next/head'
import Header from '../components/Header'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'People VS'
export const siteTitle = 'People VS'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="People VS built with Next.js"/>
        <meta
          property="og:image"
          content="/people-vs-open-graph-2.jpg"/>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <main>
        {children}
      </main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <footer>
        <p>&copy; { new Date().getFullYear() } People VS</p>
        <img src="/pplvs-profile-small.png" alt="People VS Logo" className={utilStyles.footerImage} />
      </footer>

    </div>
  )
}