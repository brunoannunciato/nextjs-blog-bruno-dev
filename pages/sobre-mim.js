import Head from "next/head"

import Link from "next/link"
import Layout from "../components/Layout"
import SocialMetaTags from "../components/SocialMetaTags"

import styles from './styles/about.module.scss'

const sobreMim = () => {
  return (
    <Layout>
      <Head>
        <SocialMetaTags 
          title="Bruno Annunciato - Sobre mim"
          description="Saiba mais sobre mim e minha carreira."
          coverImage="/assets/img/cover-image.jpeg"
        />

        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="images/favicon.ico" type="image/x-icon"></link>
      </Head>

      <div className="content">
        <section className={ styles.section }>
          <h2 className="subtitle">
            Introdução 🧑🏻‍💻
          </h2>

          <p className="text">
            Iniciei minha carreira como desenvolvedor em 2016 aos 18 anos, hoje aos 25 procuro me aperfeiçoar não só como desenvolvedor front-end mas também como desenvolvedor de produtos digitais, entendendo e aplicando todas as regras de negócio e encontrando o meio-termo entre as necessidades do produto e a complexidade dos códigos.
          </p>

          <p className="text">
            No meu tempo livre costumo tocar alguns instrumentos, estudar desenvolvimento de jogos ou matérias diferentes do front-end, jogar video-game, aprender mágicas e caminhar por aí.
          </p>
        </section>

        <section className={ styles.section }>
          <h2 className="subtitle">
            Carreira ✍🏼
          </h2>

          <p className="text">
            <strong>Jüssi</strong> - Foi onde tudo começou, em 2016. Minha primeira entrevista de emprego feita na vida me abriu uma das portas mais importantes, entrar como estagiário de desenvolvimento WEB em uma equipe incrível. Iniciei desenvolvedo templates para e-mail marketing e dando manutenção em lojas VTex. Ao longo do tempo peguei algumas landing pages promocionais, criação de blogs em wordpress e sites institucionais para grandes marcas brasileiras e globais.
          </p>

          <p className="text">
            <strong>Banco Pan</strong> - Por indicação de alguns antigos colegas da Jüssi, ingressei como desenvolvedor front-end na equipe de CRM do Pan em 2019. A princípio ficaria responsável pela criação de landing pages promocionais, mas logo que cheguei, aceitei o desafio de fazer uma grande integração entre uma API de serviço de disparo de mensagens via WhatsApp e a Salesforce usando node. Ao finalizar essa tarefa, fui transferido para a equipe de marketing, e fiquei responsável, com minha equipe, em dar manutenção para o site institucional do banco.
          </p>

          <p className="text">
            <strong>Red Ventures Brasil</strong> - Empresa que conheci em 2017 quando um dos colaboradores palestrou em minha faculdade. Desde então conheci alguns grandes desenvolvedores que também trabalharam nela, fazendo com que cada vez mais eu sentisse vontade de fazer parte. Até que em 2021 um colega de faculdade me indicou para o processo seletivo, fazendo com que eu começasse a trabalhar em julho na empresa melhor estruturada, empática e desafiadora que poderia imaginar trabalhar um dia. Onde continuo trabalhando até hoje.
          </p>

        </section>

        <section className={ styles.section }>
          <h2 className="subtitle">
            Onde me encontrar 🕺🏻
          </h2>

          <p className="text">
            <Link  href="https://www.linkedin.com/in/bruno-annunciato-b20163149" target="_blank">
            <a>
              Linkedin
            </a>
            </Link> <br />

            <Link href="https://twitter.com/brunoannunciato" target="_blank">
            <a>
              Twitter
            </a>
            </Link> <br />

            <Link href="https://github.com/brunoannunciato" target="_blank">
            <a>
              Github
            </a>
            </Link> <br />
          </p>
        </section>
      </div>

      
    </Layout>
  )
}

export default sobreMim
