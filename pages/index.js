import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import { getPosts } from '../lib/posts'
import { getPageBySlug } from '../lib/pages'

import { swrPosts } from '../lib/swrPosts'
import { usePagination } from '../lib/usePagination'

// Static Generation / SSG / Pre-Rendering
export async function getStaticProps() {
  const posts = await getPosts()
  const pageHome = await getPageBySlug('home')
  return {
    props: {
      posts,
      pageHome
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
        <Link href="/posts/[_id]" as={`/posts/${_id}`}>
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

export default function Home({ posts, pageHome }) {
  const { pages, isLoadingMore, loadMore, isReachingEnd } = usePagination('posts')

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <div dangerouslySetInnerHTML={{ __html: pageHome.content.rendered }} />
      </section>

      <section>
        <h2>
          SWR Paginated Posts
        </h2>
        <ul>
          {pages}
        </ul>
        <button
          onClick={loadMore}
          disabled={isLoadingMore || isReachingEnd}>
          Load More...
        </button>
      </section>

      <section>
        <h2>SWR Recent Articles</h2>
        <ul>
          {clientSidePosts()}
        </ul>
      </section>

      <section>
        <h2>Recent Articles</h2>
        <ul>
          {serverSidePosts(posts)}
        </ul>
      </section>
    </Layout>
  )
}
