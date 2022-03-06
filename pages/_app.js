import Script from 'next/script'
import '../styles/globals.scss'
import '../styles/prism-theme.scss'

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />

    <Script strategy='lazyOnload' async src="https://www.googletagmanager.com/gtag/js?id=UA-120224377-2"/>
    <Script strategy='lazyOnload'>
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());

      gtag('config', 'UA-120224377-2');
      `}
    </Script>
  </>
}

export default MyApp
