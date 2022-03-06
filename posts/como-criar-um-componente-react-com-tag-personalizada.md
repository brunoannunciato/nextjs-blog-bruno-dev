---
layout: post
date: 2022-03-06 01:43:14
title: Como criar um componente React com tag personalizada.
description: Passando a tag HTML de um componente via props
category: Front-end
---
Dia desses estava eu desenvolvendo o componente de botão do design system da empresa onde trabalho e me deparei com um problema, um botão pode ser uma tag `button` mas também pode ser uma tag `a`, caso sua função seja redirecionar para outra página, então optei por criar uma condição no meu componente, onde lia a prop isButton, e caso fosse `true` usaria `button` se não, usaria `a`, ficando assim:

```jsx
const Button = ({ isButton, children, ...props }) => {
  return (
    isButton ? <button {...props}> { children } </button> : <a {...props}> { children } </a>
  )
}

export default Button
```