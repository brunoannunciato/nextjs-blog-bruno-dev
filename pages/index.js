import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout'
import PostLink from '../components/PostLink'

import styles from './styles/home.module.scss'

export default function Home({imageUrl}) {
  return (
    <Layout>
      <section className={ styles.welcomeSection }>
          <h2 className={ styles.subtitle }>
            Prazer!
          </h2>

        <div className={ styles.welcomeContent }>
          <p className="text">
            Olá! Sou <strong>Bruno Annunciato</strong>, desenvolvedor front-end desde 2016 e bacharel em Design Digital pela UAM em 2019. Atualmente atuo no time da Red Ventures Brasil. <br/><br/>
            
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
          Últimos posts
        </h2>

        <div className='section-content'>
          <PostLink
            title="Lorem Ipsum Dollar set"
            date="04/04/1998"
            url="#"
          />

          <PostLink
            title="Lorem Ipsum Dollar set"
            date="04/04/1998"
            url="#"
          />
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async () => {
  console.log('AAAA')
  const gitData = await fetch('https://api.github.com/users/brunoannunciato') 
  const response = await gitData.json()

  console.log(response)

  return {
    props: {
      imageUrl: response.avatar_url
    }
  }
}