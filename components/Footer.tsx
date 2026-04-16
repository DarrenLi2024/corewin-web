'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { CATEGORY_KEYS } from '@/data/products';

const BRANDS = ['SAMSUNG', 'MICRON', 'ADI', 'ST', 'ONSEMI', 'MPS', 'NXP', 'TI', 'TDK', 'NEXPERIA'];


export default function Footer() {
  const { t } = useI18n();
  const catLabels = t.footer as Record<string, string>;

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-surface)',
        padding: '64px 24px 32px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#00D4FF" fillOpacity="0.1" />
                <rect x="1" y="1" width="30" height="30" rx="7" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.4" />
                <path d="M8 8h4v7l5-7h5l-6 8 6.5 8H17l-5-7-4.5 6.5V8z" fill="#00D4FF" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 17,
                  color: 'var(--color-text-primary)',
                }}
              >
                CoreWin
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                maxWidth: 200,
                marginBottom: 20,
              }}
            >
              Authorized semiconductor channel partner serving Asia&apos;s engineering community.
            </p>
            {/* Brand pills — clickable */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {BRANDS.map((brand) => (
                <a
                  key={brand}
                  href={`/products?brand=${brand}`}
                  style={{
                    padding: '3px 8px',
                    borderRadius: 4,
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-elevated)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.03em',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent-cyan)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }}
                >
                  {brand}
                </a>
              ))}
            </div>
          </div>

          {/* Products — 5 categories */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {t.footer.products}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CATEGORY_KEYS.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${cat}`}
                    style={{
                      fontSize: 14,
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  >
                    {(t.products.categories as Record<string, string>)[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {t.footer.company}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: t.footer.aboutCoreWin, href: '/#about' },
                { label: t.footer.whyCoreWin, href: '/why-corewin' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: 14,
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {t.footer.support}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: t.footer.sampleRequest, href: '/#contact' },
                { label: t.footer.technicalSupport, href: '/#contact' },
                { label: t.footer.documentation, href: '/blog' },
                { label: t.footer.contactUs, href: '/#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: 14,
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <a
              href="/#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 20,
                padding: '10px 20px',
                borderRadius: 8,
                background: 'var(--color-accent-cyan)',
                color: 'var(--color-bg-deep)',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {t.nav.getAQuote}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 24 }} />

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {t.footer.copyright}
          </p>
          <p
            style={{
              fontSize: 12,
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
