import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LightBackdrop } from './site/Backdrop';

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
    <div className="site min-h-screen overflow-x-hidden bg-white text-coal antialiased">
      <LightBackdrop />
      <div className="relative z-10">
        <Navbar />
        <main key={pathname} className="animate-pagein">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
