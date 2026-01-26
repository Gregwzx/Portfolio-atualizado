'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import GradientBackground from '../common/GradientBackground'
import ExperienceModal from './Motal'
import { useState } from 'react'

type Project = {
  id: number
  title: string
  description: string
  period: string
  image: string
  skills: string[]
  link: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Python Background Remover",
    description:
      "Script em Python que remove automaticamente o fundo de imagens e gera arquivos PNG com transparência. Projeto focado em automação, manipulação de imagens e produtividade.",
    period: "2025",
    image: "/projects/python.png",
    skills: ["Python", "Image Processing", "Automation"],
    link: "https://github.com/Gregwzx"
  },
  {
    id: 2,
    title: "AuraFit Website",
    description:
      "Site institucional da AuraFit com layout moderno, animações suaves e foco em experiência do usuário. Desenvolvido para praticar UI/UX e front-end.",
    period: "2025",
    image: "/projects/aurafit.png",
    skills: ["Next.js", "React", "Tailwind", "UI/UX"],
    link: "https://github.com/Gregwzx"
  }
]

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id="projects" className="container mx-auto px-4 sm:px-8 md:px-12">
      <div className="min-h-screen flex flex-col items-center justify-center py-4 md:py-8 relative overflow-hidden">

        <GradientBackground
          sectionId="projects"
          gradientColors={{
            start: '#F43F5E',
            end: '#BE123C'
          }}
        />

        <AnimatedText>
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center relative z-10">
            Projetos
          </h1>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-0 max-w-6xl w-full">
          {projects.map((project) => (
            <AnimatedText key={project.id}>
              <div
                onClick={() => {
                  setSelectedProject(project.id)
                  setModalOpen(true)
                }}
                className="
                  bg-white/[0.1] dark:bg-black/[0.2]
                  backdrop-blur-[20px]
                  rounded-2xl
                  border border-white/[0.1]
                  p-6
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  cursor-pointer
                "
              >
                <div className="relative w-full h-48 md:h-72 mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                  {project.title}
                </h2>

                <p className="text-base text-gray-400 mb-2">
                  {project.period}
                </p>

                <p className="text-base text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full bg-white/[0.05] backdrop-blur-[8px] border border-white/[0.05] text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>

        <AnimatedText>
          <div className="mt-10">
            <a
              href="https://github.com/Gregwzx"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-lg
                text-neutral-400
                px-6 py-3
                border border-white/[0.2]
                rounded-xl
                transition-all duration-300
                hover:scale-110
                hover:border-purple-500
                hover:text-purple-500
                flex items-center gap-2
              "
            >
              Show More on GitHub →
            </a>
          </div>
        </AnimatedText>

      </div>

      <ExperienceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        experienceId={selectedProject ?? 1}
      />
    </section>
  )
}
