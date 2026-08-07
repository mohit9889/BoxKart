import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Packaging Boxes & Supplies for E-commerce Sellers | BoxKart',
  description:
    'Buy corrugated boxes, courier bags and packaging supplies for your e-commerce business. Bulk pricing, low MOQs and easy reordering.',
  keywords:
    'packaging boxes, corrugated boxes, courier bags, e-commerce packaging, shipping boxes, bulk packaging, India',
};

/**
 * Root layout wrapping the app with CartProvider, header, and footer.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
