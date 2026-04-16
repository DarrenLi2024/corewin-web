import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { Language } from '@/lib/i18n/translations';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.corewin.com.hk'),
  title: {
    default: 'CoreWin Technology — Authorized Semiconductor Distributor',
    template: '%s | CoreWin Technology',
  },
  description:
    "Authorized distributor for SAMSUNG, MICRON, ADI, ST, ONSEMI, MPS, NXP, TI, TDK, and NEXPERIA. Connecting Asia's engineering community with world-class storage, analog, digital, discrete and sensor semiconductor solutions.",
  keywords:
    'semiconductor distributor, SAMSUNG, MICRON, ADI, STMicroelectronics, ONSEMI, MPS, NXP, Texas Instruments, TDK, NEXPERIA, NAND, DRAM, HBM, SiC, GaN, microcontroller, China electronics components',
  authors: [{ name: 'CoreWin Technology' }],
  creator: 'CoreWin Technology',
  publisher: 'CoreWin Technology Co., Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    url: 'https://www.corewin.com.hk',
    siteName: 'CoreWin Technology',
    title: 'CoreWin Technology — Authorized Semiconductor Distributor',
    description:
      'Authorized distributor for SAMSUNG, MICRON, ADI, ST, ONSEMI, MPS, NXP, TI, TDK, and NEXPERIA.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CoreWin Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoreWin Technology — Authorized Semiconductor Distributor',
    description:
      'Authorized distributor for SAMSUNG, MICRON, ADI, ST, ONSEMI, MPS, NXP, TI, TDK, and NEXPERIA.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.corewin.com.hk',
    languages: {
      'en-US': 'https://www.corewin.com.hk',
      'zh-CN': 'https://www.corewin.com.hk/?lang=zh',
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side language detection — ensures <html lang> is always correct (WCAG 3.1.1)
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('corewin_lang');
  const lang: Language = (langCookie?.value as Language) ?? 'en';

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00D4FF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CoreWin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CoreWin Technology',
              description:
                "Authorized semiconductor channel partner serving Asia's engineering community.",
              url: 'https://www.corewin.com.hk',
              logo: 'https://www.corewin.com.hk/favicon.svg',
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  email: 'darenli@corewin.com.hk',
                  contactType: 'sales',
                  availableLanguage: ['English', 'Chinese'],
                },
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hong Kong',
                addressCountry: 'HK',
              },
              sameAs: [],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Semiconductor Products',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Storage — NAND Flash, DRAM, NOR Flash' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Analog — Op-Amps, ADC/DAC, Power Management, RF' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Digital — Microcontrollers, Application Processors' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Discrete — SiC, GaN, IGBT, MOSFET' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Sensors — MEMS IMU, Pressure, Magnetic, Inductors' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <I18nProvider initialLang={lang}>{children}</I18nProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
