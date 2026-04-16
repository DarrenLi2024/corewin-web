import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Catalog',
  description:
    'Browse the complete CoreWin Technology semiconductor product portfolio — Storage, Analog, Digital, Discrete, and Sensors from SAMSUNG, MICRON, ADI, ST, ONSEMI, MPS, NXP, TI, TDK, and NEXPERIA.',
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
