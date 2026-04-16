'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { CATEGORY_KEYS, CATEGORY_COLORS, products } from '@/data/products';

export default function CategoryPreview() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const catLabels = t.products.categories as Record<string, string>;
  const catDescriptions = t.products.categoryDescriptions as Record<string, string>;

  // Dynamically compute the brand with the most products in each category
  // No hardcoding — derived from live products data, immune to drift
  const featuredBrandByCategory = useMemo(() => {
    const result: Record<string, string> = {};
    for (const cat of CATEGORY_KEYS) {
      const brandCounts: Record<string, number> = {};
      for (const p of products) {
        if (p.category === cat) brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
      }
      const top = Object.entries(brandCounts).sort((a, b) => b[1] - a[1])[0];
      result[cat] = top?.[0] ?? cat;
    }
    return result;
  }, []);

  return (
    <section
      id="products"
      ref={ref}
      style={{
        padding: '120px 24px',
        background: 'var(--color-bg-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
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
            {t.products.label}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            {t.products.categoriesHeadline as string}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-text-secondary)',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {t.products.categoriesSubheadline as string}
          </p>
        </motion.div>

        {/* 5 Category Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 20,
            marginBottom: 48,
          }}
        >
          {CATEGORY_KEYS.map((cat, i) => {
            const color = CATEGORY_COLORS[cat];
            const featured = featuredBrandByCategory[cat];
            const label = catLabels[cat] || cat;
            const desc = catDescriptions[cat] || '';

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
                style={{
                  padding: '28px 24px',
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
                  e.currentTarget.style.borderColor = `${color}60`;
                  e.currentTarget.style.boxShadow = `0 16px 48px ${color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${color}, transparent 80%)`,
                    borderRadius: '20px 20px 0 0',
                  }}
                />

                {/* Category label */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: 8,
                  }}
                >
                  {label}
                </h3>

                {/* Color dot + featured brand */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: color, display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: color,
                      fontWeight: 600,
                    }}
                  >
                    {featured}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)' }}>
                    & more
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  {desc}
                </p>

                {/* View products CTA */}
                <a
                  href={`/products?category=${cat}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    color: color,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    transition: 'gap 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = '8px')}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = '4px')}
                >
                  View products
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Full catalog CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <a
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 28px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-cyan)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
              e.currentTarget.style.background = 'rgba(0,212,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {t.products.browseFullCatalog as string}
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
