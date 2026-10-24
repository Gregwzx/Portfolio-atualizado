'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { AURAFIT_ARCH_NODES, PERSONAL } from '@/lib/constants';
import { FadeIn, TextReveal } from '@/components/ui/TextReveal';

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
  node: typeof AURAFIT_ARCH_NODES[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="arch-node"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
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
    </motion.div>
  );
}

function PacketAnimation({ packets }: { packets: Packet[] }) {
  return (
    <div className="absolute inset-x-0 pointer-events-none">
      <AnimatePresence>
        {packets.map((packet) => {
          const segmentHeight = 100 / (AURAFIT_ARCH_NODES.length - 1);
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
                  background: '#00f59b',
                  boxShadow: '0 0 8px #00f59b, 0 0 16px #06b6d4',
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function AuraFit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const packetIdRef = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    const runAnimation = async () => {
      if (animating.current) return;
      animating.current = true;

      const nodeCount = AURAFIT_ARCH_NODES.length;

      const sendPacket = (fromIndex: number, toIndex: number, direction: 'down' | 'up') => {
        return new Promise<void>((resolve) => {
          const id = ++packetIdRef.current;
          const steps = 20;
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
  }, [isInView]);

  return (
    <section id="aurafit" className="section relative overflow-hidden">
      {/* Fitness Emerald / Cyan background glow */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 20% 50%, rgba(0,245,155,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <FadeIn className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-emerald-400/40" />
            <span className="font-mono text-xs tracking-widest text-emerald-400">FRONT-END · UI/UX SYSTEM</span>
          </div>
          <TextReveal
            text="Aura Fit"
            className="heading-display text-white mb-4"
            as="h2"
          />
          <p className="font-mono text-[0.7rem] tracking-widest text-white/30 max-w-lg">
            Interface web moderna para rotina e evolução fitness · Foco em componentização, responsividade e experiência do usuário
          </p>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24" ref={ref}>
          {/* Left: Component Architecture visualization */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="label-mono text-emerald-300">FRONT-END ARCHITECTURE</span>
              <span className="font-mono text-[0.55rem] text-emerald-400/60 ml-2">REACT MODULAR</span>
            </div>

            {/* Architecture nodes */}
            <div className="relative flex flex-col gap-0">
              {/* Connection line */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-[1px]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,245,155,0.2), rgba(0,245,155,0.05))',
                }}
              />

              {/* Animated packets */}
              <div
                className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[1px]"
                style={{ minHeight: '300px' }}
              >
                <PacketAnimation packets={packets} />
              </div>

              {/* Nodes */}
              <div className="flex flex-col gap-6 relative z-10">
                {AURAFIT_ARCH_NODES.map((node, i) => (
                  <div key={node.id}>
                    <ArchNode
                      node={node}
                      index={i}
                      isActive={activeNode === i}
                      onClick={() => setActiveNode(activeNode === i ? null : i)}
                    />

                    {i < AURAFIT_ARCH_NODES.length - 1 && (
                      <div className="flex flex-col items-center my-1">
                        <motion.div
                          className="font-mono text-[0.55rem] text-emerald-400/30"
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        >
                          ↓
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between font-mono text-[0.6rem] text-white/15">
              <span>→ USER ACTION</span>
              <span>STATE UPDATE ←</span>
            </div>
          </div>

          {/* Right: Details & Telemetry Preview */}
          <div className="flex flex-col gap-8">
            {/* Active node detail */}
            <AnimatePresence mode="wait">
              {activeNode !== null ? (
                <motion.div
                  key={activeNode}
                  className="border border-emerald-500/20 bg-surface p-6 rounded"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="label-mono text-emerald-400 mb-3">
                    MODULE_{String(activeNode + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-sans font-bold text-white text-xl mb-2">
                    {AURAFIT_ARCH_NODES[activeNode].label}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {AURAFIT_ARCH_NODES[activeNode].description}
                  </p>
                  <div className="mt-4 font-mono text-[0.6rem] text-emerald-400/70">
                    {AURAFIT_ARCH_NODES[activeNode].sublabel}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  className="border border-dashed border-emerald-500/20 p-6 rounded bg-emerald-950/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-mono text-[0.65rem] text-emerald-300/40">
                    // Clique em qualquer camada para inspecionar os detalhes de engenharia de interface
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Core Highlights */}
            <FadeIn>
              <div className="label-mono mb-4 text-white/40">FOCO DE DESENVOLVIMENTO &amp; PRÁTICA</div>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                {[
                  { title: ' Componentização', desc: 'Interfaces desacopladas, limpas e reaproveitáveis' },
                  { title: ' Responsividade Total', desc: 'Layout fluido em telas ultra-wide, laptops e mobile' },
                  { title: ' Experiência do Usuário', desc: 'Navegação direta sem atrito para rotinas diárias' },
                  { title: ' Visualização de Métricas', desc: 'Gráficos de progresso e estatísticas de consistência' },
                ].map((item) => (
                  <div key={item.title} className="p-3 border border-white/5 bg-white/2 rounded">
                    <div className="text-white/80 font-bold">{item.title}</div>
                    <div className="text-[0.6rem] text-emerald-300/50 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Tech stack */}
            <FadeIn>
              <div className="label-mono mb-4">TECNOLOGIAS USADAS</div>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript (ES6+)', 'HTML5 Semantic', 'CSS3 Modern', 'Flexbox / Grid', 'Component Architecture'].map((tech) => (
                  <span key={tech} className="tech-badge" style={{ borderColor: 'rgba(0,245,155,0.3)', color: '#00f59b' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* Project metadata */}
            <FadeIn delay={0.2}>
              <div className="border-t border-white/5 pt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'TIPO', value: 'Front-End / Web' },
                  { label: 'STATUS', value: 'Em Desenvolvimento' },
                  { label: 'ANO', value: '2026' },
                  { label: 'PLATAFORMA', value: 'Web Desktop & Mobile' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="label-mono mb-1">{item.label}</div>
                    <div className="font-mono text-xs text-white/50">{item.value}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* GitHub link */}
            <FadeIn delay={0.3}>
              <a
                href={`https://${PERSONAL.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-widest text-white/30 hover:text-emerald-400 transition-colors"
                data-cursor="hover"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                VER NO GITHUB →
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
