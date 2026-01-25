'use client'
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import CourseTimeline from "./components/education/CourseTimeline" 
import Navbar from "./components/common/Navbar"
import MySkills from './components/sections/MySkills'
import Experience from './components/sections/Experience'
import { Box } from '@mui/material'
import Projects from './components/sections/Projects'
import Gallery from './components/sections/Gallery'


export default function Home() {
  return (
    <>
      {/* Navigation bar - Edit items in /components/common/Navbar.tsx */}
      <Navbar />
      <main>
        {/* Hero section - Edit content in /components/sections/Hero */}
        <Hero />    
        
        {/* About section - Edit your intro in /components/sections/About */}
        <About />
        
        {/* Skills section - Add your skills in /components/sections/MySkills */}
        <MySkills />
        
        {/* Education section - Edit timeline in /components/education/CourseTimeline */}
        <section id="education" className="relative">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            p: 4,
          }}>
            <h1 className="text-4xl font-bold mb-12 text-center">Education</h1>
            <CourseTimeline />
          </Box>
        </section>
        
        {/* Experience section - Add your work history in /components/sections/Experience */}
        <Experience />
        
        {/* Projects section - Showcase your projects in /components/sections/Projects */}
        <Projects />
        
        {/* Gallery section - Add your photos in /components/sections/Gallery */}
        <Gallery />
      </main>
    </>
  )
}
