import Link from "next/link"
import Head from "next/head"

import Footer from "../Footer"

import styles from './layout.module.scss'

const Layout = ({children}) => {
  return (
    <div className="container">
      <Head>
        <title>
          Bruno Annunciato 🧑🏻‍💻
        </title>
      </Head>

      <header className={ styles.header }>
        <Link href="/">
          <h1 className={ styles.title }>
            Bruno Annunciato
          </h1>
        </Link>

        <nav>
          <ul className={ styles.navList }>
            <li>
              <Link href="/blog">
                <a className={ styles.link }>Blog</a>
              </Link>
            </li>

            <li>
              <Link href="/sobre-mim">
                <a className={ styles.link }>Sobre mim</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main">
        { children }
      </main>

      <Footer/>
    </div>
  )
}

export default Layout