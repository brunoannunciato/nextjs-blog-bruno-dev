import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { remark } from 'remark'
import Prism from 'remark-prism'
import html from 'remark-html'


const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = () => {

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
    console.log({post})
    return {
      ...post,
      date: format(post.date, 'dd/MM/yyyy')
    }
  })

  return formatedDate
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')


  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(Prism)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
    date: format(matterResult.data.date, 'dd/MM/yyyy')
  }
}