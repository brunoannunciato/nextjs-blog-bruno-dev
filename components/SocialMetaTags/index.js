import If from '../If'

const SocialMetaTags = ({
  title,
  description,
  date,
  coverImage
}) => {
  return <>
    <meta property="og:site_name" content="Bruno Annunciato" />
    <If condition={title} renderIf={<title>{ postData.title }</title>} />
    <If condition={description} renderIf={<meta name="description" content={ description }/>} />
    <If condition={title} renderIf={ <meta property="og:title" content={ title } /> } />
    <If condition={title} renderIf={ <meta name="twitter:title" content={ title }/> } />
    <If condition={description} renderIf={<meta property="og:description" content={ description }/>} />
    <If condition={description} renderIf={<meta name="twitter:description" content={ description }/>} />
    <If condition={coverImage} renderIf={<meta property="og:image" itemProp="image" content={ coverImage } />} />
    <If condition={coverImage} renderIf={<meta name="twitter:image" content={ coverImage }/>} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image"/>
    <If condition={date} renderIf={<meta property="og:updated_time" content={ date } />} />
    <meta name="twitter:site" content="@brunoannunciato" />
    <meta name="robots" content="index, follow" />
  </>
}

export default SocialMetaTags