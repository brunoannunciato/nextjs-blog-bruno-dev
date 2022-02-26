import Link from "next/link"

const Layout = ({children}) => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">
          Bruno Annunciato
        </h1>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link href="/">
                <a>Blog</a>
              </Link>
            </li>

            <li className="header__nav-item">
              <Link href="/">
                <a>Sobre mim</a>
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