'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { lang } = useI18n();

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          listStyle: 'none',
          margin: 0,
          padding: 0,
          flexWrap: 'wrap',
        }}
      >
        {/* Home */}
        <li>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            {lang === 'en' ? 'Home' : '首页'}
          </Link>
        </li>

        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChevronRight size={12} color="var(--color-text-muted)" />
            {item.href ? (
              <Link
                href={item.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-cyan)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                  maxWidth: 200,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
