import Layout from '../../components/Layout'
import Head from 'next/head'

import { getAllPostIds, getPostData } from '../../lib/posts'
import styles from  './posts.module.scss'
import Comments from '../../components/Comments'
import SocialMetaTags from '../../components/SocialMetaTags'

const Post = ({postData}) => {
  return (
    <Layout>
      <Head>
        <SocialMetaTags
          title={ postData.title }
          description={ postData.description ?? 'Veja esta postagem do blog bruno.dev' }
          date={ postData.date }
          coverImage="/assets/img/cover-image.jpeg"
        />
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

        <Comments
          title="Se acha que está postagem pode ser útil para mais alguém, você pode compartilhar este link em suas redes sociais. <br/>Caso queira me ajudar ainda mais, deixe um comentário abaixo com seu feedback. 😄"
        />

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