import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { api } from '../utils/api';

interface PageContent {
  slug: string;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
}

export default function CmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/public/pages/${slug}`)
      .then((data) => setPage(data))
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-mist">Loading...</div>;
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white">Page Not Found</h1>
          <Link to="/" className="font-semibold text-brand-cyan hover:text-white">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={page.meta_title || page.title}
        description={page.meta_description || page.content.slice(0, 160)}
        path={`/pages/${page.slug}`}
      />
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div className="site-grid-bg absolute inset-0 opacity-70" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs />
          <h1 className="mt-6 text-4xl font-extrabold text-white md:text-5xl">{page.title}</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="whitespace-pre-wrap text-lg leading-8 text-mist">{page.content}</div>
        </div>
      </section>
    </>
  );
}
