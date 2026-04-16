'use client';

import { use } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { blogPosts } from '@/content/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t, lang } = useI18n();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
        <Navbar />
        <div
          style={{
            paddingTop: 160,
            paddingBottom: 80,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              color: 'var(--color-text-primary)',
              marginBottom: 16,
            }}
          >
            {t.blog.notFound}
          </h1>
          <Link
            href="/blog"
            style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: 14 }}
          >
            ← {t.blog.backToHome}
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
          style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}
        >
          <Breadcrumb
            items={[
              { label: t.blog.label, href: '/blog' },
              { label: lang === 'en' ? post.title : post.titleZh },
            ]}
          />

          {/* Meta */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
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
              {post.date}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 20,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {lang === 'en' ? post.title : post.titleZh}
          </h1>

          <p
            style={{
              fontSize: 17,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
            }}
          >
            {lang === 'en' ? post.excerpt : post.excerptZh}
          </p>
        </motion.div>
      </section>

      {/* Article body */}
      <section
        style={{
          padding: '0 24px 120px',
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            padding: '40px',
            borderRadius: 20,
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              fontSize: 15,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.9,
              fontFamily: 'var(--font-body)',
            }}
          >
            {(lang === 'en' ? post.content : post.contentZh)
              .trim()
              .split('\n')
              .map((line, i) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2
                      key={i}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginTop: 40,
                        marginBottom: 16,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3
                      key={i}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginTop: 32,
                        marginBottom: 12,
                      }}
                    >
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li
                      key={i}
                      style={{
                        marginLeft: 20,
                        marginBottom: 8,
                        lineHeight: 1.8,
                      }}
                    >
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                if (line.startsWith('| ')) {
                  return null; // Skip table rendering for simplicity
                }
                if (line.trim() === '') {
                  return <br key={i} />;
                }
                return (
                  <p key={i} style={{ marginBottom: 16, lineHeight: 1.8 }}>
                    {line}
                  </p>
                );
              })}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
