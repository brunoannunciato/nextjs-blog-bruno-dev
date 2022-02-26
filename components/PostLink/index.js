import Link from 'next/link'
import styles from './post-link.module.scss'

const PostLink = ({url, title, date}) => {
  return (
    <div className={ styles.postLink }>
        <h3 className={ styles.title }>
          <Link href={url}>
            <a>
              { title }
            </a>
          </Link>
        </h3>

        <span className={ styles.date }>
          { date }
        </span>
    </div>
  )
}

export default PostLink