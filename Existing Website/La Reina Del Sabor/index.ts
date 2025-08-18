// Main package entry point
export { default as About } from './components/About';
export { default as Contact } from './components/Contact';
export { default as FeaturedMenu } from './components/FeaturedMenu';
export { default as Footer } from './components/Footer';
export { default as Header } from './components/Header';
export { default as Hero } from './components/Hero';
export { default as OrderNowBanner } from './components/OrderNowBanner';
export { default as Reviews } from './components/Reviews';

// Export types
export type { AboutProps } from './components/About';
export type { ContactProps } from './components/Contact';
export type { FeaturedMenuProps } from './components/FeaturedMenu';
export type { FooterProps } from './components/Footer';
export type { HeaderProps } from './components/Header';
export type { HeroProps } from './components/Hero';
export type { OrderNowBannerProps } from './components/OrderNowBanner';
export type { ReviewsProps } from './components/Reviews';

// Export utilities and constants
export * from './utils/constants';
export * from './utils/helpers';

// Default export for the entire package
export { default } from './components/LaReinaDelSabor';
