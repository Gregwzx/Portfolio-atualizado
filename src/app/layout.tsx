import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Greg Ferreira — Software Engineering',
  description:
    'Interactive developer portfolio. Software engineering, AI systems, mobile and backend architecture.',
  keywords: [
    'Greg Ferreira',
    'Software Engineer',
    'Developer Portfolio',
    'React Native',
    'Spring Boot',
    'Full Stack',
  ],
  authors: [{ name: 'Greg Ferreira' }],
  openGraph: {
    type: 'website',
    title: 'Greg Ferreira — Software Engineering',
    description: 'Interactive developer portfolio. Software engineering, AI systems, mobile and backend architecture.',
    siteName: 'Greg Ferreira',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greg Ferreira — Software Engineering',
    description: 'Interactive developer portfolio.',
  },
};

import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="purple"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-text-primary antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
