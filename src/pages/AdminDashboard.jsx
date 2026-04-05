import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Newspaper, LogOut, PlusCircle, 
  UserCircle, Briefcase, Globe, Home, BarChart3
} from 'lucide-react';

// Existing Imports
import PostNews from './PostNews';
import ManageNews from './ManageNews';
import ManageJobs from './ManageJobs';
import AutoFetch from './AutoFetch';
import Overview from './Overview';
import ManageRooms from './ManageRooms';

// ✅ NEW IMPORT (Analytics Page)
import AnalyticsPage from './AnalyticsPage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [sharedFormData, setSharedFormData] = useState(null);
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

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">

      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col fixed h-full z-20 shadow-2xl">

        <div className="p-8 border-b border-white/10 text-center">
          <h1 className="text-2xl font-black italic tracking-tighter">
            HP<span className="text-red-500">TODAY</span>
          </h1>
          <p className="text-[10px] font-bold text-blue-300 uppercase mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto">

          {/* Analytics Section */}
          <p className="text-[9px] text-white/40 px-4">Analytics</p>

          <button onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'overview' ? 'bg-red-600' : 'hover:bg-white/10'
            }`}>
            <LayoutDashboard size={18}/> Overview
          </button>

          {/* ✅ NEW Analytics Page Button */}
          <button onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'analytics' ? 'bg-red-600' : 'hover:bg-white/10'
            }`}>
            <BarChart3 size={18}/> Analytics
          </button>

          {/* News */}
          <p className="text-[9px] text-white/40 px-4 mt-4">News</p>

          <button onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'news' ? 'bg-red-600' : 'hover:bg-white/10'
            }`}>
            <PlusCircle size={18}/> Post News
          </button>

          <button onClick={() => setActiveTab('manage')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'manage' ? 'bg-red-600' : 'hover:bg-white/10'
            }`}>
            <Newspaper size={18}/> Manage News
          </button>

          <button onClick={() => setActiveTab('auto')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'auto' ? 'bg-red-600' : 'hover:bg-white/10'
            }`}>
            <Globe size={18}/> Auto Fetch
          </button>

          {/* Jobs */}
          <p className="text-[9px] text-white/40 px-4 mt-4">Jobs</p>

          <button onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'jobs' ? 'bg-red-600' : 'hover:bg-white/10'
            }`}>
            <Briefcase size={18}/> Manage Job
          </button>

          {/* Rental */}
          <p className="text-[9px] text-white/40 px-4 mt-4">Rental</p>

          <button onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === 'rooms' ? 'bg-red-600' : 'hover:bg-white/10'
            }`}>
            <Home size={18}/> Manage Rooms
          </button>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-64 flex-1 p-10">

        <header className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold capitalize">
            {activeTab}
          </h2>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl">
            <UserCircle size={20}/>
            {user?.email}
          </div>
        </header>

        {/* CONTENT */}
        <div>

          {activeTab === 'overview' && <Overview />}

          {/* ✅ NEW ANALYTICS PAGE */}
          {activeTab === 'analytics' && <AnalyticsPage />}

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