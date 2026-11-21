import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { btnPrimary } from '../components/site/ui';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found | Intube Media" description="The page you are looking for does not exist." path="/404" />
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-coal px-4 pt-24 text-center text-white">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[130px]" />
        <div className="relative">
          <p className="font-display text-8xl font-bold text-red-grad sm:text-9xl">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase">This page went off-air.</h1>
          <p className="mt-3 text-white/60">The link may be old or the page has moved.</p>
          <Link to="/" className={`${btnPrimary} mt-8`}>Back to Home <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
