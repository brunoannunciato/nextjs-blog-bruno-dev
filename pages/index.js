import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout'
import PostLink from '../components/PostLink'

import styles from './styles/home.module.scss'
import { getSortedPostsData } from '../lib/posts'

export default function Home({lastPosts}) {

  return (
    <Layout>
      <section className={ styles.welcomeSection }>
          <h2 className={ styles.subtitle }>
            Prazer 👋🏼
          </h2>

        <div className={ styles.welcomeContent }>
          <p className="text">
            Sou <strong>Bruno Annunciato</strong>, desenvolvedor front-end desde 2016 e bacharel em Design Digital pela UAM em 2019. Atualmente atuo no time da Red Ventures Brasil. <br/><br/>
            <Link href="/sobre-mim">
              <a>
                Saiba mais sobre mim
              </a>
            </Link>
          </p>

          <div className={ styles.imageWrapper }>
            <Image
              src="/images/profile-image-3.jpg"
              alt="Foto de Bruno Annunciato na varanda do escritório"
              placeholder="blur"
              blurDataURL="/images/profile-image.jpg"
              width={200}
              height={200}
            />
          </div>
        </div>
      </section>

      <section className={ styles.section }>
        <h2 className={ styles.subtitle }>
          Últimos posts ✏️
        </h2>

        <div className='section-content'>
          {
            lastPosts.map(post => {
              return <PostLink
                key={ post.id }
                title={ post.title }
                date={ post.date }
                url={ post.id }
                category={ post.category }
              />
            })
          }

          <Link href="/blog">
            <a>
              Ver outros
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = () => {
 const allPostsData = getSortedPostsData()

 const lastPosts = allPostsData.filter((_, index) => {
    return index < 3
  })

  return {
    props: {
      lastPosts
    }
  }
}