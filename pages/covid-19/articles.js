import Layout from '../../components/Layout'
import Head from 'next/head'
import generatePageTitle from '../../utilities/pageTitle'
import { usePagination } from '../../lib/usePaginationCategory'

export default function Articles() {
  const { pages, isLoadingMore, loadMore, isReachingEnd } = usePagination('posts/category')

  return (
    <Layout>
      <Head>
        <title>{generatePageTitle('Covid-19 Articles')}</title>
      </Head>

      <h1>Covid-19 Articles</h1>

      <ul>
        {pages}
      </ul>

      <p>
        <button
          className="button expanded"
          onClick={loadMore}
          disabled={isLoadingMore || isReachingEnd}>
          Load More...
        </button>
      </p>
    </Layout>
  )
}
