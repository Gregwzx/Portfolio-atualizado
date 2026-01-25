import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

type Props = {
  sectionId: string
}

export default function GradientBackground({ sectionId }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  // Roxo principal
  const purpleStart = '#7c3aed' // roxo vibrante
  const purpleEnd = '#a855f7'   // roxo mais claro

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById(sectionId)
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [sectionId])

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          width: { xs: '200px', sm: '400px' },
          height: { xs: '200px', sm: '500px' },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${purpleStart}, ${purpleEnd})`,
          filter: { xs: 'blur(40px)', sm: 'blur(80px)' },
          bottom: { xs: '-40px', sm: '-100px' },
          right: { xs: '-40px', sm: '-100px' },
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          width: { xs: '300px', sm: '500px' },
          height: { xs: '300px', sm: '500px' },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${purpleEnd}, ${purpleStart})`,
          filter: { xs: 'blur(40px)', sm: 'blur(80px)' },
          bottom: { xs: '-40px', sm: '-100px' },
          left: { xs: '-40px', sm: '-100px' },
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
