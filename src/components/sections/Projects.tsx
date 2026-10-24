'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/lib/constants';
import { FadeIn } from '@/components/ui/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    ACTIVE: 'text-accent border-accent/30 bg-accent/5',
    IN_DEV: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
    CLASSIFIED: 'text-white/20 border-white/10 bg-white/2',
    ARCHIVED: 'text-white/30 border-white/10 bg-white/2',
  } as const;

  return (
    <span
      className={`tech-badge ${colors[status as keyof typeof colors] || colors.ARCHIVED}`}
    >
      {status === 'ACTIVE' && <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />}
      {status === 'IN_DEV' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block animate-pulse" />}
      {status}
    </span>
  );
}

function ProjectPanel({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const isClassified = project.status === 'CLASSIFIED';

  return (
    <div className="h-scroll-panel relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[1px]"
        style={{ background: `linear-gradient(to bottom, transparent, ${project.color}40, transparent)` }}
      />

      {/* Index label */}
      <div className="absolute top-8 left-8 md:left-16 font-mono text-[0.6rem] text-white/15">
        {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
      </div>

      {/* Main content */}
      <div className="project-panel">
        {/* Left: Info */}
        <div className="flex flex-col gap-6 max-w-lg">
          <div className="flex items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="font-mono text-[0.6rem] tracking-widest text-white/20">
              {project.category}
            </span>
          </div>

          <div>
            <h2
              className="heading-display text-white mb-3"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.9,
                color: isClassified ? 'rgba(255,255,255,0.15)' : 'white',
                filter: isClassified ? 'blur(0.5px)' : 'none',
              }}
            >
              {project.title}
            </h2>
            <p className="font-mono text-[0.7rem] tracking-widest text-white/30">
              {project.subtitle}
            </p>
          </div>

          {!isClassified && (
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              {project.description}
            </p>
          )}

          {isClassified && (
            <div className="text-white/20 text-sm font-mono">
              <span className="text-accent/30">// </span>
              ACCESS RESTRICTED · CLEARANCE REQUIRED
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="tech-badge"
                style={isClassified ? { opacity: 0.3, filter: 'blur(2px)' } : {}}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          {!isClassified && (
            <div className="flex items-center gap-4 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  className="font-mono text-[0.7rem] tracking-widest text-white/30 hover:text-accent transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GITHUB
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  className="font-mono text-[0.7rem] tracking-widest text-white/30 hover:text-accent transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1v10H1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  LIVE DEMO
                </a>
              )}
              <span className="font-mono text-[0.6rem] text-white/15">{project.year}</span>
            </div>
          )}
        </div>

        {/* Right: Visual preview */}
        <div className="hidden lg:flex items-center justify-center">
          <div
            className="relative w-full aspect-video border border-white/5"
            style={{
              background: isClassified
                ? `repeating-linear-gradient(
                    45deg,
                    rgba(255,255,255,0.01),
                    rgba(255,255,255,0.01) 10px,
                    transparent 10px,
                    transparent 20px
                  )`
                : `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(${
                    project.color === '#00f5c4'
                      ? '0,245,196'
                      : project.color === '#a855f7'
                      ? '168,85,247'
                      : '0,245,155'
                  },0.08))`,
            }}
          >
            {isClassified ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-[0.6rem] text-white/15 tracking-widest mb-2">
                    [REDACTED]
                  </div>
                  <div
                    className="font-mono text-xs text-white/5"
                    style={{ filter: 'blur(4px)' }}
                  >
                    ████████████████████
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 w-full flex flex-col items-center">
                  <div
                    className="font-mono text-[0.6rem] tracking-widest mb-4"
                    style={{ color: `${project.color}90` }}
                  >
                    {project.category}
                  </div>

                  {/* Architecture preview for DevTrack */}
                  {project.id === 'devtrack' && (
                    <div className="flex flex-col items-center gap-2">
                      {['MOBILE', 'API', 'SPRING BOOT', 'DATABASE'].map((node, i) => (
                        <div key={node} className="flex flex-col items-center">
                          <div className="px-4 py-1.5 border border-accent/20 bg-accent/5 font-mono text-[0.6rem] text-accent/60 tracking-widest">
                            {node}
                          </div>
                          {i < 3 && (
                            <motion.div
                              className="w-[1px] h-4 bg-accent/20"
                              animate={{ scaleY: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Computer Vision preview for Meme Cam */}
                  {project.id === 'meme-cam' && (
                    <div className="w-full max-w-[280px] flex flex-col items-center gap-2">
                      <div className="w-full border border-purple-500/30 bg-purple-950/20 p-3 rounded font-mono text-left relative overflow-hidden">
                        <div className="flex items-center justify-between text-[0.55rem] text-purple-400/80 border-b border-purple-500/20 pb-1.5 mb-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping inline-block" />
                            CV_STREAM :: WEBCAM_0
                          </span>
                          <span className="text-white/40">60 FPS</span>
                        </div>

                        {/* Hand Landmark Mesh Visualization */}
                        <div className="relative h-16 w-full flex items-center justify-center border border-dashed border-purple-500/20 rounded bg-black/50 my-1">
                          <svg viewBox="0 0 160 80" className="w-full h-full text-purple-400/80">
                            <path d="M80,72 L80,50 L65,32 L52,18" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                            <path d="M80,50 L75,25 L75,10" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
                            <path d="M80,50 L88,25 L92,12" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
                            <path d="M80,50 L98,35 L110,25" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                            <circle cx="80" cy="72" r="3" fill="#a855f7" />
                            <circle cx="80" cy="50" r="2.5" fill="#a855f7" />
                            <circle cx="65" cy="32" r="2" fill="#c084fc" />
                            <circle cx="52" cy="18" r="2.5" fill="#00f5c4" />
                            <circle cx="75" cy="25" r="2" fill="#c084fc" />
                            <circle cx="75" cy="10" r="3" fill="#00f5c4" />
                            <circle cx="88" cy="25" r="2" fill="#c084fc" />
                            <circle cx="92" cy="12" r="3" fill="#00f5c4" />
                            <circle cx="98" cy="35" r="2" fill="#c084fc" />
                            <circle cx="110" cy="25" r="2.5" fill="#00f5c4" />
                          </svg>
                          <div className="absolute bottom-1 right-2 text-[0.5rem] font-mono text-purple-300/60">
                            21 PTS TRACKED
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[0.6rem] pt-1">
                          <span className="text-white/40">GESTURE:</span>
                          <span className="text-accent font-bold">PEACE / V-SIGN (99.1%)</span>
                        </div>
                        <div className="text-[0.55rem] text-purple-300/60 mt-0.5 truncate">
                          TRIGGER: &gt; meme_overlay_active
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UI/UX Dashboard preview for Aura Fit */}
                  {project.id === 'aura-fit' && (
                    <div className="w-full max-w-[280px] flex flex-col items-center gap-2">
                      <div className="w-full border border-emerald-500/30 bg-emerald-950/20 p-3 rounded font-mono text-left relative">
                        <div className="flex items-center justify-between text-[0.55rem] text-emerald-400/80 border-b border-emerald-500/20 pb-1.5 mb-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                            AURA FITNESS OS
                          </span>
                          <span className="text-white/40">GOAL 85%</span>
                        </div>

                        {/* Metric Grid */}
                        <div className="grid grid-cols-3 gap-1.5 my-1.5 text-center">
                          <div className="border border-white/5 bg-white/5 p-1 rounded">
                            <div className="text-[0.45rem] text-white/40">CALORIES</div>
                            <div className="text-[0.65rem] font-bold text-emerald-400">640 kcal</div>
                          </div>
                          <div className="border border-white/5 bg-white/5 p-1 rounded">
                            <div className="text-[0.45rem] text-white/40">ACTIVE</div>
                            <div className="text-[0.65rem] font-bold text-white/80">75 min</div>
                          </div>
                          <div className="border border-white/5 bg-white/5 p-1 rounded">
                            <div className="text-[0.45rem] text-white/40">STREAK</div>
                            <div className="text-[0.65rem] font-bold text-accent">14 DAYS</div>
                          </div>
                        </div>

                        {/* Weekly activity bars */}
                        <div className="flex items-end justify-between h-9 px-2 pt-1 border-t border-white/5">
                          {[35, 60, 80, 45, 90, 75, 95].map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-0.5">
                              <motion.div
                                className="w-2 rounded-t bg-emerald-400/70"
                                style={{ height: `${h * 0.22}px` }}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                              />
                              <span className="text-[0.42rem] text-white/30">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10" />
          </div>
        </div>
      </div>

      {/* Project number watermark */}
      <div
        className="absolute right-8 bottom-8 font-mono text-[8rem] md:text-[12rem] leading-none text-white/[0.02] select-none pointer-events-none"
        style={{ letterSpacing: '-0.05em' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const panels = trackRef.current!.querySelectorAll('.h-scroll-panel');
      const totalWidth = (panels.length - 1) * window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef}>
      {/* Section header (above pinned area) */}
      <div ref={ref} className="absolute top-0 left-0 z-10 p-8 md:p-16">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] w-8 bg-accent/30" />
            <span className="label-mono">SELECTED WORK</span>
          </div>
        </FadeIn>
      </div>

      {/* Horizontal track */}
      <div className="h-scroll-container" style={{ height: '100vh' }}>
        <div ref={trackRef} className="h-scroll-track">
          {PROJECTS.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
