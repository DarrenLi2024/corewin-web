'use client';

import { useState, useMemo, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Product, products, CATEGORY_KEYS, CATEGORY_COLORS } from '@/data/products';
import { useI18n } from '@/lib/i18n';

// ─── URL-backed filter state ──────────────────────────────────────────────────
// URL is the source of truth. On mount, state is initialized from searchParams.
// Every filter change updates the URL via router.push, making links shareable.
// ─────────────────────────────────────────────────────────────────────────────

function ProductsCatalog() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Initialize state from URL params on first render (source of truth on mount)
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState(() => searchParams.get('category') ?? 'All');
  const [activeBrand, setActiveBrand] = useState(() => searchParams.get('brand') ?? 'All');
  const [activeApplications, setActiveApplications] = useState(() => searchParams.get('applications') ?? 'All');

  // Keep URL in sync whenever filters change
  const updateUrl = useCallback((patch: { q?: string; category?: string; brand?: string; applications?: string }) => {
    const params = new URLSearchParams();
    const q = patch.q ?? query;
    const cat = patch.category ?? activeCategory;
    const brand = patch.brand ?? activeBrand;
    if (q) params.set('q', q);
    if (cat !== 'All') params.set('category', cat);
    if (brand !== 'All') params.set('brand', brand);
    const apps = patch.applications ?? activeApplications;
    if (apps !== 'All') params.set('applications', apps);
    const search = params.toString();
    router.push(`/products${search ? `?${search}` : ''}`, { scroll: false });
  }, [query, activeCategory, activeBrand, activeApplications, router]);

  const handleQueryChange = (v: string) => {
    setQuery(v);
    updateUrl({ q: v });
  };

  const handleCategoryChange = (v: string) => {
    setActiveCategory(v);
    updateUrl({ category: v });
  };

  const handleBrandChange = (v: string) => {
    setActiveBrand(v);
    updateUrl({ brand: v });
  };

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('All');
    setActiveBrand('All');
    setActiveApplications('All');
    router.push('/products', { scroll: false });
  };

  const allBrands = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.brand)))],
    []
  );

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'All') result = result.filter((p) => p.category === activeCategory);
    if (activeBrand !== 'All') result = result.filter((p) => p.brand === activeBrand);
    if (activeApplications !== 'All') result = result.filter((p) => (p.applications ?? []).includes(activeApplications));
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
  }, [activeCategory, activeBrand, activeApplications, query]);

  const groupedByBrand = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    for (const p of filtered) {
      if (!groups[p.brand]) groups[p.brand] = [];
      groups[p.brand].push(p);
    }
    return groups;
  }, [filtered]);

  const catLabels = t.products.categories as Record<string, string>;

  const hasActiveFilters = activeCategory !== 'All' || activeBrand !== 'All' || activeApplications !== 'All' || !!query.trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg-deep)' }}>
      {/* ─── Page Hero (fixed height = Navbar 72px + generous breathing room) ─── */}
      {/* Note: 140px = 72px Navbar height + 68px extra breathing room for hero content */}
      <section
        style={{
          padding: '140px 24px 60px',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-surface)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
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
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            {t.products.headline}
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            {t.products.subheadline}
          </p>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
            />
            <input
              type="text"
              placeholder={t.products.searchPlaceholder}
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 44px',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-elevated)',
                color: 'var(--color-text-primary)',
                fontSize: 15,
                fontFamily: 'var(--font-body)',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-cyan)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
            />
            {query && (
              <button
                onClick={() => handleQueryChange('')}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Filters + Catalog ─── */}
      <section ref={ref} style={{ padding: '48px 24px 120px', flex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Filter row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>

            {/* Category tabs — responsive: scrollable row on mobile */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                justifyContent: 'center',
                overflowX: 'auto',
                paddingBottom: 4,
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <button
                onClick={() => handleCategoryChange('All')}
                style={{
                  padding: '8px 20px', borderRadius: 10,
                  border: `1px solid ${activeCategory === 'All' ? 'var(--color-accent-cyan)' : 'var(--color-border)'}`,
                  background: activeCategory === 'All' ? 'rgba(0,212,255,0.1)' : 'transparent',
                  color: activeCategory === 'All' ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}
              >
                All Categories
              </button>
              {CATEGORY_KEYS.map((cat) => {
                const color = CATEGORY_COLORS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      padding: '8px 20px', borderRadius: 10,
                      border: `1px solid ${activeCategory === cat ? color : 'var(--color-border)'}`,
                      background: activeCategory === cat ? `${color}15` : 'transparent',
                      color: activeCategory === cat ? color : 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                      cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                    }}
                  >
                    {catLabels[cat] || cat}
                  </button>
                );
              })}
            </div>

            {/* Brand pills — horizontal scroll on overflow */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {allBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  style={{
                    padding: '6px 16px', borderRadius: 8,
                    border: `1px solid ${activeBrand === brand ? 'var(--color-accent-cyan)' : 'var(--color-border)'}`,
                    background: activeBrand === brand ? 'rgba(0,212,255,0.1)' : 'transparent',
                    color: activeBrand === brand ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Results count + clear */}
          <div
            style={{
              fontSize: 13, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)',
              marginBottom: 24, textAlign: 'center',
            }}
          >
            {filtered.length} {t.products.resultsCount}
            {query && <span style={{ color: 'var(--color-accent-cyan)' }}> for &quot;{query}&quot;</span>}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  marginLeft: 16, background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-accent-cyan)', fontSize: 12, fontFamily: 'var(--font-mono)',
                  textDecoration: 'underline', padding: 0,
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Catalog */}
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
                    style={{ marginBottom: 48 }}
                  >
                    {/* Brand header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {brand}
                      </span>
                      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${catColor}40, transparent)` }} />
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 11, color: catColor,
                        background: `${catColor}10`, border: `1px solid ${catColor}30`,
                        padding: '3px 10px', borderRadius: 100,
                      }}>
                        {catLabels[firstProduct.category]}
                      </span>
                    </div>

                    {/* Product grid — responsive: 3 cols → 2 cols → 1 col */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                        gap: 16,
                      }}
                    >
                      {brandProducts.map((product, i) => (
                        <motion.div
                          key={`${product.brand}-${product.productLine}-${i}`}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                          style={{
                            padding: '24px', borderRadius: 16,
                            background: 'var(--color-bg-elevated)',
                            border: '1px solid var(--color-border)',
                            display: 'flex', flexDirection: 'column', gap: 10,
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
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {product.productLine}
                            </h3>
                            <span style={{
                              padding: '3px 10px', borderRadius: 100,
                              border: `1px solid ${product.tagColor}40`,
                              background: `${product.tagColor}10`,
                              fontSize: 11, fontWeight: 600, color: product.tagColor, whiteSpace: 'nowrap', flexShrink: 0,
                            }}>
                              {product.tag}
                            </span>
                          </div>

                          <div style={{
                            fontFamily: 'var(--font-mono)', fontSize: 12, color: catColor,
                            padding: '5px 10px', borderRadius: 6,
                            background: `${catColor}08`, border: `1px solid ${catColor}20`,
                            display: 'inline-block', width: 'fit-content',
                          }}>
                            {product.specs}
                          </div>

                          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1 }}>
                            {product.description}
                          </p>

                          {/* Application tags */}
                          {product.applications && product.applications.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                              {product.applications.slice(0, 3).map((app) => (
                                <span key={app} style={{
                                  padding: '2px 8px', borderRadius: 4,
                                  border: '1px solid var(--color-border)',
                                  background: 'var(--color-bg-surface)',
                                  fontSize: 11, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)',
                                }}>
                                  {app}
                                </span>
                              ))}
                            </div>
                          )}
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
                style={{ textAlign: 'center', padding: '80px 20px' }}
              >
                <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🔍</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                  {t.products.noResults}
                </h3>
                <p style={{ fontSize: 14 }}>{t.products.noResultsHint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Sticky bottom CTA bar ─── */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(13,21,37,0.95)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--color-border)',
          padding: '12px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Looking for a specific part number?
        </span>
        <a
          href="/#contact"
          style={{
            padding: '8px 20px', borderRadius: 8,
            background: 'var(--color-accent-cyan)', color: 'var(--color-bg-deep)',
            fontWeight: 700, fontSize: 13, textDecoration: 'none',
          }}
        >
          Contact Us →
        </a>
      </div>

      {/* Footer — natural flow at bottom, no manual padding hack */}
      <Footer />
    </div>
  );
}

// ─── Suspense boundary required for useSearchParams ───────────────────────────
export default function ProductsPage() {
  return (
    <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navbar />
      <Suspense fallback={<ProductsLoadingSkeleton />}>
        <ProductsCatalog />
      </Suspense>
    </div>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg-deep)' }}>
      <Navbar />
      <div style={{ padding: '140px 24px 60px', textAlign: 'center', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ height: 16, width: 80, background: 'var(--color-border)', borderRadius: 4, margin: '0 auto 16px' }} />
          <div style={{ height: 48, width: 400, background: 'var(--color-border)', borderRadius: 8, margin: '0 auto 16px', maxWidth: '100%' }} />
          <div style={{ height: 48, width: 520, background: 'var(--color-border)', borderRadius: 12, margin: '0 auto', maxWidth: '100%' }} />
        </div>
      </div>
      <div style={{ padding: '48px 24px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: 180, background: 'var(--color-bg-surface)', borderRadius: 16, border: '1px solid var(--color-border)' }} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
