import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Newspaper, Briefcase, TrendingUp, Calendar, 
  ChevronRight, Clock, AlertCircle 
} from 'lucide-react';

const Overview = () => {
  const [stats, setStats] = useState({ news: 0, jobs: 0, featured: 0 });
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Total News Count
        const { count: newsCount } = await supabase
          .from('news')
          .select('*', { count: 'exact', head: true });

        // 2. Total Jobs Count
        const { count: jobsCount } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true });

        // 3. Featured News Count
        const { count: featuredCount } = await supabase
          .from('news')
          .select('*', { count: 'exact', head: true })
          .eq('is_featured', true);

        // 4. Recent 5 News Articles
        const { data: latest } = await supabase
          .from('news')
          .select('title, created_at, category')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({ news: newsCount || 0, jobs: jobsCount || 0, featured: featuredCount || 0 });
        setRecentNews(latest || []);
      } catch (error) {
        console.error("Stats fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center p-20 text-blue-900 font-bold animate-pulse text-xl uppercase tracking-widest">Loading Analytics...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* News Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-red-50 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Newspaper size={28} />
            </div>
            <span className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-tighter">Live</span>
          </div>
          <h4 className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total News Published</h4>
          <p className="text-5xl font-black text-blue-950 mt-2 tracking-tighter">{stats.news}</p>
        </div>

        {/* Jobs Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Briefcase size={28} />
            </div>
            <TrendingUp size={20} className="text-blue-300" />
          </div>
          <h4 className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Active Job Listings</h4>
          <p className="text-5xl font-black text-blue-950 mt-2 tracking-tighter">{stats.jobs}</p>
        </div>

        {/* Featured Card */}
        <div className="bg-blue-950 p-8 rounded-[2.5rem] shadow-2xl border border-blue-800 group relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp size={150} />
          </div>
          <div className="relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl text-white mb-6 w-fit">
              <Calendar size={28} />
            </div>
            <h4 className="text-blue-300 font-bold uppercase text-[10px] tracking-widest">Featured Stories</h4>
            <p className="text-5xl font-black text-white mt-2 tracking-tighter">{stats.featured}</p>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY & SYSTEM STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent News List */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-blue-950 uppercase italic tracking-tighter text-lg">Recent Updates</h3>
            <button className="text-blue-600 text-[10px] font-black uppercase flex items-center gap-1 hover:gap-2 transition-all">View All <ChevronRight size={14}/></button>
          </div>
          
          <div className="space-y-4">
            {recentNews.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition group">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-blue-900 group-hover:bg-blue-950 group-hover:text-white transition">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-blue-950 text-sm line-clamp-1">{item.title}</h5>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{item.category} • {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips / Status */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-red-200">
            <AlertCircle size={32} className="mb-4 opacity-50" />
            <h4 className="font-black uppercase italic tracking-tight text-xl">Quick Tip</h4>
            <p className="text-sm font-bold text-red-50 mt-2 leading-relaxed">
              Check "Auto Fetch" daily to find the latest news from Himachal and publish them instantly!
            </p>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <h4 className="font-black text-blue-950 uppercase text-xs mb-4">System Health</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase">Database</span>
                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase">Media Storage</span>
                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;