import { wp } from './wpapi-init'

import { menuPrimary } from './menus'

export async function getAllPages(_page = 1) {
  return wp.pages().page(_page).perPage(20).then((response) => {
    if (! response._paging || _page === response._paging.totalPages) {
      return response
    }
    // Request the next page and return both responses as one collection
    return Promise.all([
        response,
        getAllPages(++_page)
      ]).then((responses) => {
        return responses.flat()
      })
  })
}

export async function getPageById(id) {
  return await wp.pages().id(id)
}

export async function getPageBySlug(slug) {
  const res = await wp.pages().param('slug', slug)
  return res[0]
}

export async function getPageDataById(id) {
  const _id = extractPageId(id)
  const pageData = await getPageById(_id)
  return {
    id: id,
    ...pageData
  }
}

export async function getPageDataBySlug(slug) {
  const pageData = await getPageBySlug(slug)
  return {
    slug: slug,
    ...pageData
  }
}

export async function getAllPageIds() {
  const pages = await getAllPages()

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

  return pages.map((item) => {
    return {
      params: {
        id: item.slug + '--' + String(item.id)
      }
    }
  })
}

export function getAllPageIdsCatchAll() {
  const parsedMenu = []

  menuPrimary.forEach((item) => {
    parsedMenu.push({
      params: {
        slug: [item.slug]
      }
    })

    if (item.children.length) {
      item.children.forEach((child) => {
        parsedMenu.push({
          params: {
            slug: [item.slug, child.slug]
          }
        })
      })
    }
  })

  return parsedMenu

  // return [
  //   {
  //     params: {
  //       slug: ['vaccines']
  //     }
  //   },
  //   {
  //     params: {
  //       slug: ['vaccines', 'ingredients']
  //     }
  //   },
  //   {
  //     params: {
  //       slug: ['emf']
  //     }
  //   }
  // ]
}

function extractPageId(id) {
  const key = '--'
  const keyLength = key.length
  return id.substring(id.lastIndexOf(key) + keyLength)
}

// export async function getAll(request) {
//   return request.then((response) => {
//     console.log('response', response)
//     console.log('response._paging', response._paging)

//     if (! response._paging || ! response._paging.next) {
//       console.log('no paging, returning res')
//       return response
//     }
//     // Request the next page and return both responses as one collection
//     // _paging.next is a WPRequest object pre-bound to next page
//     return Promise.all([
//         response,
//         getAll(response._paging.next)
//       ]).then((responses) => {
//         console.log('flattening...', responses)
//         return responses.flat()
//       });
//   })
// }
