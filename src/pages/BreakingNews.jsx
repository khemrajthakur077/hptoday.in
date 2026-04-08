import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Clock, Share2, TrendingUp, MapPin, ChevronRight } from 'lucide-react';
import { supabase } from '../supabaseClient'; // Supabase import

const slugify = (value) => {
  if (!value) return '';
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_–—]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const BreakingNews = () => {
  const getNewsSlug = (item) => slugify(item?.title || item?.id || '');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsCache, setNewsCache] = useState(null);
  const [cacheTime, setCacheTime] = useState(0);
  const navigate = useNavigate();
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // --- FETCH DATA FROM SUPABASE (FIXED LOGIC) ---
  useEffect(() => {
    const fetchBreakingNews = async () => {
      if (newsCache && Date.now() - cacheTime < CACHE_DURATION) {
        setNewsList(newsCache);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('news')
          .select('id, title, image_url, created_at, district, category')
          .eq('category', 'Breaking News')
          .order('created_at', { ascending: false })
          .limit(50);

        if (!error) {
          setNewsList(data || []);
          setNewsCache(data || []);
          setCacheTime(Date.now());
        } else {
          console.error("Error fetching breaking news:", error);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []); // Run only once on mount

  // --- SHARE FUNCTION ---
  const handleShare = async (e, news) => {
    e.stopPropagation(); // Card click event ko rokne ke liye
    const newsSlug = getNewsSlug(news);
    const shareData = {
      title: news.title,
      text: `${news.title} - Padhein HP Today par`,
      url: `${window.location.origin}/news/${newsSlug}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert("Link copy kar liya gaya hai!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-gray-200 py-8 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-red-600 font-black uppercase tracking-widest text-xs">Live Updates</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tighter uppercase">
              Breaking <span className="italic text-red-600">News</span>
            </h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-950 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase shadow-lg hover:bg-red-600 transition-all"
          >
            All News
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            {loading ? (
              // Loading Skeleton
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-56 bg-gray-200 animate-pulse rounded-3xl"></div>
              ))
            ) : newsList.length > 0 ? (
              newsList.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => navigate(`/news/${getNewsSlug(news)}`)}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row group cursor-pointer"
                >
                  {/* News Image */}
                  <div className="md:w-72 h-56 relative overflow-hidden shrink-0">
                    <img 
                      src={news.image_url || 'https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?w=800'} 
                      alt={news.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase animate-pulse">
                      Breaking
                    </div>
                  </div>

                  {/* News Details */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase tracking-wider mb-3">
                        <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded">{news.district}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12}/> 
                          {new Date(news.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-black text-blue-950 group-hover:text-red-600 transition-colors leading-tight mb-4">
                        {news.title}
                      </h2>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <button className="text-blue-900 font-black text-xs uppercase flex items-center gap-1 hover:gap-2 transition-all">
                        Puri Khabar Padhein <ChevronRight size={16}/>
                      </button>
                      <button 
                        onClick={(e) => handleShare(e, news)}
                        className="p-3 bg-gray-50 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-90"
                      >
                        <Share2 size={18}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                <p className="text-gray-400 font-bold uppercase">Abhi koi breaking news nahi hai.</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <div className="bg-blue-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/30">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-yellow-400" />
                <h3 className="font-black uppercase tracking-tighter text-xl italic">Latest Headlines</h3>
              </div>
              <ul className="space-y-6">
                {newsList.slice(0, 5).map((n) => (
                   <li 
                    key={n.id} 
                    onClick={() => navigate(`/news/${getNewsSlug(n)}`)}
                    className="border-b border-white/10 pb-4 cursor-pointer hover:text-yellow-400 transition"
                  >
                    <p className="text-xs font-bold opacity-60 uppercase">{n.district}</p>
                    <p className="font-bold text-sm mt-1 leading-snug line-clamp-2">{n.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BreakingNews;