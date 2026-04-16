'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Wrench, Zap, ShieldCheck, Network, ArrowRight, TrendingUp } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const PILLAR_ORDER = [
  { icon: Wrench,      key: 'technical' as const },
  { icon: Zap,         key: 'rapid' as const },
  { icon: Network,     key: 'channel' as const },
  { icon: ShieldCheck, key: 'authorized' as const },
];

const CLIENT_RESULTS = [
  { metricKey: 'result1', color: '#FF9500' },
  { metricKey: 'result2', color: '#8B5CF6' },
  { metricKey: 'result3', color: '#00D4AA' },
  { metricKey: 'result4', color: '#EF4444' },
] as const;

const COMPARE_ROWS = [
  { rowKey: 'compareRow1' },
  { rowKey: 'compareRow2' },
  { rowKey: 'compareRow3' },
  { rowKey: 'compareRow4' },
];

export default function WhyCoreWinPage() {
  const { t, lang } = useI18n();
  const resultsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  const resultsInView = useInView(resultsRef, { once: true, margin: '-60px' });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-60px' });
  const compareInView = useInView(compareRef, { once: true, margin: '-60px' });

  return (
    <main style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          padding: '140px 24px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--color-accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {t.whyCoreWin.label}
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 20,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              {t.whyCoreWin.headline}
            </h1>
            <p
              style={{
                fontSize: 17,
                color: 'var(--color-text-secondary)',
                maxWidth: 620,
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              {t.whyCoreWin.subheadline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 4 Differentiator Pillars ─── */}
      <section
        ref={pillarsRef}
        style={{
          padding: '80px 24px 120px',
          background: 'var(--color-bg-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 56 }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              {lang === 'en' ? 'Four Reasons to Work With CoreWin' : '选择 CoreWin 的四个理由'}
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'var(--color-text-muted)',
                textAlign: 'center',
              }}
            >
              {lang === 'en'
                ? 'Built on expertise, speed, network, and trust.'
                : '以专业、速度、网络和信任为基础。'}
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {PILLAR_ORDER.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: '36px 32px',
                  borderRadius: 20,
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--color-accent-cyan)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,212,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Watermark icon */}
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.04, pointerEvents: 'none' }}>
                  <item.icon size={160} color="var(--color-accent-cyan)" />
                </div>

                {/* Order number */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--color-accent-cyan)',
                    letterSpacing: '0.08em',
                    marginBottom: 16,
                    opacity: 0.6,
                  }}
                >
                  0{i + 1}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                  }}
                >
                  <item.icon size={24} color="var(--color-accent-cyan)" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 12,
                  }}
                >
                  {(t.whyCoreWin as Record<string, string | undefined>)[item.key]}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  {(t.whyCoreWin as Record<string, string | undefined>)[`${item.key}Desc`]}
                </p>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 100,
                    border: '1px solid rgba(0,212,255,0.3)',
                    background: 'rgba(0,212,255,0.06)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--color-accent-cyan)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <TrendingUp size={11} color="var(--color-accent-cyan)" />
                  {(t.whyCoreWin as Record<string, string | undefined>)[`${item.key}Badge`]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What Clients Achieved ─── */}
      <section
        ref={resultsRef}
        style={{
          padding: '100px 24px',
          background: 'var(--color-bg-deep)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--color-accent-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              {t.whyCoreWin.resultsLabel}
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 8,
              }}
            >
              {t.whyCoreWin.resultsSubheadline}
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            {CLIENT_RESULTS.map((r, i) => {
              const metric = (t.whyCoreWin as Record<string, string | undefined>)[`${r.metricKey}Metric`] ?? '';
              const label = (t.whyCoreWin as Record<string, string | undefined>)[`${r.metricKey}Label`] ?? '';
              const detail = (t.whyCoreWin as Record<string, string | undefined>)[`${r.metricKey}Detail`] ?? '';

              return (
                <motion.div
                  key={r.metricKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    padding: '28px 24px',
                    borderRadius: 16,
                    background: 'var(--color-bg-surface)',
                    border: `1px solid ${r.color}30`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${r.color}, transparent)` }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, color: r.color, lineHeight: 1, marginBottom: 8 }}>
                    {metric}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {detail}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={resultsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ textAlign: 'center', marginTop: 40 }}
          >
            <a
              href="/case-studies"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              {t.whyCoreWin.compareCta}
              <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section
        ref={compareRef}
        style={{
          padding: '80px 24px 120px',
          background: 'var(--color-bg-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={compareInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 40 }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 3vw, 30px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 8,
              }}
            >
              {t.whyCoreWin.compareLabel}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={compareInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ borderRadius: 20, border: '1px solid var(--color-border)', overflow: 'hidden' }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                padding: '14px 32px',
                background: 'var(--color-bg-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {[t.whyCoreWin.compareRow1Label, 'CoreWin', t.whyCoreWin.compareVs].map((h, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: i === 1 ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: i === 1 ? 700 : 400,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={row.rowKey}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  padding: '16px 32px',
                  borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid var(--color-border)' : 'none',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  {(t.whyCoreWin as Record<string, string | undefined>)[`${row.rowKey}Label`]}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {(t.whyCoreWin as Record<string, string | undefined>)[`${row.rowKey}Corewin`]}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-muted)', textDecoration: 'line-through', textDecorationColor: 'var(--color-border)' }}>
                  {(t.whyCoreWin as Record<string, string | undefined>)[`${row.rowKey}Arrow`]}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA: Contact ─── */}
      <ContactSection />
      <Footer />
    </main>
  );
}


