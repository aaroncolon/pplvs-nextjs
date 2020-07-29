import Link from 'next/link'
import useSWR, { useSWRPages } from 'swr'
import { wp } from './wpapi-init'

let _catId = null
const fetcher = async function(url, page = 1, categoryId = _catId) {
  if (!categoryId) {
    const cats = await wp.categories().slug('coronavirus')
    categoryId = cats[0].id
    _catId = categoryId
  }
  return await wp.posts().categories(categoryId).page(page).perPage(10)
}

let _currPage = 1
export const usePagination = (path) => {
  const { pages, isLoadingMore, loadMore, isReachingEnd } = useSWRPages(
    // key of this page
    'category-page',
    ({ offset, withSWR }) => {
      // `offset` is returned from the next argument
      // in this case, WPAPI uses page numbers in the _paging key of the result array
      // const url = offset || `https://pplvs.org/wp-json/wp/v2/${path}`

      // here we pass a url to use as a useSWR cache key, 
      // but ignore it in fetcher() since we are using WPAPI library
      const url = `https://api.pplvs.org/wp-json/wp/v2/${path}`
      const pageNext = offset
      const { data: result, error} = withSWR(useSWR([url, pageNext], fetcher))

      if (error) return <div>Something went wrong</div>
      if (!result) return <div>Loading...</div>

      return result.map((item) => {
        const _id = item.slug + '--' + String(item.id)
        return (
          <li key={item.id}>
            <Link href="/posts/[id]" as={`/posts/${_id}`}>
              <a dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
            </Link>
          </li>
        )
      })
    },
    // a function accepts a SWR's `data`, and returns the `offset` of the next page (or null)
    (dataSWR) => {
      if (_currPage < dataSWR.data._paging.totalPages) {
        return ++_currPage
      }
      return null
    },
    // (optional) outside deps of your Page component. in this case it's empty
    []
  )

  return { pages, isLoadingMore, loadMore, isReachingEnd } 
}
