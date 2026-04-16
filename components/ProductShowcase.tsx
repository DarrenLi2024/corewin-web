'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Product, products, CATEGORY_KEYS, CATEGORY_COLORS } from '@/data/products';
import { useI18n } from '@/lib/i18n';



export default function ProductShowcase({ onRequestSamples }: { onRequestSamples?: (product: Product) => void }) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.brand.toLowerCase().includes(q) ||
          p.productLine.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specs.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, query]);

  const groupedByBrand = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    for (const p of filtered) {
      if (!groups[p.brand]) groups[p.brand] = [];
      groups[p.brand].push(p);
    }
    return groups;
  }, [filtered]);

  const catLabels = t.products.categories as Record<string, string>;
  const catDescriptions = t.products.categoryDescriptions as Record<string, string>;

  const handleRequestSamples = (product: Product) => {
    if (onRequestSamples) onRequestSamples(product);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
          style={{ textAlign: 'center', marginBottom: 48 }}
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
            {t.products.headline}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-text-secondary)',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {t.products.subheadline}
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 24,
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setActiveCategory('All')}
            style={{
              padding: '8px 20px',
              borderRadius: 10,
              border: `1px solid ${activeCategory === 'All' ? 'var(--color-accent-cyan)' : 'var(--color-border)'}`,
              background: activeCategory === 'All' ? 'rgba(0,212,255,0.1)' : 'transparent',
              color: activeCategory === 'All' ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            All Brands
          </button>

          {CATEGORY_KEYS.map((cat) => {
            const color = CATEGORY_COLORS[cat];
            const catLabel = catLabels[cat] || cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 10,
                  border: `1px solid ${activeCategory === cat ? color : 'var(--color-border)'}`,
                  background: activeCategory === cat ? `${color}15` : 'transparent',
                  color: activeCategory === cat ? color : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {catLabel}
              </button>
            );
          })}
        </motion.div>

        {/* Category description banner */}
        <AnimatePresence mode="wait">
          {activeCategory !== 'All' && catDescriptions[activeCategory] && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                textAlign: 'center',
                padding: '16px 24px',
                marginBottom: 24,
                borderRadius: 12,
                background: `${CATEGORY_COLORS[activeCategory]}08`,
                border: `1px solid ${CATEGORY_COLORS[activeCategory]}20`,
                maxWidth: 700,
                margin: '0 auto 24px',
              }}
            >
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {catDescriptions[activeCategory]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            position: 'relative',
            marginBottom: 24,
            maxWidth: 520,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
            }}
          />
          <input
            type="text"
            placeholder={t.products.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 40px 12px 40px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-elevated)',
              color: 'var(--color-text-primary)',
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-cyan)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                padding: 2,
                display: 'flex',
              }}
            >
              <X size={14} />
            </button>
          )}
        </motion.div>

        {/* Results count */}
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-mono)',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          {filtered.length} {t.products.resultsCount}
          {query && (
            <span style={{ color: 'var(--color-accent-cyan)' }}>
              {' '}for &quot;{query}&quot;
            </span>
          )}
        </div>

        {/* Product groups by brand */}
        <motion.div layout>
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              Object.entries(groupedByBrand).map(([brand, brandProducts]) => {
                const firstProduct = brandProducts[0];
                const catColor = CATEGORY_COLORS[firstProduct.category];
                return (
                  <motion.div
                    key={brand}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ marginBottom: 40 }}
                  >
                    {/* Brand header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 20,
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {brand}
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: 1,
                          background: `linear-gradient(90deg, ${catColor}40, transparent)`,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: catColor,
                          background: `${catColor}10`,
                          border: `1px solid ${catColor}30`,
                          padding: '2px 8px',
                          borderRadius: 100,
                        }}
                      >
                        {catLabels[firstProduct.category] || firstProduct.category}
                      </span>
                    </div>

                    {/* Product cards */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 16,
                      }}
                    >
                      {brandProducts.map((product, i) => (
                        <motion.div
                          key={`${product.brand}-${product.productLine}-${i}`}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          style={{
                            padding: '24px',
                            borderRadius: 16,
                            background: 'var(--color-bg-elevated)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            transition: 'transform 0.2s ease, border-color 0.2s ease',
                            cursor: 'default',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.borderColor = `${catColor}50`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                          }}
                        >
                          {/* Header */}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              gap: 8,
                            }}
                          >
                            <h3
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 16,
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                              }}
                            >
                              {product.productLine}
                            </h3>
                            <span
                              style={{
                                padding: '3px 10px',
                                borderRadius: 100,
                                border: `1px solid ${product.tagColor}40`,
                                background: `${product.tagColor}10`,
                                fontSize: 11,
                                fontWeight: 600,
                                color: product.tagColor,
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                              }}
                            >
                              {product.tag}
                            </span>
                          </div>

                          {/* Specs */}
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 12,
                              color: catColor,
                              padding: '5px 10px',
                              borderRadius: 6,
                              background: `${catColor}08`,
                              border: `1px solid ${catColor}20`,
                              display: 'inline-block',
                              width: 'fit-content',
                            }}
                          >
                            {product.specs}
                          </div>

                          {/* Description */}
                          <p
                            style={{
                              fontSize: 13,
                              color: 'var(--color-text-secondary)',
                              lineHeight: 1.6,
                              flex: 1,
                            }}
                          >
                            {product.description}
                          </p>

                          {/* CTA */}
                          <button
                            onClick={() => handleRequestSamples(product)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: 13,
                              fontWeight: 600,
                              color: catColor,
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '4px 0',
                              fontFamily: 'var(--font-body)',
                              marginTop: 4,
                            }}
                          >
                            {t.products.requestSamples}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: 'var(--color-text-muted)',
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🔍</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    marginBottom: 8,
                  }}
                >
                  {t.products.noResults}
                </h3>
                <p style={{ fontSize: 14 }}>{t.products.noResultsHint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
