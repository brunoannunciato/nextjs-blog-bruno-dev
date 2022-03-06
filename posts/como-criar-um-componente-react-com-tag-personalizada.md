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
  return isButton ? (
    <button {...props}> {children} </button>
  ) : (
    <a {...props}> {children} </a>
  )
}

export default Button
```

Porém, dessa forma, criei um outro problema: qualquer mudança que eu quisesse fazer na tag `button` teria que fazer na tag `a`, e o contrário também. Adicionar atributos e classes seria um trabalho repetitivo e eventualmente alguém poderia fazer uma alteração em um e não fazer no outro, então comecei a pesquisar possíveis soluções, até que cheguei [nesta página do stackoverflow](https://stackoverflow.com/questions/33471880/dynamic-tag-name-in-react-jsx) e descobri que é possível criar componentes onde a tag de nível mais alto é variável e pode ser passada por props, apenas criando uma variável que comece com letra maiúscula, como a `CustomTag` no exemplo abaixo:

```jsx
const Button = ({ tagName = "button", children, ...props }) => {
  const CustomTag = tagName

  return <CustomTag {...props}> {children} </CustomTag>
};

export default Button;
```

Isso é possível pelo fato do JSX interpretar palavra que comece com letra maiúscula dentro dos sinais de menor e maior como um componente React. Dessa forma, ao chamar o componente em outro arquivo, só é preciso passar a prop tagName com o nome da tag desejada, exemplo:

```jsx
import Button from './Button'

export default function App() {
  return (
    <div className="App">
      <Button tagName="a" href="https://bruno.dev">Ir para o site</Button>
    </div>
  )
}
```

Para ver um exemplo simples com o código aplicado, fiz esse [Code sandBox](https://codesandbox.io/s/custom-tag-name-react-component-5g9041).