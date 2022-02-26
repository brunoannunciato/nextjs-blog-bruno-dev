import Link from "next/link"

import Footer from "../Footer"

import styles from './layout.module.scss'

const Layout = ({children}) => {
  return (
    <div className="container">
      <header className={ styles.header }>
        <Link href="/">
          <h1 className={ styles.title }>
            Bruno Annunciato
          </h1>
        </Link>

        <nav>
          <ul className={ styles.navList }>
            <li>
              <Link href="/">
                <a className={ styles.link }>Blog</a>
              </Link>
            </li>

            <li>
              <Link href="/">
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