'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const TESTIMONIALS = [
  { quote: "CoreWin sourced ONSEMI SiC MOSFETs for our 800V platform when our usual distributor had a 16-week lead time. They delivered in 3 weeks. No other distributor even responded.", author: 'Hardware Lead', handle: '@evpowertrain', role: 'EV Powertrain · Global Top-5 EV OEM', accentColor: '#FF9500', row: 1 },
  { quote: "HBM3E inventory was locked up everywhere. CoreWin accessed Arrow's stock allocation and got our AI accelerator boards built on schedule.", author: 'CTO', handle: '@aicompute', role: 'AI Inference · Shenzhen', accentColor: '#8B5CF6', row: 1 },
  { quote: "ST STM32 + TDK IMU solution detected bearing fault 6 weeks before failure. Unplanned downtime dropped 73% on our conveyor lines.", author: 'CTO', handle: '@factoryauto', role: 'Factory Automation · Suzhou', accentColor: '#00D4AA', row: 1 },
  { quote: "We're a 15-person medtech startup. CoreWin treats our sample orders with the same urgency as a Fortune 500 company. Their ADI signal chain expertise helped us pass IEC 60601-1-2 EMC first-pass.", author: 'Founder', handle: '@medtechhangzhou', role: 'Medical Device · Hangzhou', accentColor: '#EF4444', row: 2 },
  { quote: "OTN equipment needs stratum-level timing accuracy. CoreWin sourced TI IEEE 1588 PHY with full characterization reports — saved us 6 weeks of validation.", author: 'Timing Engineer', handle: '@opticalwuhan', role: 'Optical Transport · Wuhan', accentColor: '#00D4FF', row: 2 },
  { quote: "Cold boot was 4.5s with NAND. CoreWin switched us to MICRON Octal SPI NOR — 1.2s boot, 60% less board space, same cost.", author: 'Firmware Lead', handle: '@basebandsz', role: 'Baseband Unit · Shenzhen', accentColor: '#8B5CF6', row: 2 },
];

const ROW1 = TESTIMONIALS.filter((t) => t.row === 1);
const ROW2 = TESTIMONIALS.filter((t) => t.row === 2);

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}40, ${color}15)`,
      border: `2px solid ${color}50`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function TweetCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{
      width: 340, flexShrink: 0,
      display: 'flex', flexDirection: 'column', gap: 10,
      padding: '18px 22px', borderRadius: 14,
      background: 'var(--color-bg-elevated)', border: `1px solid ${t.accentColor}20`,
      position: 'relative', overflow: 'hidden', height: '100%',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.accentColor}, transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={t.author} color={t.accentColor} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.author}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.role}</div>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={t.accentColor} style={{ opacity: 0.45, flexShrink: 0 }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <blockquote style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0, height: 60, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: t.accentColor, opacity: 0.65 }}>{t.handle}</div>
    </div>
  );
}

function ScrollingRow({ cards, direction }: { cards: typeof TESTIMONIALS; direction: 'left' | 'right' }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Use the global CSS keyframes we define in globals.css or set inline
    // Set via inline style to avoid <style> tag conflicts between two ScrollingRow instances
    const duration = cards.length * 12;
    const keyframesName = direction === 'left' ? 'ticker-left' : 'ticker-right';

    track.style.animationName = keyframesName;
    track.style.animationDuration = `${duration}s`;
    track.style.animationTimingFunction = 'cubic-bezier(0.45, 0, 0.55, 1)';
    track.style.animationIterationCount = 'infinite';
    track.style.animationPlayState = 'running';
  }, [direction, cards.length]);

  const onMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };
  const onMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };

  // 3 copies for seamless loop
  const all = [...cards, ...cards, ...cards];

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <style>{`
        @keyframes ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-66.6667%); }
        }
        @keyframes ticker-right {
          0%   { transform: translateX(0); }
          100% { transform: translateX(66.6667%); }
        }
      `}</style>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: 16,
          width: 'max-content',
        }}
      >
        {all.map((t, i) => <TweetCard key={`${t.handle}-${i}`} t={t} />)}
      </div>
    </div>
  );
}

export default function WhyCoreWinSection() {
  const { t, lang } = useI18n();
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const isZh = lang === 'zh';

  return (
    <section id="why-corewin" style={{ padding: '120px 24px', background: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--color-accent-cyan)" opacity="0.8">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              {isZh ? '客户评价' : 'What Clients Say'}
            </h2>
          </div>
          <a href="/why-corewin" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
            {isZh ? '查看全部客户案例 →' : 'View all case studies →'}
          </a>
        </motion.div>

        <div style={{ marginBottom: 16 }}><ScrollingRow cards={ROW1} direction="left" /></div>
        <div style={{ marginBottom: 56 }}><ScrollingRow cards={ROW2} direction="right" /></div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}
        >
          <a href="/why-corewin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, background: 'var(--color-accent-cyan)', color: 'var(--color-bg-deep)', fontWeight: 700, fontSize: 15, textDecoration: 'none', fontFamily: 'var(--font-display)', transition: 'opacity 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
            {t.whyCoreWin.learnMoreWhy}<ArrowRight size={16} />
          </a>
          <a href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 15, textDecoration: 'none', fontFamily: 'var(--font-display)', transition: 'border-color 0.2s ease, color 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-cyan)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}>
            {t.whyCoreWin.compareCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
