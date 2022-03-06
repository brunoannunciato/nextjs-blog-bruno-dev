import { useState, useEffect } from 'react'
import styles from './social-share.module.scss'

import { SocialIcon } from "react-social-icons"

const SocialShare = () => {
  const [urls, setUrl] = useState([])
  
  useEffect(() => {
    const currentUrl = window.location.href
    const message = (params) => encodeURIComponent(`Veja este post ${currentUrl}${params}`)

    setUrl([
      `https://twitter.com/intent/tweet?text=${message('&utm_source=twitter&utm_medium=share-bar')}`,
      `https://api.whatsapp.com/send?text=${message('&utm_source=whatsapp&utm_medium=share-bar')}`,
      `https://www.facebook.com/sharer.php?u=${encodeURIComponent(currentUrl + '&utm_source=facebook&utm_medium=share-bar')}`,
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl + '&utm_source=linkedin&utm_medium=share-bar')}`,
      `https://telegram.me/share/url?url=${encodeURIComponent(currentUrl + '&utm_source=telegram&utm_medium=share-bar')}`
    ])
  }, [])

  return (
    <div className={ styles.social }>
      <p>
        Compartilhe em:
      </p>

      <div className={styles.icons}>
        {
          urls.map((url, index) => {
            return <SocialIcon key={`icon-${index}`} target="_blank" url={ url } style={{ height: 25, width: 25 }}/>
          })
        }
      </div>
    </div>
  )
}

export default SocialShare