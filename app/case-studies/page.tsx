'use client';

import { useI18n } from '@/lib/i18n';
import { caseStudies } from '@/data/case-studies';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Calendar } from 'lucide-react';

export default function CaseStudiesPage() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <main style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--color-text-muted)',
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              marginBottom: 24,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            <ArrowLeft size={14} />
            {t.caseStudies.backToHome}
          </Link>

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
            {t.caseStudies.label}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 20,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            {t.caseStudies.headline}
          </h1>

          <p
            style={{
              fontSize: 17,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            {t.caseStudies.subheadline}
          </p>
        </motion.div>
      </section>

      {/* Case studies */}
      <section
        ref={ref}
        style={{
          padding: '0 24px 120px',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        {/* Featured cases */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 28,
            marginBottom: 48,
          }}
        >
          {caseStudies
            .filter((cs) => cs.featured)
            .map((cs, i) => (
              <motion.article
                key={cs.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="border-glow"
                style={{
                  borderRadius: 20,
                  background: 'var(--color-bg-surface)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}
                >
                  {/* Top accent */}
                  <div
                    style={{
                      height: 4,
                      background: 'linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-amber))',
                    }}
                  />

                  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
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

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.4,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {lang === 'en' ? cs.title : cs.titleZh}
                    </h2>

                    {/* Client */}
                    <p style={{ fontSize: 13, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {cs.client}
                    </p>

                    {/* Challenge */}
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'var(--color-text-muted)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: 8,
                        }}
                      >
                        {t.caseStudies.challenge}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                        {lang === 'en' ? cs.challenge : cs.challengeZh}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'var(--color-text-muted)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: 10,
                        }}
                      >
                        {t.caseStudies.outcomes}
                      </h3>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {(lang === 'en' ? cs.results : cs.resultsZh).slice(0, 3).map((r, ri) => (
                          <li
                            key={ri}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 8,
                              fontSize: 13,
                              color: 'var(--color-text-secondary)',
                              lineHeight: 1.5,
                            }}
                          >
                            <CheckCircle size={14} style={{ color: 'var(--color-accent-green)', flexShrink: 0, marginTop: 1 }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto',
                        paddingTop: 20,
                        borderTop: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {cs.brands.map((b) => (
                          <span
                            key={b}
                            style={{
                              padding: '3px 10px',
                              borderRadius: 6,
                              background: 'var(--color-bg-elevated)',
                              border: '1px solid var(--color-border)',
                              fontSize: 11,
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'var(--color-accent-cyan)',
                        }}
                      >
                        {t.caseStudies.readMore}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
        </div>

        {/* All cases */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            {t.caseStudies.allStudies}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-glow"
                style={{
                  borderRadius: 14,
                  background: 'var(--color-bg-surface)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 24,
                    padding: '24px 28px',
                    flexWrap: 'wrap',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const child = e.currentTarget.querySelector('.arrow') as HTMLElement;
                    if (child) child.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    const child = e.currentTarget.querySelector('.arrow') as HTMLElement;
                    if (child) child.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)' }}>
                        {cs.year}
                      </span>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: 'rgba(0,212,255,0.08)',
                          border: '1px solid rgba(0,212,255,0.15)',
                          fontSize: 11,
                          color: 'var(--color-accent-cyan)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {lang === 'en' ? cs.industry : cs.industryZh}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {lang === 'en' ? cs.title : cs.titleZh}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {cs.brands.map((b) => (
                      <span
                        key={b}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 6,
                          background: 'var(--color-bg-elevated)',
                          border: '1px solid var(--color-border)',
                          fontSize: 11,
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {b}
                      </span>
                    ))}
                    <ArrowRight size={16} className="arrow" style={{ color: 'var(--color-text-muted)', transition: 'transform 0.2s ease' }} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
