import fetch from 'node-fetch'
import { wp } from './wpapi-init'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher2 = async function(url) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await fetch(url, options)
  return res.json()
}

async function fetcherWPAPI() {
  return await wp.posts()
}

export function swrPosts() {
  const { data, error } = useSWR('https://pplvs.org/wp-json/wp/v2/posts', fetcherWPAPI)

  if (error) {
    return <div>Failed to Load</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return data.map((item) => {
    const _id = item.slug + '--' + String(item.id)
    return (
      <li key={item.id}>
        <Link href="/posts/[id]" as={`/posts/${_id}`}>
          <a dangerouslySetInnerHTML={{ __html: item.title.rendered }}></a>
        </Link>
      </li>
    )
  })
}
