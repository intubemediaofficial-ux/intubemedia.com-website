import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServicePage from './pages/services/ServicePage';
import PackagesPage from './pages/PackagesPage';
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
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/network/bainsla-music" element={<BainslaMusicPage />} />
            <Route path="/pages/:slug" element={<CmsPage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="pages" element={<AdminPages />} />
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
