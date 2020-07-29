import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import { getPosts } from '../lib/posts'
import { getPageBySlug } from '../lib/pages'

import { swrPosts } from '../lib/swrPosts'
import { usePagination } from '../lib/usePaginationCategory'

// Static Generation / SSG / Pre-Rendering
export async function getStaticProps() {
  const pageHome = await getPageBySlug('home')
  return {
    props: {
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

// function serverSidePosts(posts) {
//   return posts.map((item) => {
//     const _id = item.slug + '--' + String(item.id)
//     return (
//       <li key={item.id}>
//         <Link href="/posts/[id]" as={`/posts/${_id}`}>
//           <a dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
//         </Link>
//       </li>
//     )
//   })
// }

export default function Home({ pageHome }) {
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
        <h2>Recent Covid-19 Articles</h2>
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
      </section>
    </Layout>
  )
}
