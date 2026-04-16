'use client';

import { useMemo } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Car,
  Factory,
  Radio,
  Server,
  Home,
  Brain,
  HeartPulse,
  Smartphone,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { products } from '@/data/products';

// 8 sector keys — SINGLE SOURCE OF TRUTH
// Adding a new sector here auto-includes it in the UI and requires i18n entries
const SECTOR_KEYS = [
  'automotive',
  'industrial',
  'communications',
  'datacenter',
  'smartHome',
  'ai',
  'medical',
  'consumer',
] as const;

const SECTOR_ICON_COMPONENTS = {
  automotive: Car,
  industrial: Factory,
  communications: Radio,
  datacenter: Server,
  smartHome: Home,
  ai: Brain,
  medical: HeartPulse,
  consumer: Smartphone,
} as const;

const SECTOR_COLORS = {
  automotive: '#3B82F6',
  industrial: '#FF9500',
  communications: '#8B5CF6',
  datacenter: '#00D4AA',
  smartHome: '#EC4899',
  ai: '#F59E0B',
  medical: '#EF4444',
  consumer: '#06B6D4',
} as const;

type SectorKey = (typeof SECTOR_KEYS)[number];

// Dynamically derived from product.applications — no hardcoding, no drift
function buildSectorBrands() {
  const map: Record<string, string[]> = {};
  for (const product of products) {
    for (const sector of product.applications ?? []) {
      if (!SECTOR_KEYS.includes(sector as SectorKey)) continue;
      if (!map[sector]) map[sector] = [];
      const brand = product.brand;
      if (!map[sector].includes(brand)) map[sector].push(brand);
    }
  }
  // Sort brands alphabetically
  for (const k of Object.keys(map)) {
    map[k].sort();
  }
  return map;
}

const SECTOR_BRANDS: Record<string, string[]> = buildSectorBrands();

export default function ApplicationSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="applications"
      ref={ref}
      style={{
        padding: '120px 24px',
        maxWidth: 1280,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 64 }}
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
          {t.applications.label}
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
          {t.applications.headline}
        </h2>
        <p
          style={{
            fontSize: 16,
            color: 'var(--color-text-secondary)',
            maxWidth: 580,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {t.applications.subheadline}
        </p>
      </motion.div>

      {/* 8-sector grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {SECTOR_KEYS.map((key, i) => {
          const Icon = SECTOR_ICON_COMPONENTS[key];
          const color = SECTOR_COLORS[key];
          // Resolve i18n keys safely — skip if translation missing (fails gracefully)
          const label = (t.applications as Record<string, string>)[key] ?? key;
          const short = (t.applications as Record<string, string>)[`${key}Short`] ?? '';
          const full = (t.applications as Record<string, string>)[`${key}Full`] ?? '';
          const brands = SECTOR_BRANDS[key] ?? [];

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: 'easeOut' }}
              style={{
                padding: '32px 28px',
                borderRadius: 20,
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = `${color}50`;
                e.currentTarget.style.boxShadow = `0 12px 40px ${color}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${color}, transparent 80%)`,
                  borderRadius: '20px 20px 0 0',
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${color}12`,
                  border: `1px solid ${color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Icon size={24} color={color} />
              </div>

              {/* Name — clickable link to sector */}
              <a
                href={`/products?applications=${key}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: 4,
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              >
                {label}
              </a>

              {/* Short desc */}
              <p
                style={{
                  fontSize: 12,
                  color: color,
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 12,
                }}
              >
                {short}
              </p>

              {/* Full description */}
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                {full}
              </p>

              {/* Brand chips — clickable, navigates to /products?brand= */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {brands.map((b) => (
                  <a
                    key={b}
                    href={`/products?brand=${b}&applications=${key}`}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 6,
                      border: `1px solid ${color}30`,
                      background: `${color}08`,
                      fontSize: 11,
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-mono)',
                      textDecoration: 'none',
                      transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = color + '70';
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.background = color + '18';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = color + '30';
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                      e.currentTarget.style.background = color + '08';
                    }}
                  >
                    {b}
                  </a>
                ))}
                {brands.length === 0 && (
                  <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    —
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
