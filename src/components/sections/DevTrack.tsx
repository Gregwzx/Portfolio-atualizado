'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  DEVTRACK_ARCH_NODES,
  MEMECAM_PIPELINE_NODES,
  AURAFIT_ARCH_NODES,
  PERSONAL,
} from '@/lib/constants';
import { FadeIn, TextReveal } from '@/components/ui/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Packet {
  id: number;
  fromIndex: number;
  toIndex: number;
  progress: number;
  direction: 'down' | 'up';
}

function ArchNode({
  node,
  index,
  isActive,
  onClick,
}: {
  node: { id: string; label: string; sublabel: string; description: string; color: string };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div className="arch-node">
      <div
        className={`arch-node-box cursor-pointer select-none ${isActive ? 'active' : ''}`}
        onClick={onClick}
        data-cursor="hover"
        style={
          isActive
            ? { borderColor: node.color + '50', boxShadow: `0 0 30px ${node.color}20` }
            : {}
        }
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.55rem] text-white/20">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="font-mono text-[0.7rem] tracking-[0.12em]"
            style={{ color: isActive ? node.color : undefined }}
          >
            {node.label}
          </span>
        </div>
        <div className="font-mono text-[0.55rem] text-white/20 mt-1 pl-6">
          {node.sublabel}
        </div>
      </div>
    </div>
  );
}

