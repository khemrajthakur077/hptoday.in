import React, { useState, useEffect } from 'react';
import { Clock, MapPin, ArrowRight, TrendingUp, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Navigation ke liye import
import { supabase } from '../supabaseClient';

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

const Home = () => {
  const getNewsSlug = (news) => slugify(news?.title || news?.id || '');
  const [activeDistrict, setActiveDistrict] = useState("All");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsCache, setNewsCache] = useState({});
  const [cacheTimes, setCacheTimes] = useState({});
  const navigate = useNavigate(); // Navigate function initialize kiya
  
  const districts = ["All", "Mandi", "Shimla", "Kangra", "Kullu", "Hamirpur", "Solan", "Chamba", "Una"];
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const isCacheValid = (key) => {
    const time = cacheTimes[key];
    return time && Date.now() - time < CACHE_DURATION;
  };

  // --- SHARE FUNCTION START ---
  const handleShare = async (e, news) => {
    e.stopPropagation(); // Card click event ko rokne ke liye taaki sirf share khule
    const newsSlug = getNewsSlug(news);
    const shareData = {
      title: news.title,
      text: news.title + "\n\nPadhein poori khabar HP Today par:\n",
      url: `${window.location.origin}/news/${newsSlug}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert("Link copy kar liya gaya hai!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };
  // --- SHARE FUNCTION END ---

  useEffect(() => {
    const fetchNews = async () => {
      const cacheKey = `news_${activeDistrict}`;
      
      if (isCacheValid(cacheKey) && newsCache[cacheKey]) {
        setNewsList(newsCache[cacheKey]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let query = supabase.from('news')
          .select('id, title, content, image_url, created_at, district, category, is_featured')
          .order('created_at', { ascending: false })
          .limit(50);

        if (activeDistrict !== "All") {
          query = query.eq('district', activeDistrict);
        }

        const { data, error } = await query;
        if (!error) {
          const newData = data || [];
          setNewsList(newData);
          setNewsCache({ ...newsCache, [cacheKey]: newData });
          setCacheTimes({ ...cacheTimes, [cacheKey]: Date.now() });
        } else {
          console.error("Supabase error:", error);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeDistrict]);

  // --- FEATURED LOGIC START ---
  const featuredNews = newsList.find(n => n.is_featured === true);
  const heroNews = featuredNews || newsList[0];
  const otherNews = newsList.filter(n => n.id !== heroNews?.id);
  // --- FEATURED LOGIC END ---

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* 1. TOP BREAKING TICKER */}
      <div className="bg-blue-950 text-white py-3 overflow-hidden border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <span className="bg-red-600 px-3 py-1 text-[10px] font-black uppercase italic tracking-tighter mr-4 animate-pulse">Breaking</span>
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <marquee className="text-xs font-bold uppercase tracking-wide">
              {newsList
                .filter(n => n.category === "Breaking News")
                .map((n, i) => (
                  <span key={i} className="mr-10">● {n.title}</span>
                ))}
              {newsList.filter(n => n.category === "Breaking News").length === 0 && (
                <span>● Himachal Pradesh ki taaza khabrein padhne ke liye jude rahein HP Today ke saath!</span>
              )}
            </marquee>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-20">
        
        {/* 2. DYNAMIC HERO SECTION */}
        {!loading && heroNews && (
          <div 
            onClick={() => navigate(`/news/${getNewsSlug(heroNews)}`)} // Hero Click Navigation
            className="relative rounded-[2.5rem] overflow-hidden h-[500px] mb-12 shadow-2xl group cursor-pointer"
          >
            <img 
              src={heroNews.image_url || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200'} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Hero"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase mb-4 inline-block shadow-lg">
                {heroNews.is_featured ? '⭐ Mukhya Samachar' : 'Latest Update'}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
                {heroNews.title}
              </h1>
              <p className="text-blue-100 text-sm md:text-lg max-w-2xl line-clamp-2 font-medium opacity-80 mb-6">
                {heroNews.content}
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-white text-blue-950 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-red-600 hover:text-white transition-all shadow-xl">
                  Poori Khabar Padhein <ArrowRight size={16} />
                </button>
                <button 
                  onClick={(e) => handleShare(e, heroNews)} // Stop propagation used here
                  className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-blue-950 transition-all border border-white/30"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. DISTRICT FILTER */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl text-blue-900"><MapPin size={24} /></div>
              <h3 className="text-2xl font-black text-blue-950 uppercase italic tracking-tighter">Apna Zila</h3>
            </div>
            <div className="h-px flex-1 bg-gray-200 ml-6 hidden md:block"></div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            {districts.map((dist) => (
              <button
                key={dist}
                onClick={() => setActiveDistrict(dist)}
                className={`whitespace-nowrap px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all 
                  ${activeDistrict === dist 
                    ? 'bg-blue-950 text-white shadow-xl scale-105 -translate-y-1' 
                    : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-200'}`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* 4. NEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-[2rem]"></div>
            ))
          ) : (
            otherNews.map((news) => (
              <div 
                key={news.id} 
                onClick={() => navigate(`/news/${getNewsSlug(news)}`)} // Grid News Click Navigation
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={news.image_url || 'https://via.placeholder.com/600x400'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={news.title}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-950 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase shadow-sm">
                    {news.district}
                  </div>
                  <button 
                    onClick={(e) => handleShare(e, news)} // card click trigger na ho isliye e.stopPropagation handle kiya hai
                    className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-xl text-white hover:bg-red-600 transition"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-red-600 uppercase">
                    <TrendingUp size={12} /> {news.category || 'Trending'}
                  </div>
                  <h3 className="text-xl font-black text-blue-950 leading-[1.2] group-hover:text-red-600 transition-colors line-clamp-3">
                    {news.title}
                  </h3>
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 text-[8px] font-black">HP</div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Hp Today</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-gray-300 uppercase">
                      <Clock size={12} />
                      {new Date(news.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* EMPTY STATE */}
        {!loading && newsList.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
            <h3 className="text-2xl font-black text-gray-300 uppercase">Is zila ki khabrein jaldi aayengi!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;