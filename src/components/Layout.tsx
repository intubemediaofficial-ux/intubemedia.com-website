import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Backdrop from './site/Backdrop';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="site min-h-screen overflow-x-hidden bg-ink text-white antialiased">
      <Backdrop />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
