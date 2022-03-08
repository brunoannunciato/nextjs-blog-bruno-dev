import Link from 'next/link'
import Layout from '../components/Layout'

const NotFound = () => {
  return (
    <Layout>
      <h2 className="title">
        Ops... Parece que o conteúdo que você está procurando não existe.
      </h2>

      Para saber mais sobre mim, {' '}
      <Link href="/sobre-mim">
        <a>clique aqui</a>
      </Link>, caso queira ler meus posts, acesse a <Link href="/blog"><a>página de posts</a></Link>.
    </Layout>
  )
}

export default NotFound