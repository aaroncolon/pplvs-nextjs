import Layout from '../components/layout'
import { siteTitle } from '../components/layout'
import generatePageTitle from '../utilities/pageTitle'
import Head from 'next/head'
import { getAllPageIdsCatchAll, getPageDataBySlug } from '../lib/pages'

export default function Page({ pageData }) {
  return (
    <Layout>
      <Head>
        <title>{generatePageTitle(pageData.title.rendered)}</title>
      </Head>
      <h1 dangerouslySetInnerHTML={{ __html: pageData.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
    </Layout>
  )
}

export function getStaticPaths() {
  // Return a list of possible values for `slug`
  const paths = getAllPageIdsCatchAll()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const pageData = await getPageDataBySlug(params.slug[params.slug.length - 1])
  return {
    props: {
      pageData
    }
  }
}
