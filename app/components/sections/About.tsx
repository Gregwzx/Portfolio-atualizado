'use client'

import AnimatedText from "../common/AnimatedText"

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-12">
        <AnimatedText>
          <h1 className="text-4xl font-bold mb-8">Sobre mim</h1>
        </AnimatedText>

        <div className="space-y-8">
          <AnimatedText>
            <div className="space-y-4">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Meu nome é Jailson Ferreira, e sou estudante de Análise e desenvolvimento de sistemas, sou focado principalmente em back-end / java (java no sangue e café na mesa kk). 
                Mas também gosto de transformar ideias em interfaces reais usando HTML, CSS, JavaScript e React.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed">
                Estou sempre buscando evoluir, entender cada parte do código que escrevo e criar projetos que realmente façam sentido.
                Atualmente estudo Java e desenvolvimento web, com o objetivo de conquistar minha primeira oportunidade como desenvolvedor.
              </p>
            </div>
          </AnimatedText>

          <AnimatedText>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Interesses</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Curto bastante programação, design de interfaces, criação de projetos pessoais e aprender novas tecnologias.
                Também gosto de games e desafios de lógica, que acabam ajudando bastante no raciocínio.
              </p>
            </div>
          </AnimatedText>

          <AnimatedText>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Objetivos</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Meu principal objetivo é entrar na área como desenvolvedor, ganhar experiência prática e evoluir profissionalmente.
                Quero participar de projetos reais, aprender com outras pessoas da área e crescer junto com a empresa.
              </p>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
