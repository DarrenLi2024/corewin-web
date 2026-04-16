'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n';


export default function HeroSection() {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Dot {
      x: number; y: number; vx: number; vy: number; r: number; alpha: number;
    }
    const dots: Dot[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.35 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(30, 45, 69, 0.5)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 6) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width * 0.35, y);
        ctx.lineTo(canvas.width * 0.35 + 30, y - 20);
        ctx.lineTo(canvas.width, y - 20);
        ctx.stroke();
      }

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${d.alpha})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 24px 80px',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        role="presentation"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(255,149,0,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, textAlign: 'center' }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 100,
            border: '1px solid var(--color-border)',
            background: 'rgba(13, 21, 37, 0.8)',
            marginBottom: 32,
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-accent-green)',
              display: 'inline-block',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          {t.hero.eyebrow}
        </motion.div>

        {/* Authorized brand trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            marginBottom: 48,
            padding: '0',
            flexWrap: 'wrap',
          }}
        >
          {[
            { name: 'SAMSUNG', color: '#1428A0' },
            { name: 'MICRON', color: '#ED1C24' },
            { name: 'ADI', color: '#F0883E' },
            { name: 'ST', color: '#03234B' },
            { name: 'ONSEMI', color: '#ED1C24' },
            { name: 'MPS', color: '#002050' },
            { name: 'NXP', color: '#F0E500' },
            { name: 'TI', color: '#CC0000' },
            { name: 'TDK', color: '#5C005C' },
            { name: 'NEXPERIA', color: '#001742' },
          ].map((brand, i, arr) => (
            <a
              key={brand.name}
              href={`/products?brand=${brand.name}`}
              style={{
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 700,
                color: brand.color,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                borderRight: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
                opacity: 0.75,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
            >
              {brand.name}
            </a>
          ))}
        </motion.div>

        {/* Animated headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 28,
            color: 'var(--color-text-primary)',
          }}
        >
          {t.hero.headlineWords.map((word: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                ...(i === t.hero.headlineWords.length - 1
                  ? {
                      background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-amber))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }
                  : {}),
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--color-text-secondary)',
            maxWidth: 680,
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          {t.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 10,
              background: 'var(--color-accent-cyan)',
              color: 'var(--color-bg-deep)',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,212,255,0.30)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {t.hero.cta}
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-cyan)';
              e.currentTarget.style.background = 'rgba(0,212,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Brand pills — moved to Footer to declutter hero */}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--color-text-muted)',
          fontSize: 12,
          letterSpacing: '0.1em',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)' }}>{t.hero.scrollLabel}</span>
        <ChevronDown size={16} style={{ animation: 'bounce 1.5s ease infinite' }} />
      </motion.div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
