import Layout from '../../components/Layout'
import Head from 'next/head'

import { getAllPostIds, getPostData } from '../../lib/posts'
import styles from  './posts.module.scss'
import Comments from '../../components/Comments'

const Post = ({postData}) => {
  return (
    <Layout>
      <Head>

      <meta property="og:site_name" content="Bruno Annunciato" />
      <meta property="og:title" content={ postData.title } />
      <meta property="og:description" content={ postData.description ?? 'Veja esta postagem do blog bruno.dev' }/>
      <meta property="og:image" itemprop="image" content="/assets/img/cover-image.jpeg" />
      <meta property="og:type" content="website" />
      <meta property="og:updated_time" content={postData.date} />

      </Head>

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