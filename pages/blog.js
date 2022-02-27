import Layout from '../components/Layout'
import PostLink from '../components/PostLink'

import { getSortedPostsData } from '../lib/posts'

import styles from './styles/about.module.scss'

const blog = ({allPostsData}) => {
  return (
    <Layout>
      <div className="content">
        <section className={ styles.section }>
          <h2 className="subtitle">
            Posts 📚
          </h2>

          {
            allPostsData.map(post => {
              return <PostLink
                title={ post.title }
                date={ post.date }
                url={ post.id }
                category={ post.category }
              />
            })
          }
        </section>
      </div>

      
    </Layout>
  )
}

export const getStaticProps = () => {
  const allPostsData = getSortedPostsData()
 
   return {
     props: {
       allPostsData
     }
   }
 }

export default blog