'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// Section links: use /?#section so they work from both homepage and sub-pages
// (Homepage sections are at root path; sub-pages need to navigate back to root first)
const sectionLinks = [
  { labelKey: 'about', href: '/#about' },
  { labelKey: 'products', href: '/products' },
  { labelKey: 'applications', href: '/#applications' },
  { labelKey: 'whyCoreWin', href: '/why-corewin' },
  { labelKey: 'caseStudies', href: '/case-studies' },
  { labelKey: 'blog', href: '/blog' },
  { labelKey: 'contact', href: '/#contact' },
];

export default function Navbar() {
  const { t, lang, toggleLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          background: scrolled ? 'rgba(13, 21, 37, 0.95)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#00D4FF" fillOpacity="0.1" />
              <rect x="1" y="1" width="30" height="30" rx="7" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.4" />
              <path
                d="M8 8h4v7l5-7h5l-6 8 6.5 8H17l-5-7-4.5 6.5V8z"
                fill="#00D4FF"
              />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              CoreWin
            </span>
          </a>

          {/* Desktop nav */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              alignItems: 'center',
            }}
            className="hidden md:flex"
          >
            {sectionLinks.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {t.nav[link.labelKey as keyof typeof t.nav]}
              </a>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: lang === 'en' ? 'rgba(0,212,255,0.06)' : 'rgba(255,149,0,0.06)',
                color: lang === 'en' ? 'var(--color-accent-cyan)' : 'var(--color-accent-amber)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-mono)',
                outline: lang === 'en' ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(255,149,0,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = lang === 'en' ? 'var(--color-accent-cyan)' : 'var(--color-accent-amber)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = lang === 'en' ? 'rgba(0,212,255,0.3)' : 'rgba(255,149,0,0.3)';
              }}
              aria-label="Toggle language"
              title={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
            >
              <Globe size={14} />
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          </div>

          {/* CTA */}
          <a
            href="/#contact"
            className="hidden md:flex"
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid var(--color-accent-cyan)',
              color: 'var(--color-accent-cyan)',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent-cyan)';
              e.currentTarget.style.color = 'var(--color-bg-deep)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-accent-cyan)';
            }}
          >
            {t.nav.getAQuote}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
              padding: 4,
            }}
            aria-label={mobileOpen ? (lang === 'en' ? '关闭菜单' : 'Close menu') : (lang === 'en' ? '打开菜单' : 'Open menu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        style={{
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: 'var(--color-bg-surface)',
          padding: '32px 24px',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
        className="flex md:hidden"
      >
        {sectionLinks.map((link) => (
          <a
            key={link.labelKey}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
            }}
          >
            {t.nav[link.labelKey as keyof typeof t.nav]}
          </a>
        ))}

        {/* Language toggle in mobile */}
        <button
          onClick={toggleLang}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 0',
            background: 'none',
            border: 'none',
            color: lang === 'en' ? 'var(--color-accent-cyan)' : 'var(--color-accent-amber)',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          <Globe size={18} />
          {lang === 'en' ? '中文' : 'EN'}
          <span style={{ fontSize: 12, opacity: 0.6, fontWeight: 400 }}>
            / {lang === 'en' ? '切换' : 'switch'}
          </span>
        </button>

        <a
          href="/#contact"
          onClick={() => setMobileOpen(false)}
          style={{
            marginTop: 16,
            padding: '14px 24px',
            borderRadius: 10,
            background: 'var(--color-accent-cyan)',
            color: 'var(--color-bg-deep)',
            fontWeight: 600,
            fontSize: 16,
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          {t.nav.getAQuote}
        </a>
      </div>
    </>
  );
}
