'use client';

import { use } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { caseStudies } from '@/data/case-studies';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t, lang } = useI18n();
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return (
      <main style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--color-text-primary)', marginBottom: 16 }}>
            {t.caseStudies.notFound}
          </h1>
          <Link href="/case-studies" style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>
            ← {t.caseStudies.backToHome}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 60,
          padding: '140px 24px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}
        >
          <Breadcrumb
            items={[
              { label: t.caseStudies.label, href: '/case-studies' },
              { label: lang === 'en' ? cs.title : cs.titleZh },
            ]}
          />

          {/* Meta */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 100,
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.2)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--color-accent-cyan)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {lang === 'en' ? cs.industry : cs.industryZh}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Calendar size={10} />
              {cs.year}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 16,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {lang === 'en' ? cs.title : cs.titleZh}
          </h1>

          <p
            style={{
              fontSize: 14,
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-mono)',
              marginBottom: 8,
            }}
          >
            {cs.client}
          </p>

          {/* Brand tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            {cs.brands.map((b) => (
              <span
                key={b}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {b}
              </span>
            ))}
            {cs.products.map((p) => (
              <span
                key={p}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: 'rgba(0,212,255,0.06)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-accent-cyan)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section
        style={{
          padding: '0 24px 120px',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
        >
          {/* Challenge */}
          <div
            style={{
              padding: '36px',
              borderRadius: 20,
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--color-accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {t.caseStudies.challenge}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.9 }}>
              {lang === 'en' ? cs.challenge : cs.challengeZh}
            </p>
          </div>

          {/* Solution */}
          <div
            style={{
              padding: '36px',
              borderRadius: 20,
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--color-accent-amber)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {lang === 'en' ? 'Solution' : '解决方案'}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.9 }}>
              {lang === 'en' ? cs.solution : cs.solutionZh}
            </p>
          </div>

          {/* Results */}
          <div
            style={{
              padding: '36px',
              borderRadius: 20,
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--color-accent-green)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              {t.caseStudies.outcomes}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(lang === 'en' ? cs.results : cs.resultsZh).map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '16px 20px',
                    borderRadius: 12,
                    background: 'rgba(0,229,160,0.05)',
                    border: '1px solid rgba(0,229,160,0.15)',
                  }}
                >
                  <CheckCircle size={18} style={{ color: 'var(--color-accent-green)', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 15, color: 'var(--color-text-primary)', lineHeight: 1.6 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
