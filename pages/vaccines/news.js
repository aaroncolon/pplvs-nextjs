import Link from 'next/link'
import { useSWRInfinite } from 'swr'

import { useState } from 'react'
import { wp } from '../../lib/wpapi-init'
import Layout from '../../components/Layout'
import Head from 'next/head'
import generatePageTitle from '../../utilities/pageTitle'

const PER_PAGE = 10

async function getCatIdFromSlug(slug) {
  const cats = await wp.categories().slug(slug)
  _catId = cats[0].id
  return _catId
}

let _catId = null
const fetcher = async (url, pageIndex) => {
  let categoryId = _catId
  if (!categoryId) {
    categoryId = await getCatIdFromSlug('vaccines')
  }
  return await wp.posts().categories(categoryId).page(pageIndex + 1).perPage(PER_PAGE)
}

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
const getKey = (pageIndex, previousPageData) => {
  // if (previousPageData && !previousPageData.length) return null // reached end
  if (previousPageData && previousPageData._paging.totalPages === pageIndex) return null // reached end
  return [`https://api.pplvs.org/wp-json/wp/v2/posts?page=${pageIndex}&category=vaccines`, pageIndex] // SWR key
}

export default function News() {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher)

  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = !data || (data && data[data.length - 1].length === 0)
  const isReachingEnd = isEmpty || (data && data[data.length - 1].length < PER_PAGE)
  const isRefreshing = isValidating && data && data.length === size

  return (
    <Layout>
      <Head>
        <title>{generatePageTitle('Vaccines News')}</title>
        <meta name="og:title" content={generatePageTitle('Vaccines News')} />
      </Head>

      <h1>Vaccines News</h1>

      <ul>
        {(!data) ? 
          <div>Loading...</div> : 
          data.map((items) => {
          return items.map((item) => {
            const _id = item.slug + '--' + String(item.id)
            return (
              <li key={item.id}>
                <Link href="/posts/[id]" as={`/posts/${_id}`}>
                  <a dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                </Link>
              </li>
            )
          })
        })}
      </ul>

      <p>
        <button
          className="button expanded"
          onClick={() => setSize(size + 1)}
          disabled={isLoadingMore || isReachingEnd}>
          {
            (isLoadingMore)
            ? "Loading..."
            : (isReachingEnd)
            ? "No More Posts"
            : "Load More..."
          }
        </button>
      </p>
    </Layout>
  )
}
