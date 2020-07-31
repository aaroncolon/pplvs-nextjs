import { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layout'
import Head from 'next/head'
import generatePageTitle from '../../utilities/pageTitle'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{generatePageTitle(postData.title.rendered)}</title>
        <meta name="og:title" content={generatePageTitle(postData.title.rendered)} />
      </Head>
      <h1 dangerouslySetInnerHTML={{ __html: postData.title.rendered }} />
      <p dangerouslySetInnerHTML={{ __html: postData.content.rendered }} />
      <h2>Article URLs</h2>
      <ul>
        {doArticleLinks(postData)}
      </ul>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

function doArticleLinks(data) {
  if (! data.meta.ac_url_article || ! data.meta.ac_url_article.length) {
    return <li>No URLs found.</li>
  }
  return data.meta.ac_url_article.map((item, index) => {
    return (
      <li key={'article-' + index}>
        <a target="_blank" href={item}>{item}</a>
      </li>
    )
  })
}
