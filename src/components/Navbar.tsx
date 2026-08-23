import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import CmsIcon from './CmsIcon';
import { useCms } from '../context/useCms';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { services, theme } = useCms();
  const businessServices = services.filter(service => service.section === 'business');
  const influencerServices = services.filter(service => service.section === 'influencer');

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg sm:text-xl"
              style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary_color}, ${theme.secondary_color})` }}
            >
              {theme.logo_short}
            </div>
            <span
              className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${theme.primary_color}, ${theme.secondary_color})` }}
            >
              {theme.logo_text}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
              About
            </Link>

            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-gray-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">Business IT Solutions</p>
                      <div className="space-y-1">
                        {businessServices.map(service => (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}`}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                              <CmsIcon icon={service.icon} className="w-4 h-4 text-gray-400 group-hover:text-violet-400" />
                              <span className="text-sm text-gray-300 group-hover:text-white">{service.title}</span>
                            </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-3">Influencer & Creator</p>
                      <div className="space-y-1">
                        {influencerServices.map(service => (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}`}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                              <CmsIcon icon={service.icon} className="w-4 h-4 text-gray-400 group-hover:text-pink-400" />
                              <span className="text-sm text-gray-300 group-hover:text-white">{service.title}</span>
                            </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Link
                      to="/services"
                      className="text-sm text-violet-400 hover:text-violet-300 font-medium"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/#our-network" className="text-sm text-gray-300 hover:text-white transition-colors">
              Our Network
            </Link>
            <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <Link to="/" className="block text-gray-300 hover:text-white py-2 transition-colors">
              Home
            </Link>
            <Link to="/about" className="block text-gray-300 hover:text-white py-2 transition-colors">
              About
            </Link>

            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full text-gray-300 hover:text-white py-2 transition-colors"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className="pl-4 space-y-1 pb-2">
                <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider py-2">Business IT Solutions</p>
                {businessServices.map(service => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block text-sm text-gray-400 hover:text-white py-1.5 transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
                <p className="text-xs font-semibold text-pink-400 uppercase tracking-wider py-2 mt-2">Influencer & Creator</p>
                {influencerServices.map(service => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block text-sm text-gray-400 hover:text-white py-1.5 transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="block text-sm text-violet-400 hover:text-violet-300 py-1.5 font-medium"
                >
                  View all services →
                </Link>
              </div>
            )}

            <Link to="/#our-network" className="block text-gray-300 hover:text-white py-2 transition-colors">
              Our Network
            </Link>
            <Link to="/contact" className="block text-gray-300 hover:text-white py-2 transition-colors">
              Contact
            </Link>
            <Link
              to="/contact"
              className="block w-full text-center px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full text-sm font-semibold mt-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
