import Link from 'next/link'
import styles from './post-link.module.scss'

const PostLink = ({url, title, date, category, key}) => {
  return (
    <div className={ styles.postLink } key={ key }>
        <h3 className={ styles.title }>
          <Link href={`/posts/${url}`}>
            <a>
              { title }
            </a>
          </Link>
        </h3>

        <div className={ styles.info }>
          <span className={ styles.category }>
            { category }
          </span>

          <span className={ styles.date }>
            <span className='hide-sm'>publicado em: </span> { date }
          </span>
        </div>
    </div>
  )
}

export default PostLink