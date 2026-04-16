'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { products } from '@/data/products';

const CATEGORIES = ['storage', 'analog', 'digital', 'discrete', 'sensors'] as const;
type Category = typeof CATEGORIES[number];

const BRAND_COLORS: Record<string, string> = {
  SAMSUNG: '#1428A0', MICRON: '#ED1C24', ADI: '#F0883E', ST: '#03234B',
  ONSEMI: '#ED1C24', MPS: '#002050', NXP: '#F0E500', TI: '#CC0000',
  TDK: '#5C005C', NEXPERIA: '#001742',
};

function buildBrandCoverage(): Record<string, Category[]> {
  const coverage: Record<string, Category[]> = {};
  for (const p of products) {
    if (!coverage[p.brand]) coverage[p.brand] = [];
    if (CATEGORIES.includes(p.category as Category)) {
      if (!coverage[p.brand].includes(p.category as Category)) {
        coverage[p.brand].push(p.category as Category);
      }
    }
  }
  return coverage;
}

const BRAND_COVERAGE = buildBrandCoverage();
const ALL_BRANDS = Object.keys(BRAND_COVERAGE).sort();

const CAT_LABELS: Record<string, { en: string; zh: string }> = {
  storage:  { en: 'Storage',  zh: '存储' },
  analog:   { en: 'Analog',   zh: '模拟' },
  digital:  { en: 'Digital',  zh: '数字' },
  discrete: { en: 'Discrete', zh: '分立' },
  sensors:  { en: 'Sensors',  zh: '传感器' },
};

const CAT_COLORS: Record<string, string> = {
  storage:  '#3B82F6',
  analog:   '#F0883E',
  digital:  '#8B5CF6',
  discrete: '#00D4AA',
  sensors:  '#EF4444',
};

export default function AboutSection() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isZh = lang === 'zh';

  return (
    <section id="about" ref={ref} style={{ padding: '120px 24px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 56, textAlign: 'center' }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
          {t.about.label}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          {isZh ? '为什么客户选择 CoreWin' : 'Why Hardware Teams Choose CoreWin'}
        </h2>
        <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          {isZh
            ? '授权代理 10+ 全球顶级品牌，覆盖存储、模拟、数字、分立、传感器全品类。'
            : 'Authorized channel for 10+ global semiconductor brands across all five major technology categories.'}
        </p>
      </motion.div>

      {/* Matrix — outer container only handles horizontal scroll */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ overflowX: 'auto', marginBottom: 56 }}
      >
        <div style={{ minWidth: 680 }}>

          {/* Column header row — plain div, not animated */}
          <div style={{ display: 'grid', gridTemplateColumns: '140px repeat(5, 1fr)', gap: 0, marginBottom: 6 }}>
            <div />
            {CATEGORIES.map((cat) => (
              <div key={cat} style={{ textAlign: 'center', padding: '8px 4px 10px', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: CAT_COLORS[cat], letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {isZh ? CAT_LABELS[cat].zh : CAT_LABELS[cat].en}
                </span>
              </div>
            ))}
          </div>

          {/* Brand rows — each row is its own CSS grid */}
          {ALL_BRANDS.map((brand, bi) => {
            const covered = BRAND_COVERAGE[brand] ?? [];
            return (
              <div
                key={brand}
                style={{ display: 'grid', gridTemplateColumns: '140px repeat(5, 1fr)', gap: 0 }}
              >
                {/* Brand name — ONLY the animated cell, rest are plain */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.08 + bi * 0.04, ease: 'easeOut' }}
                  style={{
                    padding: '10px 12px',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', letterSpacing: '0.03em' }}>
                    {brand}
                  </span>
                </motion.div>

                {/* Category cells — plain, no animation */}
                {CATEGORIES.map((cat) => {
                  const has = covered.includes(cat);
                  const catColor = CAT_COLORS[cat];
                  return (
                    <div
                      key={cat}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 4px',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      {has ? (
                        <a
                          href={`/products?brand=${brand}&category=${cat}`}
                          title={`${brand} — ${cat}`}
                          style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: `${catColor}20`, border: `2px solid ${catColor}60`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            textDecoration: 'none',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.2)';
                            e.currentTarget.style.boxShadow = `0 0 12px ${catColor}60`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke={catColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ) : (
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', opacity: 0.25 }} />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ textAlign: 'center' }}
      >
        <a
          href="/products"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 28px', borderRadius: 10,
            background: 'var(--color-accent-cyan)', color: 'var(--color-bg-deep)',
            fontWeight: 700, fontSize: 15, textDecoration: 'none',
            fontFamily: 'var(--font-display)', transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {isZh ? '浏览完整产品目录' : 'Browse Full Product Catalog'}
        </a>
      </motion.div>
    </section>
  );
}
