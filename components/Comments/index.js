import { useRef, useEffect } from 'react'

const Comments = ({ title }) => {
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
      <p className="title" dangerouslySetInnerHTML={{__html: title}}/>
      <div ref={ parentRef }></div>
    </div>
  )
}

export default Comments