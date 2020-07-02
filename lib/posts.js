import fetch from 'node-fetch'
import { wp } from './wpapi-init'

// export async function getPosts() {
//   const url = 'https://pplvs.org/wp-json/wp/v2/posts'
//   const res = await fetch(url);
//   return res.json();
// }

export async function getPosts() {
  return await wp.posts();
}

export async function getPostById(id) {
  return await wp.posts().id(id)
}

export async function getPostBySlug(slug) {
  const res = await wp.posts().param('slug', slug)
  return res[0]
}

export async function getPostData(id) {
  const _id = extractPostId(id)
  const postData = await getPostById(_id)
  return {
    id: id,
    ...postData
  }
}

export async function getPostDataBySlug(slug) {
  const postData = await getPostBySlug(slug)
  return {
    slug: slug,
    ...postData
  }
}

export async function getAllPostIds() {
  const posts = await getPosts()

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return posts.map((item) => {
    return {
      params: {
        id: item.slug + '--' + String(item.id)
      }
    }
  })
}

function extractPostId(id) {
  const key = '--'
  const keyLength = key.length
  return id.substring(id.lastIndexOf(key) + keyLength)
}