function PacketAnimation({ packets, color }: { packets: Packet[]; color: string }) {
  return (
    <div className="absolute inset-x-0 pointer-events-none">
      <AnimatePresence>
        {packets.map((packet) => {
          const segmentHeight = 100 / 3;
          const fromPct = packet.fromIndex * segmentHeight;
          const top = `${fromPct + packet.progress * segmentHeight}%`;

          return (
            <motion.div
              key={packet.id}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: color,
                  boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------
   SLIDE 1: DEVTRACK
------------------------------------------------------------- */
function DevTrackSlide() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const packetIdRef = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    const runAnimation = async () => {
      if (animating.current) return;
      animating.current = true;

      const nodeCount = DEVTRACK_ARCH_NODES.length;
      const sendPacket = (fromIndex: number, toIndex: number, direction: 'down' | 'up') => {
        return new Promise<void>((resolve) => {
          const id = ++packetIdRef.current;
          const steps = 18;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            setPackets((prev) => [
              ...prev.filter((p) => p.id !== id),
              { id, fromIndex, toIndex, progress, direction },
            ]);
            setActiveNode(progress > 0.5 ? toIndex : fromIndex);
            if (step >= steps) {
              clearInterval(interval);
              setPackets((prev) => prev.filter((p) => p.id !== id));
              resolve();
            }
          }, 40);
        });
      };

      for (let i = 0; i < nodeCount - 1; i++) {
        await sendPacket(i, i + 1, 'down');
        await new Promise((r) => setTimeout(r, 100));
      }
      for (let i = nodeCount - 1; i > 0; i--) {
        await sendPacket(i, i - 1, 'up');
        await new Promise((r) => setTimeout(r, 100));
      }
      setActiveNode(null);
      animating.current = false;
    };

    const id = setInterval(runAnimation, 4500);
    runAnimation();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(0,245,196,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
            <span className="font-mono text-[0.65rem] tracking-widest text-accent">PROJETO 01 // MOBILE &amp; BACKEND</span>
          </div>
          <h2 className="heading-display text-white text-3xl md:text-5xl mb-2">DevTrack</h2>
          <p className="font-mono text-[0.7rem] tracking-widest text-white/30 max-w-xl">
            Sistema completo de produtividade e gestão com React Native, Spring Boot e persistência distribuída.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Architecture */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="label-mono">SYSTEM ARCHITECTURE</span>
              <span className="font-mono text-[0.55rem] text-accent/60 ml-2">LIVE PIPELINE</span>
            </div>

            <div className="relative flex flex-col gap-0">
              <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[1px] bg-gradient-to-b from-accent/20 to-accent/5" />
              <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[1px] min-h-[220px]">
                <PacketAnimation packets={packets} color="#00f5c4" />
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                {DEVTRACK_ARCH_NODES.map((node, i) => (
                  <ArchNode
                    key={node.id}
                    node={node}
                    index={i}
                    isActive={activeNode === i}
                    onClick={() => setActiveNode(activeNode === i ? null : i)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between font-mono text-[0.55rem] text-white/20">
              <span>→ REQUEST JWT</span>
              <span>RESPONSE PAYLOAD ←</span>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-5">
            <div className="border border-white/8 bg-surface/80 p-5 rounded min-h-[140px] flex flex-col justify-center">
              {activeNode !== null ? (
                <div>
                  <div className="label-mono text-accent mb-1">CAMADA_{String(activeNode + 1).padStart(2, '0')}</div>
                  <div className="font-bold text-white text-base mb-1">{DEVTRACK_ARCH_NODES[activeNode].label}</div>
                  <p className="text-white/50 text-xs leading-relaxed">{DEVTRACK_ARCH_NODES[activeNode].description}</p>
                  <div className="mt-2 font-mono text-[0.55rem] text-accent/50">{DEVTRACK_ARCH_NODES[activeNode].sublabel}</div>
                </div>
              ) : (
                <div className="text-center font-mono text-xs text-white/25">
                  // Clique em qualquer camada da arquitetura para inspecionar os detalhes
                </div>
              )}
            </div>

            <div>
              <div className="label-mono mb-2 text-white/40">TECNOLOGIAS</div>
              <div className="flex flex-wrap gap-1.5">
                {['React Native', 'Expo', 'Java', 'Spring Boot', 'MySQL', 'Supabase', 'JWT'].map((tech) => (
                  <span key={tech} className="tech-badge text-xs">{tech}</span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-3">
              {[
                { label: 'PLATAFORMA', value: 'iOS · Android' },
                { label: 'STATUS', value: 'Ativo / Em Produção' },
                { label: 'ANO', value: '2024' },
                { label: 'REPOSITÓRIO', value: 'Disponível no GitHub' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="label-mono mb-0.5">{item.label}</div>
                  <div className="font-mono text-xs text-white/60">{item.value}</div>
                </div>
              ))}
            </div>

            <div>
              <a
                href={`https://${PERSONAL.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-accent hover:underline"
              >
                VER CÓDIGO NO GITHUB →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   SLIDE 2: MEME CAM
------------------------------------------------------------- */
function MemeCamSlide() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const packetIdRef = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    const runAnimation = async () => {
      if (animating.current) return;
      animating.current = true;

      const nodeCount = MEMECAM_PIPELINE_NODES.length;
      const sendPacket = (fromIndex: number, toIndex: number, direction: 'down' | 'up') => {
        return new Promise<void>((resolve) => {
          const id = ++packetIdRef.current;
          const steps = 18;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            setPackets((prev) => [
              ...prev.filter((p) => p.id !== id),
              { id, fromIndex, toIndex, progress, direction },
            ]);
            setActiveNode(progress > 0.5 ? toIndex : fromIndex);
            if (step >= steps) {
              clearInterval(interval);
              setPackets((prev) => prev.filter((p) => p.id !== id));
              resolve();
            }
          }, 40);
        });
      };

      for (let i = 0; i < nodeCount - 1; i++) {
        await sendPacket(i, i + 1, 'down');
        await new Promise((r) => setTimeout(r, 100));
      }
      for (let i = nodeCount - 1; i > 0; i--) {
        await sendPacket(i, i - 1, 'up');
        await new Promise((r) => setTimeout(r, 100));
      }
      setActiveNode(null);
      animating.current = false;
    };

    const id = setInterval(runAnimation, 4500);
    runAnimation();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(168,85,247,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block animate-pulse" />
            <span className="font-mono text-[0.65rem] tracking-widest text-purple-400">PROJETO 02 // COMPUTER VISION · AI</span>
          </div>
          <h2 className="heading-display text-white text-3xl md:text-5xl mb-2">Meme Cam</h2>
          <p className="font-mono text-[0.7rem] tracking-widest text-white/30 max-w-xl">
            Reconhecimento de gestos das mãos em tempo real via câmera local, reagindo com efeitos cyberpunk e memes dinâmicos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Pipeline */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="label-mono text-purple-300">CV INFERENCE PIPELINE</span>
              <span className="font-mono text-[0.55rem] text-purple-400/60 ml-2">60 FPS REAL-TIME</span>
            </div>

            <div className="relative flex flex-col gap-0">
              <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[1px] bg-gradient-to-b from-purple-500/20 to-purple-500/5" />
              <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[1px] min-h-[220px]">
                <PacketAnimation packets={packets} color="#a855f7" />
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                {MEMECAM_PIPELINE_NODES.map((node, i) => (
                  <ArchNode
                    key={node.id}
                    node={node}
                    index={i}
                    isActive={activeNode === i}
                    onClick={() => setActiveNode(activeNode === i ? null : i)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between font-mono text-[0.55rem] text-white/20">
              <span>→ VIDEO FEED</span>
              <span>TRIGGER OVERLAY ←</span>
            </div>
          </div>

          {/* Right: Details & Gestures */}
          <div className="flex flex-col gap-5">
            <div className="border border-purple-500/20 bg-surface/80 p-5 rounded min-h-[140px] flex flex-col justify-center">
              {activeNode !== null ? (
                <div>
                  <div className="label-mono text-purple-400 mb-1">ETAPA_{String(activeNode + 1).padStart(2, '0')}</div>
                  <div className="font-bold text-white text-base mb-1">{MEMECAM_PIPELINE_NODES[activeNode].label}</div>
                  <p className="text-white/50 text-xs leading-relaxed">{MEMECAM_PIPELINE_NODES[activeNode].description}</p>
                  <div className="mt-2 font-mono text-[0.55rem] text-purple-400/70">{MEMECAM_PIPELINE_NODES[activeNode].sublabel}</div>
                </div>
              ) : (
                <div className="text-center font-mono text-xs text-purple-300/30">
                  // Clique em qualquer etapa do pipeline para inspecionar os cálculos de visão computacional
                </div>
              )}
            </div>

            <div>
              <div className="label-mono mb-2 text-white/40">GESTOS MAPEADOS</div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {[
                  { g: '✌️ Paz & Amor', r: 'Efeito HUD + Meme' },
                  { g: '👍 Joinha', r: 'Aprovação instantânea' },
                  { g: '🖕 Dedo do meio', r: 'Censura & Overlay' },
                  { g: '🖐 Mão aberta', r: 'Scan de 21 landmarks' },
                ].map((item) => (
                  <div key={item.g} className="p-2 border border-white/5 bg-white/2 rounded">
                    <span className="text-white/80 font-bold">{item.g}</span>
                    <span className="block text-[0.55rem] text-purple-300/50 mt-0.5">{item.r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="label-mono mb-2 text-white/40">TECNOLOGIAS</div>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'OpenCV', 'MediaPipe', 'NumPy'].map((tech) => (
                  <span key={tech} className="tech-badge text-xs" style={{ borderColor: 'rgba(168,85,247,0.3)', color: '#c084fc' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a
                href={`https://${PERSONAL.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-purple-400 hover:underline"
              >
                VER CÓDIGO NO GITHUB →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   SLIDE 3: AURA FIT
------------------------------------------------------------- */
function AuraFitSlide() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const packetIdRef = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    const runAnimation = async () => {
      if (animating.current) return;
      animating.current = true;

      const nodeCount = AURAFIT_ARCH_NODES.length;
      const sendPacket = (fromIndex: number, toIndex: number, direction: 'down' | 'up') => {
        return new Promise<void>((resolve) => {
          const id = ++packetIdRef.current;
          const steps = 18;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            setPackets((prev) => [
              ...prev.filter((p) => p.id !== id),
              { id, fromIndex, toIndex, progress, direction },
            ]);
            setActiveNode(progress > 0.5 ? toIndex : fromIndex);
            if (step >= steps) {
              clearInterval(interval);
              setPackets((prev) => prev.filter((p) => p.id !== id));
              resolve();
            }
          }, 40);
        });
      };

      for (let i = 0; i < nodeCount - 1; i++) {
        await sendPacket(i, i + 1, 'down');
        await new Promise((r) => setTimeout(r, 100));
      }
      for (let i = nodeCount - 1; i > 0; i--) {
        await sendPacket(i, i - 1, 'up');
        await new Promise((r) => setTimeout(r, 100));
      }
      setActiveNode(null);
      animating.current = false;
    };

    const id = setInterval(runAnimation, 4500);
    runAnimation();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(0,245,155,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-mono text-[0.65rem] tracking-widest text-emerald-400">PROJETO 03 // FRONT-END · UI/UX</span>
          </div>
          <h2 className="heading-display text-white text-3xl md:text-5xl mb-2">Aura Fit</h2>
          <p className="font-mono text-[0.7rem] tracking-widest text-white/30 max-w-xl">
            Interface web moderna e responsiva para acompanhamento de rotina fitness, com ênfase em componentização, métricas e UX.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Frontend Architecture */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="label-mono text-emerald-300">FRONT-END ARCHITECTURE</span>
              <span className="font-mono text-[0.55rem] text-emerald-400/60 ml-2">REACT MODULAR</span>
            </div>

            <div className="relative flex flex-col gap-0">
              <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[1px] bg-gradient-to-b from-emerald-500/20 to-emerald-500/5" />
              <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[1px] min-h-[220px]">
                <PacketAnimation packets={packets} color="#00f59b" />
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                {AURAFIT_ARCH_NODES.map((node, i) => (
                  <ArchNode
                    key={node.id}
                    node={node}
                    index={i}
                    isActive={activeNode === i}
                    onClick={() => setActiveNode(activeNode === i ? null : i)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between font-mono text-[0.55rem] text-white/20">
              <span>→ USER ACTION</span>
              <span>STATE PERSISTENCE ←</span>
            </div>
          </div>

          {/* Right: Highlights & Telemetry */}
          <div className="flex flex-col gap-5">
            <div className="border border-emerald-500/20 bg-surface/80 p-5 rounded min-h-[140px] flex flex-col justify-center">
              {activeNode !== null ? (
                <div>
                  <div className="label-mono text-emerald-400 mb-1">MÓDULO_{String(activeNode + 1).padStart(2, '0')}</div>
                  <div className="font-bold text-white text-base mb-1">{AURAFIT_ARCH_NODES[activeNode].label}</div>
                  <p className="text-white/50 text-xs leading-relaxed">{AURAFIT_ARCH_NODES[activeNode].description}</p>
                  <div className="mt-2 font-mono text-[0.55rem] text-emerald-400/70">{AURAFIT_ARCH_NODES[activeNode].sublabel}</div>
                </div>
              ) : (
                <div className="text-center font-mono text-xs text-emerald-300/30">
                  // Clique em qualquer camada para inspecionar os detalhes de componentização e UX
                </div>
              )}
            </div>

            <div>
              <div className="label-mono mb-2 text-white/40">PILARE DE DESENVOLVIMENTO</div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {[
                  { t: '🧩 Componentização', d: 'Módulos reaproveitáveis' },
                  { t: '📱 Responsividade', d: 'Fluido em qualquer tela' },
                  { t: '⚡ Experiência UX', d: 'Zero atrito na rotina' },
                  { t: '📊 Telemetria', d: 'Streaks, tempo & calorias' },
                ].map((item) => (
                  <div key={item.t} className="p-2 border border-white/5 bg-white/2 rounded">
                    <span className="text-white/80 font-bold">{item.t}</span>
                    <span className="block text-[0.55rem] text-emerald-300/50 mt-0.5">{item.d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="label-mono mb-2 text-white/40">TECNOLOGIAS</div>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'JavaScript', 'HTML5', 'CSS3', 'Component Design'].map((tech) => (
                  <span key={tech} className="tech-badge text-xs" style={{ borderColor: 'rgba(0,245,155,0.3)', color: '#00f59b' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <a
                href={`https://${PERSONAL.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-emerald-400 hover:underline"
              >
                VER CÓDIGO NO GITHUB →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   MAIN COMPONENT: HORIZONTAL PINNED SHOWCASE
------------------------------------------------------------- */
export function DevTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const panels = trackRef.current!.querySelectorAll('.deepdive-panel');
      const totalWidth = (panels.length - 1) * window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          id: 'devtrack-horizontal-trigger',
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
    <section id="devtrack" ref={containerRef} className="relative overflow-hidden bg-background">
      {/* Horizontal scrolling track */}
      <div className="h-scroll-container" style={{ height: '100vh', width: '100vw' }}>
        <div ref={trackRef} className="h-scroll-track" style={{ height: '100%' }}>
          <div className="deepdive-panel w-screen h-screen flex-shrink-0">
            <DevTrackSlide />
          </div>
          <div id="memecam" className="deepdive-panel w-screen h-screen flex-shrink-0">
            <MemeCamSlide />
          </div>
          <div id="aurafit" className="deepdive-panel w-screen h-screen flex-shrink-0">
            <AuraFitSlide />
          </div>
        </div>
      </div>
    </section>
  );
}
