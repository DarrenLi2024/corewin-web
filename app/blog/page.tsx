'use client';

import { useI18n } from '@/lib/i18n';
import { blogPosts } from '@/content/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

export default function BlogPage() {
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
            {t.blog.backToHome}
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
            {t.blog.label}
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
            {t.blog.headline}
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
            {t.blog.subheadline}
          </p>
        </motion.div>
      </section>

      {/* Blog posts grid */}
      <section
        ref={ref}
        style={{
          padding: '0 24px 120px',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 32,
            }}
          >
            {t.blog.featuredArticles}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="border-glow"
                style={{
                  borderRadius: 16,
                  background: 'var(--color-bg-surface)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}
                >
                  {/* Card header with category color */}
                  <div
                    style={{
                      height: 4,
                      background: `linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-amber))`,
                    }}
                  />

                  <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
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
                        <Tag size={10} />
                        {lang === 'en' ? post.category : post.categoryZh}
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
                        <Clock size={10} />
                        {post.readTime}
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
                        {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.4,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {lang === 'en' ? post.title : post.titleZh}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: 14,
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7,
                        flex: 1,
                      }}
                    >
                      {lang === 'en' ? post.excerpt : post.excerptZh}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 8,
                        paddingTop: 16,
                        borderTop: '1px solid var(--color-border)',
                      }}
                    >
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
                        {post.date}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'var(--color-accent-cyan)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        {t.blog.readMore}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
