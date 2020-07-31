import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout'
import generatePageTitle from '../../utilities/pageTitle'
import Link from 'next/link'

import { getPosts } from '../../lib/posts'
import { getPageBySlug } from '../../lib/pages'

import { swrPosts } from '../../lib/swrPosts'
import { usePagination } from '../../lib/usePagination'

// Static Generation / SSG / Pre-Rendering
export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: {
      posts
    }
  }
}

// Server-Side Rendering / SSR
// export async function getServerSideProps(context) {
//   const posts = await getPosts()
//   const pages = await getAllPages()
//   return {
//     props: {
//       posts,
//       pages
//     }
//   }
// }

function serverSidePosts(posts) {
  return posts.map((item) => {
    const _id = item.slug + '--' + String(item.id)
    return (
      <li key={item.id}>
        <Link href="/posts/[id]" as={`/posts/${_id}`}>
          <a dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
        </Link>
      </li>
    )
  })
}

// Client-side Rendering with SWR (stale-while-revalidate) React Hook
function clientSidePosts() {
  return swrPosts()
}

export default function Demos({ posts }) {
  const { pages, isLoadingMore, loadMore, isReachingEnd } = usePagination('posts')

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <h2>Recent Articles (SWR Paginated)</h2>
        <ul>
          {pages}
        </ul>
        <p>
          <button
            onClick={loadMore}
            disabled={isLoadingMore || isReachingEnd}>
            Load More...
          </button>
        </p>
      </section>

      <section>
        <h2>Recent Articles (SWR)</h2>
        <ul>
          {clientSidePosts()}
        </ul>
      </section>

      <section>
        <h2>Recent Articles (Static Generation)</h2>
        <ul>
          {serverSidePosts(posts)}
        </ul>
      </section>
    </Layout>
  )
}
