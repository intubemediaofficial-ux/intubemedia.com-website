import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ArtistsPage from './pages/ArtistsPage';
import PlatformsPage from './pages/PlatformsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BainslaMusicPage from './pages/BainslaMusicPage';
import CmsPage from './pages/CmsPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminPackages from './pages/admin/AdminPackages';
import AdminPages from './pages/admin/AdminPages';
import AdminMessages from './pages/admin/AdminMessages';
import AdminTheme from './pages/admin/AdminTheme';
import AdminForgotPassword from './pages/admin/AdminForgotPassword';
import AdminResetPassword from './pages/admin/AdminResetPassword';
import AdminAccount from './pages/admin/AdminAccount';
import AdminPartners from './pages/admin/AdminPartners';
import AdminHeroSlider from './pages/admin/AdminHeroSlider';
import PartnerApply from './pages/partner/PartnerApply';
import PartnerLogin from './pages/partner/PartnerLogin';
import PartnerForgotPassword from './pages/partner/PartnerForgotPassword';
import PartnerResetPassword from './pages/partner/PartnerResetPassword';
import PartnerDashboard from './pages/partner/PartnerDashboard';
import { CmsProvider } from './context/CmsProvider';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CmsProvider>
          <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<Navigate to="/services" replace />} />
            <Route path="/packages" element={<Navigate to="/services" replace />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/platforms" element={<PlatformsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/network/bainsla-music" element={<BainslaMusicPage />} />
            <Route path="/pages/:slug" element={<CmsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/partner" element={<Navigate to="/partner/login" replace />} />
          <Route path="/partner/apply" element={<PartnerApply />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner/forgot-password" element={<PartnerForgotPassword />} />
          <Route path="/partner/reset-password" element={<PartnerResetPassword />} />
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          <Route path="/login" element={<Navigate to="/partner/login" replace />} />
          <Route path="/register" element={<Navigate to="/partner/apply" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="hero" element={<AdminHeroSlider />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="theme" element={<AdminTheme />} />
            <Route path="account" element={<AdminAccount />} />
          </Route>
          </Routes>
        </CmsProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
