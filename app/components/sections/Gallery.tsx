'use client'

import AnimatedText from '../common/AnimatedText'
import Image from 'next/image'
import { Typography, Container, Box, Card, CardContent, Grid } from '@mui/material'
import GradientBackground from '../common/GradientBackground'

type Photo = {
  id: number
  image: string
  date: string
  location: string
  description: string
}

const photos: Photo[] = [
  {
    id: 1,
    image: '/gallery/car1.png',
    date: '2025',
    location: 'Racing experience',
    description: 'Um belo angulo não acha ? kk'
  },
  {
    id: 2,
    image: '/gallery/car2.png',
    date: '2024',
    location: 'Encontro PEEX, 11º edição',
    description: 'Essa amarelinha é linda d+'
  },
  {
    id: 3,
    image: '/gallery/car3.png',
    date: '2024',
    location: 'Encontro PEEX, 11º edição',
    description: 'Talvez a minha melhor foto de bmw'
  },
  {
    id: 4,
    image: '/gallery/car4.png',
    date: '2025',
    location: 'Racing Experience',
    description: 'Essa lambo é linda, pena que o piloto não sou eu'
  },
  {
    id: 5,
    image: '/gallery/car5.png',
    date: '2024',
    location: 'Encontro PEEX, 11º edição',
    description: 'Linda porshe, mais azul que isso impossível'
  },
  {
    id: 6,
    image: '/gallery/car6.png',
    date: '2025',
    location: 'Encontro PEEX, 11º edição',
    description: 'ferrari bem aesthetic'
  },
  {
    id: 7,
    image: '/gallery/car7.png',
    date: '2024',
    location: 'Racing Experience',
    description: 'Direto dos boxes'
  },
  {
    id: 8,
    image: '/gallery/car8.png',
    date: '2025',
    location: 'Racing Experience',
    description: 'apenas: 👍'
  },
  {
    id: 9,
    image: '/gallery/car9.png',
    date: '2025',
    location: 'Racing Experience',
    description: 'Olha essa comissão de frente'
  },
  {
    id: 10,
    image: '/gallery/car10.png',
    date: '2024',
    location: 'Encontro PEEX, 11º edição',
    description: ' "i found my love in Portofino" '
  },
  {
    id: 11,
    image: '/gallery/car11.png',
    date: '2026',
    location: 'Spott urbano',
    description: 'Mídia demais'
  },
  {
    id: 12,
    image: '/gallery/car14.png',
    date: '2025',
    location: 'Racing Experience',
    description: 'Melhor ft do evento, esqueça tudo'
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
          overflow: 'hidden'
        }}
      >
        <GradientBackground
          sectionId="gallery"
          gradientColors={{
            start: '#7C3AED',
            end: '#5B21B6'
          }}
        />

        <AnimatedText>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center relative z-10">
            Meus Spotts
          </h1>
        </AnimatedText>

        <Typography
          sx={{
            textAlign: 'center',
            maxWidth: 700,
            mx: 'auto',
            mb: 6,
            opacity: 0.8,
            position: 'relative',
            zIndex: 1,
            color: '#fff'
          }}
        >
          Sou apaixonado por carros e, como hobby, atuo como <strong>spotter automotivo</strong>,
          registrando eventos, encontros e detalhes que tornam cada veículo único.
          Aqui estão alguns dos meus registros.
        </Typography>

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

                    <Typography sx={{ fontWeight: 600, color: '#fff' }}>
                      {photo.location}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#fff', mt: 0.3 }}>
                      {photo.date}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#fff', mt: 0.5 }}>
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
