import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Newspaper, LogOut, PlusCircle, 
  UserCircle, Briefcase, Globe, Home, BarChart3, Menu, X,
  Image as ImageIcon // "Image" icon ko "ImageIcon" ke naam se import kiya
} from 'lucide-react';

// Existing Imports
import PostNews from './PostNews';
import ManageNews from './ManageNews';
import ManageJobs from './ManageJobs';
import AutoFetch from './AutoFetch';
import Overview from './Overview';
import ManageRooms from './ManageRooms';
import AnalyticsPage from './AnalyticsPage';
import ImageManager from './ImageManager'; // Naya Page Import

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [sharedFormData, setSharedFormData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin-login');
      } else {
        setUser(session.user);
      }
    };
    getSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  // Helper to close sidebar on mobile after clicking a link
  const selectTab = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed h-full z-40 w-64 bg-blue-950 text-white flex flex-col shadow-2xl transition-transform duration-300
        lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        <div className="p-8 border-b border-white/10 text-center relative">
          <h1 className="text-2xl font-black italic tracking-tighter">
            HP<span className="text-red-500">TODAY</span>
          </h1>
          <p className="text-[10px] font-bold text-blue-300 uppercase mt-1">Admin Panel</p>
          
          {/* Close button for mobile */}
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto">
          <p className="text-[9px] text-white/40 px-4">Analytics</p>
          <button onClick={() => selectTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'overview' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <LayoutDashboard size={18}/> Overview
          </button>

          <button onClick={() => selectTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'analytics' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <BarChart3 size={18}/> Analytics
          </button>

          <p className="text-[9px] text-white/40 px-4 mt-4">Media & Gallery</p>
          <button onClick={() => selectTab('media')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'media' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <ImageIcon size={18}/> Manage Photos
          </button>

          <p className="text-[9px] text-white/40 px-4 mt-4">News</p>
          <button onClick={() => selectTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'news' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <PlusCircle size={18}/> Post News
          </button>

          <button onClick={() => selectTab('manage')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'manage' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <Newspaper size={18}/> Manage News
          </button>

          <button onClick={() => selectTab('auto')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'auto' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <Globe size={18}/> Auto Fetch
          </button>

          <p className="text-[9px] text-white/40 px-4 mt-4">Jobs</p>
          <button onClick={() => selectTab('jobs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'jobs' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <Briefcase size={18}/> Manage Job
          </button>

          <p className="text-[9px] text-white/40 px-4 mt-4">Rental</p>
          <button onClick={() => selectTab('rooms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'rooms' ? 'bg-red-600' : 'hover:bg-white/10'}`}>
            <Home size={18}/> Manage Rooms
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-64 p-4 md:p-10 transition-all duration-300">
        
        <header className="flex justify-between items-center mb-6 lg:mb-10 bg-white p-4 lg:bg-transparent rounded-xl shadow-sm lg:shadow-none">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-blue-950">
              <Menu size={28} />
            </button>
            <h2 className="text-xl lg:text-2xl font-bold capitalize">
              {activeTab === 'media' ? 'Manage Photos' : activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 lg:bg-white px-3 py-2 rounded-xl text-sm font-medium overflow-hidden max-w-[150px] sm:max-w-none">
            <UserCircle size={20} className="shrink-0"/>
            <span className="truncate">{user?.email}</span>
          </div>
        </header>

        {/* CONTENT */}
        <div className="overflow-x-hidden">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'media' && <ImageManager />} 
          {activeTab === 'news' && (
            <PostNews 
              user={user}
              initialData={sharedFormData}
              onSuccess={() => setActiveTab('manage')}
            />
          )}
          {activeTab === 'manage' && <ManageNews />}
          {activeTab === 'jobs' && <ManageJobs />}
          {activeTab === 'auto' && (
            <AutoFetch onImport={(data) => {
              setSharedFormData(data);
              setActiveTab('news');
            }} />
          )}
          {activeTab === 'rooms' && <ManageRooms />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;