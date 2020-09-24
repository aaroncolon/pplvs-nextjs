import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import { getPostsByCategory } from '../lib/posts'
import { getPageBySlug } from '../lib/pages'

// Static Generation / SSG / Pre-Rendering
export async function getStaticProps() {
  const pageHome = await getPageBySlug('home')

  return {
    props: {
      pageHome
    },
    revalidate: 1800
  }
}

export default function Home({ pageHome, postsData }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <div dangerouslySetInnerHTML={{ __html: pageHome.content.rendered }} />
      </section>
    </Layout>
  )
}
