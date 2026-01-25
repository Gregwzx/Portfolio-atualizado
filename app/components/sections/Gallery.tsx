'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import { Typography, Container, Box, Card, CardContent, Grid } from '@mui/material'
import GradientBackground from '../common/GradientBackground'

// Tipo das fotos da galeria
type Photo = {
  id: number
  image: string
  date: string
  location: string
  description: string
}

// Fotos da galeria — Spotter Automotivo
// Coloque as imagens em: public/gallery/
const photos: Photo[] = [
  {
    id: 1,
    image: '/gallery/car1.jpg',
    date: '2024',
    location: 'Evento Automotivo',
    description: 'Detalhes que fazem a diferença'
  },
  {
    id: 2,
    image: '/gallery/car2.jpg',
    date: '2024',
    location: 'Encontro de carros',
    description: 'Paixão por máquinas'
  },
  {
    id: 3,
    image: '/gallery/car3.jpg',
    date: '2024',
    location: 'Meet noturno',
    description: 'Estética e performance'
  },
  {
    id: 4,
    image: '/gallery/car4.jpg',
    date: '2024',
    location: 'Evento regional',
    description: 'Cada carro conta uma história'
  },
  {
    id: 5,
    image: '/gallery/car5.jpg',
    date: '2024',
    location: 'Spot automotivo',
    description: 'Ângulos e identidade'
  },
  {
    id: 6,
    image: '/gallery/car6.jpg',
    date: '2024',
    location: 'Exposição',
    description: 'Design que impressiona'
  },
  {
    id: 7,
    image: '/gallery/car7.jpg',
    date: '2024',
    location: 'Evento outdoor',
    description: 'Fotografia automotiva'
  },
  {
    id: 8,
    image: '/gallery/car8.jpg',
    date: '2024',
    location: 'Car meet',
    description: 'Estilo e personalidade'
  },
  {
    id: 9,
    image: '/gallery/car9.jpg',
    date: '2024',
    location: 'Evento especial',
    description: 'Capturando momentos únicos'
  },
  {
    id: 10,
    image: '/gallery/car10.jpg',
    date: '2024',
    location: 'Spot urbano',
    description: 'Carros, luzes e atitude'
  },
  {
    id: 11,
    image: '/gallery/car11.jpg',
    date: '2024',
    location: 'Meet urbano',
    description: 'Linhas que impressionam'
  },
  {
    id: 12,
    image: '/gallery/car12.jpg',
    date: '2024',
    location: 'Evento automotivo',
    description: 'Capturando a essência'
  }
]

export default function Gallery() {
  return (
    <Container id="gallery" maxWidth="xl" component="section">
      <Box
        sx={{
          minHeight: '100vh',
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4, md: 8 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fundo com gradiente roxo */}
        <GradientBackground
          sectionId="gallery"
          gradientColors={{
            start: '#7C3AED',
            end: '#5B21B6'
          }}
        />

        {/* Título */}
        <AnimatedText>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center relative z-10">
            Galeria Automotiva
          </h1>
        </AnimatedText>

        {/* Texto */}
        <Typography
          sx={{
            textAlign: 'center',
            maxWidth: 700,
            mx: 'auto',
            mb: 6,
            opacity: 0.8,
            position: 'relative',
            zIndex: 1
          }}
        >
          Sou apaixonado por carros e, como hobby, atuo como <strong>spotter automotivo</strong>,
          registrando eventos, encontros e detalhes que tornam cada veículo único.
          Aqui estão alguns dos meus registros.
        </Typography>

        {/* Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ position: 'relative', zIndex: 1 }}>
          {photos.map((photo) => (
            <Grid item xs={6} sm={4} md={3} key={photo.id}>
              <AnimatedText>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all .3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,.25)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ mb: 1.5 }}>
                      <Image
                        src={photo.image}
                        alt={photo.description}
                        width={500}
                        height={350}
                        className="rounded-lg object-cover w-full"
                      />
                    </Box>

                    <Typography sx={{ fontWeight: 600 }}>
                      {photo.location}
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {photo.date}
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
                      {photo.description}
                    </Typography>
                  </CardContent>
                </Card>
              </AnimatedText>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
