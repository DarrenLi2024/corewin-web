'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const stats = [
  { value: 72,   suffix: 'h', key: 'response',  label: 'Avg. Quote Response',  labelZh: '紧急报价响应' },
  { value: 5000, suffix: '+', key: 'skus',      label: 'SKUs In Stock',         labelZh: '库存现货 SKU' },
  { value: 10,   suffix: '+', key: 'brands',    label: 'Authorized Brands',     labelZh: '授权代理品牌' },
  { value: 3,    suffix: '',  key: 'offices',   label: 'Regional Offices',     labelZh: '区域网点' },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const steps = 50;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.min(Math.floor(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsBar() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isZh = lang === 'zh';

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-bg-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 0,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.key}
            style={{
              textAlign: 'center',
              padding: '24px 32px',
              borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                color: 'var(--color-accent-cyan)',
                lineHeight: 1,
                marginBottom: 8,
                textShadow: '0 0 40px rgba(0,212,255,0.3)',
              }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} active={inView} />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.04em',
              }}
            >
              {isZh ? stat.labelZh : stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
