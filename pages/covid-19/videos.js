import Layout from '../../components/Layout'
import Head from 'next/head'
import generatePageTitle from '../../utilities/pageTitle'
import { getPageDataBySlug } from '../../lib/pages'
import useSWR from 'swr'
import { wp } from '../../lib/wpapi-init'

const fetcher = async function(id) {
  return await wp.pages().id(id)
}

export default function Videos({ pageData }) {
  return (
    <Layout>
      <Head>
        <title>{generatePageTitle('Covid-19 ' + pageData.title.rendered)}</title>
        <meta name="og:title" content={generatePageTitle('Covid-19 ' + pageData.title.rendered)} />
      </Head>

      <h1>Covid-19 {pageData.title.rendered}</h1>

      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
    </Layout>
  )
}

// SSG + Incremental Static Regeneration (Next.js 9.5+)
export async function getStaticProps() {
  const pageData = await getPageDataBySlug('videos', 'covid-19')
  return {
    props: {
      pageData
    },
    revalidate: 900
  }
}
