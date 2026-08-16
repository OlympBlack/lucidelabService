import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { HeaderTopbar } from '../components/layout/HeaderTopbar';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollToTop } from '../components/common/ScrollToTop';

import { WelcomePopup } from '../components/common/WelcomePopup';

// Public Pages
import { Home } from '../pages/public/Home';
import { Services } from '../pages/public/Services';
import { Realisations } from '../pages/public/Realisations';
import { About } from '../pages/public/About';
import { Blog, BlogDetail } from '../pages/public/Blog';
import { Trust } from '../pages/public/Trust';
import { Contact } from '../pages/public/Contact';

// Admin Layout & Pages
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminBlogs } from '../pages/admin/AdminBlogs';
import { AdminServices } from '../pages/admin/AdminServices';
import { AdminRealisations } from '../pages/admin/AdminRealisations';
import { AdminPartners, AdminMessages } from '../pages/admin/AdminPartners';
import { AdminAnnonces, AdminUsers, AdminMedia } from '../pages/admin/AdminAnnonces';
import { AdminSettings } from '../pages/admin/AdminSettings';
import { AdminSocials } from '../pages/admin/AdminSocials';

const MainLayout: React.FC = () => {
  return (
    <>
      <WelcomePopup />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="realisations" element={<Realisations />} />
        <Route path="a-propos" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="confiance" element={<Trust />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="realisations" element={<AdminRealisations />} />
        <Route path="partenaires" element={<AdminPartners />} />
        <Route path="reseaux-sociaux" element={<AdminSocials />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="annonces" element={<AdminAnnonces />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};
