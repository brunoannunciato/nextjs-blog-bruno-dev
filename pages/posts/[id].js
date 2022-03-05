import Layout from '../../components/Layout'

import { getAllPostIds, getPostData } from '../../lib/posts'
import styles from  './posts.module.scss'

const Post = ({postData}) => {
  return (
    <Layout>
      <section className={ styles.section }>
        <div className={ styles.header }>
          <h1 className={ styles.title }>
            { postData.title }
          </h1>

          <p className={ styles.info }>
            Publicado em: <strong>{ postData.date }</strong> na categoria <strong>{ postData.category }</strong>
          </p>

          <div className={styles.content} dangerouslySetInnerHTML={{__html: postData.contentHtml}} /> 
        
          <div className={styles.comments}>
          <script src="https://utteranc.es/client.js"
                  repo="brunoannunciato/nextjs-blog-bruno-dev"
                  issue-term="url"
                  theme="github-light"
                  crossorigin="anonymous"
                  async>
          </script>
          </div>
        </div>

      </section>
    </Layout>
  )
}

export const  getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params}) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default Post