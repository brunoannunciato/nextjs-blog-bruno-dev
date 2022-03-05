import { useRef, useEffect } from 'react'

const Comments = () => {
  const parentRef = useRef(null)

  useEffect(() => {
    const parent = parentRef?.current
    const script = document.createElement('script')

    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('repo', 'brunoannunciato/nextjs-blog-bruno-dev')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('label', 'blog-comment')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', 'true')

    parent?.appendChild(script)

    return () => {
      while (parent?.firstChild) {
        parent?.removeChild(parent?.lastChild)
      }
    }
  }, [parentRef])

  return (
    <div>
      <div ref={ parentRef }></div>
    </div>
  )
}

export default Comments