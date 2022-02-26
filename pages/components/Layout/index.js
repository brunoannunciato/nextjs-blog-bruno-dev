import Link from "next/link"

import styles from './layout.module.scss'

const Layout = ({children}) => {
  return (
    <div className="container">
      <header className={ styles.header }>
        <h1 className={ styles.title }>
          Bruno Annunciato
        </h1>

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
    </div>
  )
}

export default Layout