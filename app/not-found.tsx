import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navbar />
      <div
        style={{
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* 404 code */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(100px, 20vw, 200px)',
            fontWeight: 700,
            color: 'var(--color-border)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
            marginBottom: 24,
            userSelect: 'none',
            position: 'relative',
          }}
        >
          404
          {/* Glow effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              color: 'var(--color-accent-cyan)',
              filter: 'blur(40px)',
              opacity: 0.15,
              zIndex: -1,
            }}
          >
            404
          </div>
        </div>

        {/* Message */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'var(--color-text-secondary)',
            maxWidth: 400,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 10,
              background: 'var(--color-accent-cyan)',
              color: 'var(--color-bg-deep)',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              fontSize: 15,
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              transition: 'border-color 0.2s ease, color 0.2s ease',
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
            Browse Products
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
