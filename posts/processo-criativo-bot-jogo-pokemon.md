---
layout: post
date: 2025-05-01 14:59:14
title: "Processo criativo: como automatizei um jogo do Pokemon"
description: Automatizando tarefas executadas pelo navegador com javascript
category: Projetos
---


# Introdução
Estava entediado assistindo a uma partida de futebol bem morna do meu time, quando no intervalo lembrei de um jogo de Pokemon que meu primo me apresentou e jogou comigo há uns 15 anos. Depois de muito pesquisar jogos do tema, encontrei o jogo e ele estava com servidor online.


O jogo se chama Deluge RPG, é um jogo de Pokemon, onde ao realizar o login você escolhe o mapa que deseja explorar. A interface é simples, você tem o mapa, os personagens no mapa, algumas setas que ao serem clicadas atualizam a tela enviando seu personagem para a direção escolhida e, por fim, uma sessão onde irá aparecer qual criatura está no quadradinho que o personagem se moveu.


![Gif mostrando a interface do jogo](/assets/img/2-present.gif "Gif mostrando o jogo")


Após alguns nostálgicos minutos jogando a ideia de automatizar o jogo me surgiu, então iniciei nessa jornada.


# Escopo do projeto.


A primeira decisão deveria ser tomada: como eu faria para jogar o jogo sem estar na frente do computador? Eu poderia criar uma aplicação em node com [puppeteer](https://www.npmjs.com/package/puppeteer), ou criar uma extensão do navegador ([como a pipfy](https://chromewebstore.google.com/detail/pipfy/hjibbpohckfcemaaflhpckoeiekfkelb)), mas eu não queria ter muito trabalho para algo que duraria apenas aquela noite. Então, segui pelo caminho mais simples: jogar um script no console do navegador e deixá-lo rodando procurando Pokemons.


# Automatizando a busca pelo Pokemon
Então, iniciei com o teste mais simples possível: peguei o ID do botão e simulei um clique com o método .click(), na minha cabeça, se isso funcionasse, o resto do projeto inteiro daria certo.


![Gif mostrando a injeção do script funcionando corretamente](/assets/img/2-js-test.gif "Gif mostrando a injeção do script funcionando corretamente")


A partir desse ponto, foi só alegria, otimizei esse script fazendo com que o personagem ficasse indo de um lado para o outro, ficando assim:


```javascript
constcontrols= {
left: document.querySelector("#dr-e"),
right: document.querySelector("#dr-w")
}


let lastButtonClicked ='left'


setInterval(() => {
constdirection= lastButtonClicked ==='left'?'right':'left'


constbuttonToClick= controls[direction]


controls[direction].click()


lastButtonClicked = direction
}, 1000)
```


Basicamente criei um objeto chamado `controls`, com o elemento do botão da direita e da esquerda, salvava o último botão clicado em uma `let` chamada `lastButtonClicked` e então clicava sempre na outra opção a cada um segundo.


O próximo passo seria identificar quando um Pokemon fosse encontrado, e clicar no botão *Try to catch!*. Para isso, coloquei apenas a seguinte condição após iniciar o `setIternval`:


```javascript
constcatchButton=document.querySelector("#catchmon")


if (catchButton) {
catchButton.click()
}
```


Sendo a classe `catchmon` referenciando o botão de capturar a criatura, e caso o botão estivesse presente na tela, clicaria nele.


O resultado foi esse:
![Gif mostrando o personagem andando de um lado para o outro até encontrar um Pokemon](/assets/img/2-catch.gif "Gif mostrando o personagem andando de um lado para o outro até encontrar um Pokemon")


E daí nasceu o primeiro problema: a tela é atualizada quando o Pokemon é encontrado, o que significa que o script que rodei no console na tela anterior teria sua execução interrompida assim que houvesse a troca de rota.


# Como rodar o mesmo script mesmo com o recarregamento da página

Logo lembrei de uma solução apresentada por um antigo chefe, usar uma extensão do Chrome que fique executando o mesmo script independente da página. E a escolhida foi a [Tamper Monkey](https://www.tampermonkey.net/)


![Interface da extensão Tamper monkey com o script nela](/assets/img/2-tamper-monkey.png "Interface da extensão Tamper monkey com o script nela")


Com ela, só é necessário adicionar o script, a URL da página e ela ficará executando esse script sempre que a URL da página der match com a URL cadastrada.


E com isso surgiu outro problema, como eu identificaria qual step estou.

## Estrutura de steps
A solução para esse problema foi simples e funcional, criei uma estrutura no código para identificação dos steps, ela funciona mais ou menos assim:


```javascript
const getCurrentStep = () => {
let step


constcurrentUrl=location.href


if (currentUrl.includes("delugerpg.com/map")) {
step = "map"


return step
}


if (currentUrl.includes("delugerpg.com/catch")) {
constbutton=document.querySelector(".btn-battle_action")
constbuttonContent=button?.getAttribute("name")


if (!buttonContent ||document.querySelector(".notify_error")) {
window.location.href ='/map'


runBot()
}


if (buttonContent ==="Start Battle") {
step = "choosePokemon"
}


if (buttonContent ==="attack_") {
step = "battle"
}


if (buttonContent ==="continue_") {
step = "battleFinished"
}


return step
}
}


const steps = {
map: () => {
constcontrols= {
left: document.querySelector("#dr-e"),
right: document.querySelector("#dr-w")
}


let lastButtonClicked ='left'


setInterval(() => {
constdirection= lastButtonClicked ==='left'?'right':'left'


constcatchButton=document.querySelector("#catchmon")


if (catchButton) {
catchButton.click()
}


constbuttonToClick= controls[direction]


controls[direction].click()


lastButtonClicked = direction
}, 1000)


runBot()
},
choosePokemon: () => {
// Código da escolha do pokemon
runBot()
},
battle: () => {
// Código para batalhar
runBot()
},
battleFinished: () => {
// Código para finalizar batalha
runBot()
}
}


const runBot = () => {
setTimeout(() => {
conststep= getCurrentStep()
steps[step]()
}, 1000)
}


runBot()
```

O código acima se resume em três estruturas:
- `getCurrentStep` que é uma função que identifica qual passo da jornada o usuário está, por meio de elementos no DOM e salva o nome do passo em uma variável global.
- A segunda estrutura é o objeto `steps` que possuí uma função para cada etapa.
- E a última é a entry function `runBot` executada no início da aplicação e ao término de todas as funções dentro de `steps`.

Com essa estrutura, ficou faltando apenas a implementação do código da batalha.

# Batalhando.
A batalha é dividida em três etapas:
- Escolha do Pokemon;
- Batalha;
- Finalização da batalha.

Como já havia feito antes a identificação de cada etapa, só preciso preencher no objeto `steps` os passos `choosePokemon`, `battle` e `battleFinished`.

## choosePokemon


Começando pela tela de escolha do Pokemon:
![Tela de escolha do Pokemon que irá batalhar](/assets/img/2-pokemon-select.png "Tela de escolha do Pokemon que irá batalhar")


Essa tela é simples, temos `radio buttons` para selecionar o Pokemon que irá participar da batalha e depois devemos clicar no botão escrito *start battle*. Como o primeiro Pokemon já vem selecionado, devemos apenas clicar no botão. Sendo assim, a função para o step `choosePokemon` ficou assim:


```javascript
const steps = {
// ...
choosePokemon: () => {
constbutton=document.querySelector(".btn-battle_action")


button.click()
runBot()
},
// ...
}
```


## Battle
A próxima tela é a tela de batalha:
![Tela de batalha](/assets/img/2-battle.png "Tela de batalha")


Nessa tela, devemos escolher a habilidade que o Pokemon irá usar na rodada e clicar no botão *Attack*.

O código da sessão ficou assim:

```javascript
const steps = {
// ...
battle: () => {
constattack=document.querySelector("#attkopt2")
constbutton=document.querySelector(".btn-battle_action")
constbuttonContent=button.getAttribute("name")


if (buttonContent !=="attack_"||document.querySelector(".notify_error")) {
location.href ="/map"
runBot()
return
}


attack.setAttribute("checked","checked")
button.click()
runBot()
},
// ...
}
```


Nesse caso, deixei o `radio button` com ID `#attkopt2` selecionado, pois se trata da habilidade que eu gostaria de usar e depois clico no botão para atacar. Há dois pontos interessantes nessa etapa que valem ser comentados.

Como `runBot` é uma função recursiva, após realizar o ataque do Pokemon ela é executada novamente, com isso ela identificará se o Pokemon inimigo foi finalizado ou se deverá rodar novamente a função `battle`, portanto não foi necessário a criação de uma estrutura de loop, para ficar rodando o `battle` até a finalização da batalha.

E em alguns casos a aplicação dava um erro, então tive que criar uma condicional que levasse para o mapa novamente, para caso o botão de ataque não fosse encontrado ou tivesse algum erro sendo exibido na tela.


## battleFinished
E por fim temos a tela de finalização da batalha, que deverá nos levar para o mapa e começar todo o processo novamente:
![Tela de finalização da batalha](/assets/img/2-back-to-map.png "Tela de finalização da batalha")


Nessa sessão, basta clicar no botão de concluir a batalha e tudo será reiniciado. Tendo o código assim:
```javascript
const steps = {
// ...
battleFinished: () => {
constbutton=document.querySelector(".btn-battle_action")


button.click()
runBot()
}
// ...
}
```


Com isso, temos nosso robô jogando por nós e conseguiremos deixar um Pokemon nível 100 sem precisar fazer nada:


![Demonstração do robô em ação](/assets/img/2-finished.gif "Demonstração do robô em ação")


# Edge cases
Como nem tudo são flores, algumas vezes eu caia em uma tela de erro e em outras caia no recaptcha, mas a correção desses casos foram simples. Adicionei apenas esse código antes da função `runBot` rodar:


```javascript
const headings = document.querySelectorAll("h2")
const showPoke = document.querySelector("#show-poke div")


headings.forEach(h2 => {
if (h2?.textContent ==="This is to check if you are a human or a bot") {
location.href ="/map"
return
}
})


if (showPoke?.textContent === '!! Error: Please refresh this page. !!') {
location.href ="/map"
return
}
```


A primeira condicional está checando se há o texto mencionando o recaptcha, e caso tenha, eu redireciono para o mapa. E o segundo verifica se há um texto reportando erro, e se tiver, também redireciona para o mapa.

# Resultado final


O final feliz previsto para essa história seria eu dizendo em quanto tempo levou para o bot fazer meu Pokemon ir do nível inicial até o 100, mas nem tudo deu certo. Por volta do nível oitenta e poucos, minha conta foi deslogada e, ao tentar realizar o login novamente, recebi essa notícia:


![Tela de login dizendo que minha conta havia sido banida](/assets/img/2-banned.png "Tela de login dizendo que minha conta havia sido banida")


Eu havia sido banido. Mas tudo bem, valeu a experiência.


O código final ficou assim: [Repositório do código](https://gist.github.com/brunoannunciato/9affdcaa6bc604162f55b8139b2eb551)


# Possíveis melhorias.


Se tivesse intenção de evoluir esse projeto, transformaria ele em uma extensão do Chrome, com controles de liga e desliga, seleção de Pokemon e habilidade que deveria ser usada.


Enquanto escrevia essa postagem, me dei conta também de que poderia usar as URLs junto ao tamper monkey para definir qual step estou, tornando desnecessária a engenharia do tópico "Estrutura de steps" dessa postagem.


A ideia dessa aplicação era postar um vídeo no youtube. Gravei todo o passo a passo, mas só de pensar em narrar e editar me deu muita preguiça, por isso, por enquanto, limitarei esse conteúdo apenas ao meu blog para não ter sido feito em vão. Mas espero um dia ter  disposição para iniciar no mundo dos vídeos.