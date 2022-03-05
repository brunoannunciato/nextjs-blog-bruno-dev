import { useState, useEffect } from 'react'
import styles from './social-share.module.scss'

import { SocialIcon } from "react-social-icons"

const SocialShare = () => {
  const [urls, setUrl] = useState([])
  
  useEffect(() => {
    const currentUrl = window.location.href
    const message = encodeURIComponent(`Veja este post ${currentUrl}`)

    setUrl([
      `https://twitter.com/intent/tweet?text=${message}`,
      `https://api.whatsapp.com/send?text=${message}`,
      `https://www.facebook.com/sharer.php?u=${currentUrl}`,
      `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
      `https://telegram.me/share/url?url=${currentUrl}`
    ])
  }, [])

  return (
    <div className={ styles.social }>
      <p>
        Compartilhe em:
      </p>

      <div className={styles.icons}>
        {
          urls.map(url => {
            return <SocialIcon  target="_blank" url={ url } style={{ height: 25, width: 25 }}/>
          })
        }
      </div>
    </div>
  )
}

export default SocialShare