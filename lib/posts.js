import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseISO, format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData =() => {

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {

    const id = fileName.replace(/\.md$/, '')


    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')


    const matterResult = matter(fileContents)


    return {
      id,
      ...matterResult.data
    }
  })

  const sortedPosts =  allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })

  const formatedDate = sortedPosts.map(post => {
    return {
      ...post,
      date: format(post.date, 'dd/MM/yyyy')
    }
  })

  return formatedDate
}