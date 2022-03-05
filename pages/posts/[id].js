import Layout from '../../components/Layout'
import Script from 'next/script'

import { getAllPostIds, getPostData } from '../../lib/posts'
import styles from  './posts.module.scss'
import Comments from '../../components/Comments'

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
        </div>

        <div className={styles.content} dangerouslySetInnerHTML={{__html: postData.contentHtml}} /> 

        <Comments/>

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