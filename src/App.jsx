import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import JobsList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import TourismPage from "./pages/tourism";
import RentalServices from "./pages/services";
import BreakingNews from "./pages/BreakingNews"
import LoginPage from "./pages/LoginPage";
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; 
import NewsDetail from './pages/NewsDetail';
import ManageJobs from './pages/ManageJobs';
import AutoFetch from './pages/AutoFetch';
import PostNews from './pages/PostNews';
import ManageNews from './pages/ManageNews';
import Overview from './pages/Overview';
import ManageRooms from "./pages/ManageRooms";
import ScrollToTop from './components/ScrollToTop';  //scroll to top component 
import ImageManager from "./pages/ImageManager";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SocialSidebar from './components/SocialSidebar';

const LayoutContent = () => {
  const location = useLocation();

  // Sabhi admin paths aur login page par header/footer hide hoga
  const hideLayout = location.pathname.startsWith('/admin') || location.pathname === '/admin-login';

  return (
    <>
      {!hideLayout && <Header />}
      <ScrollToTop />
      {!hideLayout && <SocialSidebar />}
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* FIXED: Pehle sirf /jobs/:id tha, ab agar koi sirf /jobs kholga to bhi error nahi aayega */}
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/:slug" element={<JobDetail />} />
        
        <Route path="/tourism" element={<TourismPage />} />
        <Route path="/services" element={<RentalServices />} />
        <Route path="/breaking-news" element={<BreakingNews />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/news/:slug/:id" element={<NewsDetail />} />
         {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          
          {/* Static Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

        
        {/* Admin Protected Routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/overview" 
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/manage-jobs" 
          element={
            <ProtectedRoute>
              <ManageJobs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/auto-fetch" 
          element={
            <ProtectedRoute>
              <AutoFetch />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/post-news" 
          element={
            <ProtectedRoute>
              <PostNews />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/manage-news" 
          element={
            <ProtectedRoute>
              <ManageNews />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/manage-rooms" 
          element={
            <ProtectedRoute>
              <ManageRooms />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/media" 
          element={
            <ProtectedRoute>
              <ImageManager />
            </ProtectedRoute>
          } 
        />
      </Routes>

      

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return <LayoutContent />;
};

export default App;