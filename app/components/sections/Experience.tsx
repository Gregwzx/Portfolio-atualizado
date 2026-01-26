'use client'

import AnimatedText from '../common/AnimatedText'
import GradientBackground from '../common/GradientBackground'
import ExperienceModal from './Motal'
import { useState } from 'react'

type Experience = {
  id: number
  title: string
  company: string
  period: string
  skills: string[]
  description: string
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Estagiário em Banco de Dados & Suporte",
    company: "Empresa Atual",
    period: "2025 - Presente",
    skills: ["SQL", "MySQL", "Suporte Técnico", "Git"],
    description:
      "Atuo com suporte técnico e banco de dados, auxiliando na resolução de problemas, validação de informações e apoio aos usuários. Também participo de atividades relacionadas à organização de dados e melhoria de processos internos."
  },
  {
    id: 2,
    title: "Designer Freelancer (Autônomo)",
    company: "Projetos Próprios",
    period: "2024 - 2025",
    skills: ["UI Design", "HTML", "CSS", "JavaScript"],
    description:
      "Trabalhei como freelancer desenvolvendo layouts, slides, interfaces e pequenos designs para lojas. Foco em criar experiências visuais simples, funcionais e responsivas, sempre buscando melhorar minhas habilidades artísticas."
  }
]

export default function Experience() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

  return (
    <section id="experience" className="container mx-auto px-4 sm:px-8 md:px-12">
      <div className="min-h-screen flex flex-col items-center justify-center py-16 md:py-20 relative overflow-hidden">
        <GradientBackground sectionId="experience" />

        <AnimatedText>
          <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center relative z-10">
            Experiência
          </h1>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-0 max-w-6xl w-full">
          {experiences.map((experience) => (
            <AnimatedText key={experience.id}>
              <div
                onClick={() => {
                  setSelectedExperience(experience.id)
                  setModalOpen(true)
                }}
                className="bg-white/[0.1] dark:bg-black/[0.2] backdrop-blur-[20px] rounded-2xl border border-white/[0.1] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full"
              >
                <div className="mb-4 text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">
                    {experience.title}
                  </h3>

                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {experience.company}
                  </p>
                </div>

                <p className="text-base text-gray-600 dark:text-gray-400 mb-4 text-center">
                  {experience.period}
                </p>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full bg-white/[0.05] backdrop-blur-[8px] border border-white/[0.05] text-gray-600 dark:text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>

      <ExperienceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        experienceId={selectedExperience ?? 1}
      />
    </section>
  )
}
