import Layout, { siteTitle } from '../components/Layout'
import generatePageTitle from '../utilities/pageTitle'
import Head from 'next/head'
import { getAllPageIdsCatchAll, getPageDataBySlug } from '../lib/pages'

export default function Page({ pageData, slug, slugParent }) {
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
  // Fetch necessary data for the page using params.slug
  const slug = params.slug[params.slug.length - 1]
  const slugParent = (params.slug.length > 1) ? params.slug[0] : ''
  const pageData = await getPageDataBySlug(slug, slugParent)
  return {
    props: {
      slug,
      slugParent,
      pageData
    }
  }
}
