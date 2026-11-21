import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { btnPrimary } from '../components/site/ui';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found | Intube Media" description="The page you are looking for does not exist." path="/404" />
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 pt-24 text-center">
        <div className="site-grid-bg absolute inset-0 opacity-70" />
        <div className="relative">
          <p className="font-display text-7xl font-extrabold text-brand-cyan sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-extrabold text-white">This page went off-air.</h1>
          <p className="mt-3 text-mist">The link may be old or the page has moved.</p>
          <Link to="/" className={`${btnPrimary} mt-8`}>Back to Home <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
