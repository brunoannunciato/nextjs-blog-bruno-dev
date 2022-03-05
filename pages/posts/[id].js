import Layout from '../../components/Layout'

import { getAllPostIds, getPostData } from '../../lib/posts'
import styles from  './posts.module.scss'

const Post = ({postData}) => {
  return (
    <Layout>
      {console.log(postData)}

      <section className={ styles.section }>
        <div className={ styles.header }>
          <h1 className={ styles.title }>
            { postData.title }
          </h1>

          <p className={ styles.info }>
            Publicado em: <strong>{ postData.date }</strong> na categoria <strong>{ postData.category }</strong>
          </p>

          <div className={styles.content} dangerouslySetInnerHTML={{__html: postData.contentHtml}} /> 
        
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