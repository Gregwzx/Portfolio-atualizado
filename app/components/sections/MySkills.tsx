'use client'

import React from 'react'
import Image from "next/image"
import AnimatedText from "../common/AnimatedText"

const technologies = {
  frontend: [
    { name: 'HTML', icon: '/skills/html5.svg' },
    { name: 'CSS', icon: '/skills/css3.svg' },
    { name: 'JavaScript', icon: '/skills/javascript.svg' },
    { name: 'React', icon: '/skills/react.svg' },
    { name: 'Next.js', icon: '/skills/nextjs.svg' },
  ],

  backend: [
    { name: 'Node.js', icon: '/skills/nodejs.svg' },
    { name: 'Java', icon: '/skills/java.svg' },
    { name: 'Python', icon: '/skills/python.svg' },
  ],

  infrastructure: [
    { name: 'MongoDB', icon: '/skills/mongodb.svg' },
  ],

  tools: [
    { name: 'Git', icon: '/skills/git.svg' },
    { name: 'GitHub', icon: '/skills/github.svg' },
    { name: 'VS Code', icon: '/skills/vscode.svg' },
  ]
}

const categories = {
  frontend: 'Frontend',
  backend: 'Backend / Linguagens',
  infrastructure: 'Banco de Dados',
  tools: 'Ferramentas'
}

export default function MySkills() {
  return (
    <section
      id="skills"
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8"
    >
      <div className="container mx-auto">
        <AnimatedText>
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
            Habilidades Técnicas
          </h1>
        </AnimatedText>

        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          {(Object.keys(technologies)).map((category) => (
            <AnimatedText key={category} className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-center">
                {categories[category]}
              </h2>

              <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
                  {technologies[category].map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center gap-2 sm:gap-3 w-[80px] sm:w-[100px] group"
                    >
                      <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={48}
                          height={48}
                          className="dark:invert sm:w-[56px] sm:h-[56px]"
                        />
                      </div>

                      <span className="text-xs sm:text-sm font-medium text-foreground/70 group-hover:text-foreground/90 transition-colors text-center">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  )
}
