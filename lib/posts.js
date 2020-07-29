import fetch from 'node-fetch'
import { wp } from './wpapi-init'

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

export async function getCategoryIdBySlug(slug) {
  const cats = await wp.categories().slug(slug)
  return cats[0].id
}

export async function getPostsByCategory(slug) {
  const catId = await getCategoryIdBySlug(slug)
  return await wp.posts().categories(catId)
}
