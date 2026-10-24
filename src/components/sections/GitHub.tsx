'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CoreObject } from '@/components/3d/CoreObject';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useTheme } from '@/context/ThemeContext';
import { FadeIn } from '@/components/ui/TextReveal';
import { PERSONAL } from '@/lib/constants';
import { motion } from 'framer-motion';

type GitHubStats = {
  publicRepos: number;
  followers: number;
  primaryLang: string;
  contributions: number;
};

type GitHubLang = {
  name: string;
  pct: number;
  color: string;
};

const LANG_COLORS: Record<string, string> = {
  Java: '#f5a400',
  TypeScript: '#007acc',
  JavaScript: '#f5e800',
  Python: '#3776ab',
  SQL: '#00a3cc',
  HTML: '#e34c26',
  CSS: '#264de4',
  C: '#555555',
  'C++': '#00599c',
  'C#': '#68217a',
  PHP: '#777bb4',
  Kotlin: '#7f52ff',
  Swift: '#f05138',
  Go: '#00add8',
  Rust: '#dea584',
};

const DEFAULT_COLOR = '#333';

export function GitHub() {
  const { normalized } = useMousePosition();
  const scrollProgress = useScrollProgress();
  const { accentColor } = useTheme();
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    primaryLang: 'Java',
    contributions: 0,
  });

  const [langs, setLangs] = useState<GitHubLang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const username = PERSONAL.github
          .replace('https://github.com/', '')
          .replace('github.com/', '')
          .replace('/', '');

        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const user = await userResponse.json();
        const repos = await reposResponse.json();

        const languageBytes: Record<string, number> = {};

        for (const repo of repos) {
          if (!repo.fork && repo.language) {
            const language = repo.language;
            languageBytes[language] =
              (languageBytes[language] || 0) + 1;
          }
        }

        const totalLanguages = Object.values(languageBytes).reduce(
          (sum, value) => sum + value,
          0
        );

        const calculatedLangs: GitHubLang[] = Object.entries(languageBytes)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, value]) => ({
            name,
            pct:
              totalLanguages > 0
                ? Math.round((value / totalLanguages) * 100)
                : 0,
            color: LANG_COLORS[name] || DEFAULT_COLOR,
          }));

        const primaryLang =
          calculatedLangs.length > 0
            ? calculatedLangs[0].name
            : 'Java';

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          primaryLang,
          contributions: 0,
        });

        setLangs(calculatedLangs);
      } catch (error) {
        console.error('GitHub API error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const displayValue = (value: number | string) =>
    loading ? '...' : value;

  const mockStats = [
    {
      label: 'PUBLIC REPOS',
      value: displayValue(stats.publicRepos),
      unit: '',
    },
    {
      label: 'FOLLOWERS',
      value: displayValue(stats.followers),
      unit: '',
    },
    {
      label: 'PRIMARY LANG',
      value: displayValue(stats.primaryLang),
      unit: '',
    },
    {
      label: 'CONTRIBUTIONS',
      value: displayValue(stats.contributions),
      unit: 'YTD',
    },
  ];

  return (
    <section id="github" className="section relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="container relative z-10">

        {/* Header */}
        <FadeIn className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-accent/30" />

            <span className="label-mono">
              OPEN SOURCE
            </span>
          </div>

          <div
            className="heading-display text-white"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            GITHUB
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Stats cards */}
          {mockStats.map((stat, i) => (
            <FadeIn
              key={stat.label}
              delay={i * 0.1}
            >
              <div className="github-card">
                <div className="label-mono mb-3">
                  {stat.label}
                </div>

                <div className="font-sans font-black text-4xl text-white/20 tracking-tight">
                  {stat.value}

                  {stat.unit && (
                    <span className="font-mono text-xs text-white/15 ml-2">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Language distribution */}
          <FadeIn
            delay={0.4}
            className="md:col-span-2 lg:col-span-2"
          >
            <div className="github-card">

              <div className="label-mono mb-6">
                LANGUAGE DISTRIBUTION
              </div>

              {/* Bar */}
              <div className="flex h-2 rounded-full overflow-hidden mb-6 gap-0.5">
                {langs.map((lang) => (
                  <motion.div
                    key={lang.name}
                    style={{
                      width: `${lang.pct}%`,
                      background: lang.color,
                    }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    whileInView={{
                      scaleX: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4">
                {langs.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: lang.color,
                      }}
                    />

                    <span className="font-mono text-[0.65rem] text-white/30">
                      {lang.name}
                    </span>

                    <span className="font-mono text-[0.55rem] text-white/15">
                      {lang.pct}%
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </FadeIn>

          {/* Profile link */}
          <FadeIn delay={0.5}>
            <a
              href={`https://${PERSONAL.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="github-card flex flex-col justify-between group cursor-pointer h-full min-h-[120px]"
              data-cursor="hover"
            >
              <div className="label-mono">
                PROFILE
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="font-mono text-[0.7rem] text-white/30 group-hover:text-accent transition-colors">
                  {PERSONAL.github}
                </span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-white/20 group-hover:text-accent transition-colors"
                >
                  <path
                    d="M1 1l10 10M11 1v10H1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </a>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}