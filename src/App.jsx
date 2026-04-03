import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import JobPage from "./pages/jobs"; 
import TourismPage from "./pages/tourism";
import RentalServices from "./pages/services";
import BreakingNews from "./pages/BreakingNews"
import LoginPage from "./pages/LoginPage";
import AdminDashboard from './pages/AdminDashboard';
// 1. ProtectedRoute import karein
import ProtectedRoute from './components/ProtectedRoute'; 

const LayoutContent = () => {
  const location = useLocation();
  const hideLayout = ['/admin-login', '/admin-dashboard'].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/tourism" element={<TourismPage />} />
        <Route path="/services" element={<RentalServices />} />
        <Route path="/breaking-news" element={<BreakingNews />} />
        <Route path="/admin-login" element={<LoginPage />} />
        
        {/* 2. Dashboard ko ProtectedRoute mein wrap kiya */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
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