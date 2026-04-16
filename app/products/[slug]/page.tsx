'use client';

import { use } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, FileText, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Auto-generated from products.ts — no manual mapping needed
function buildSlugMap() {
  const map: Record<string, string[]> = {};
  const seen: Record<string, boolean> = {};
  for (const p of products) {
    const base = p.productLine.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
    const key = seen[base] ? `${base}-${p.brand.toLowerCase()}` : base;
    seen[base] = true;
    map[key] = [p.brand, p.category];
  }
  return map;
}
const slugToProducts: Record<string, string[]> = buildSlugMap();

// Dynamic related products for a given brand+category
function getRelatedLinks(brand: string, category: string) {
  return products
    .filter((p) => p.brand === brand && p.category === category && p.productLine)
    .map((p) => {
      const base = p.productLine.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
      const seenDup = Object.entries(slugToProducts).filter(([k, v]) => v[0] === brand && v[1] === category);
      const slug = seenDup.length > 1 ? `${base}-${brand.toLowerCase()}` : base;
      return {
        brand: p.brand,
        cat: p.productLine,
        href: `/products/${slug}`,
      };
    })
    .slice(0, 4);
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t, lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const keys = slugToProducts[slug];
  const filtered = keys ? products.filter((p) => p.brand === keys[0] && p.category === keys[1]) : [];
  const displayProducts = filtered.length > 0 ? filtered : [];

  const categoryLabel = (cat: string) =>
    ((t.products.categories as Record<string, string>)[cat]) || cat;

  const brandColor: Record<string, string> = {
    SAMSUNG: '#4280EF',
    MICRON: '#0271D6',
    ADI: '#5282F9',
    ST: '#03234B',
    ONSEMI: '#FF9500',
    MPS: '#00D4AA',
    NXP: '#1E6BB8',
    TI: '#B4009E',
    TDK: '#009B77',
    NEXPERIA: '#D40028',
  };

  return (
    <main style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          padding: '140px 24px 80px',
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
          style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}
        >
          <Breadcrumb
            items={[
              { label: t.products.label, href: '/products' },
              ...(displayProducts[0]
                ? [{ label: lang === 'en' ? displayProducts[0].productLine : displayProducts[0].productLine }]
                : []),
            ]}
          />

          {displayProducts[0] ? (
            <>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: brandColor[displayProducts[0].brand] ?? 'var(--color-accent-cyan)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                {displayProducts[0].brand}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 16,
                  letterSpacing: '-0.02em',
                }}
              >
                {lang === 'en' ? displayProducts[0].productLine : displayProducts[0].productLine}
              </h1>
              <p
                style={{
                  fontSize: 17,
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: 640,
                }}
              >
                {displayProducts[0].description}
              </p>
            </>
          ) : (
            <>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 16,
                  letterSpacing: '-0.02em',
                }}
              >
                {lang === 'en' ? 'Product Not Found' : '未找到产品'}
              </h1>
              <Link
                href="/products"
                style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: 14 }}
              >
                ← {lang === 'en' ? 'Browse all products' : '浏览全部产品'}
              </Link>
            </>
          )}
        </motion.div>
      </section>

      {/* Product cards */}
      <section
        ref={ref}
        style={{
          padding: '0 24px 120px',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        {displayProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 24,
            }}
          >
            {displayProducts.map((product, i) => (
              <motion.div
                key={`${product.brand}-${product.category}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  padding: '32px',
                  borderRadius: 16,
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.1em',
                      marginBottom: 6,
                    }}
                  >
                    {product.brand}
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginBottom: 8,
                    }}
                  >
                    {categoryLabel(product.category)}
                  </h2>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 100,
                      border: `1px solid ${product.tagColor}40`,
                      background: `${product.tagColor}10`,
                      fontSize: 11,
                      fontWeight: 600,
                      color: product.tagColor,
                    }}
                  >
                    {product.tag}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--color-accent-amber)',
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: 'rgba(255,149,0,0.06)',
                    border: '1px solid rgba(255,149,0,0.15)',
                  }}
                >
                  {product.specs}
                </div>

                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  {product.description}
                </p>

                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {product.applications.slice(0, 3).map((app) => (
                      <span
                        key={app}
                        style={{
                          padding: '3px 10px',
                          borderRadius: 6,
                          background: 'rgba(0,212,255,0.06)',
                          border: '1px solid rgba(0,212,255,0.15)',
                          fontSize: 11,
                          color: 'var(--color-accent-cyan)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <a
                    href="#contact"
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '12px 20px',
                      borderRadius: 10,
                      background: 'var(--color-accent-cyan)',
                      color: 'var(--color-bg-deep)',
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none',
                      textAlign: 'center',
                    }}
                  >
                    <FileText size={14} />
                    {t.productDetail.requestSample}
                  </a>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '12px 20px',
                      borderRadius: 10,
                      border: '1px solid var(--color-border)',
                      background: 'transparent',
                      color: 'var(--color-text-secondary)',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    <Download size={14} />
                    {t.productDetail.downloadDatasheet}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 16, color: 'var(--color-text-muted)' }}>
              {lang === 'en' ? 'No products found for this category.' : '该分类下暂无产品。'}
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 24,
                padding: '12px 24px',
                borderRadius: 10,
                background: 'var(--color-accent-cyan)',
                color: 'var(--color-bg-deep)',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              {lang === 'en' ? 'Browse all products →' : '浏览全部产品 →'}
            </Link>
          </div>
        )}

        {/* Related products — only shown when we have products */}
        {displayProducts.length > 0 && keys && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginTop: 64 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: 20,
              }}
            >
              {t.productDetail.relatedProducts}
            </h3>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {getRelatedLinks(keys[0], keys[1]).map((rel) => (
                <Link
                  key={`${rel.brand}-${rel.href}`}
                  href={rel.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 18px',
                    borderRadius: 10,
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)',
                    color: 'var(--color-text-secondary)',
                    fontSize: 13,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent-cyan)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)' }}>
                    {rel.brand}
                  </span>
                  <ChevronRight size={12} />
                  {rel.cat}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}