import Layout from '../../components/Layout'
import Head from 'next/head'
import generatePageTitle from '../../utilities/pageTitle'
import { getPageDataBySlug } from '../../lib/pages'
import useSWR from 'swr'
import { wp } from '../../lib/wpapi-init'

const fetcher = async function(id) {
  return await wp.pages().id(id)
}

export default function Videos(props) {
  // hydrate with SWR
  const { data, error } = useSWR(props.pageData.id, fetcher, { initialData: props.pageData })

  if (error) return <div>Failed to load.</div>
  
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>{generatePageTitle(data.title.rendered)}</title>
      </Head>

      <h1>Covid-19 {data.title.rendered}</h1>

      <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
    </Layout>
  )
}

// SSG
export async function getStaticProps() {
  const pageData = await getPageDataBySlug('videos', 'covid-19')
  return {
    props: {
      pageData
    }
  }
}
