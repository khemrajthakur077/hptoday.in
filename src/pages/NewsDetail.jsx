import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, MapPin, ArrowLeft, Share2, Calendar } from 'lucide-react';
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

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- CORRECTED FETCH LOGIC WITHIN USEEFFECT ---
  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      const normalizedSlug = slug?.toString().toLowerCase();
      let newsData = null;
      const isId = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(normalizedSlug)
        || /^[0-9]+$/.test(normalizedSlug);

      try {
        if (isId) {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('id', normalizedSlug)
            .maybeSingle();
          if (!error && data) newsData = data;
        }

        if (!newsData) {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .limit(1000);

          if (error) throw error;
          newsData = data?.find((item) => slugify(item?.title) === normalizedSlug);
        }

        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
    window.scrollTo(0, 0); // Page ke top par scroll karne ke liye
  }, [slug]);

  // --- FIXED SHARE FUNCTION ---
  const handleShare = async () => {
    if (!news) return;

    const shareData = {
      title: news.title,
      text: news.title,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        throw new Error('Web Share not supported');
      }
    } catch (err) {
      // ESLint Fix: Using 'err' in a log so it's not marked as unused
      console.log("Web Share API failed or not supported, using fallback.", err);
      
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copy kar liya gaya hai! Aap ise kahi bhi share kar sakte hain.");
      } catch (copyErr) {
        console.error("Link copy nahi ho paya", copyErr);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-900"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h2 className="text-2xl font-black text-blue-950 uppercase mb-4">Khabar nahi mili!</h2>
        <button 
          onClick={() => navigate('/')} 
          className="bg-blue-950 text-white px-6 py-3 rounded-2xl font-bold uppercase flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Home par wapas jayein
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-20">
      {/* 1. NAVIGATION */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white rounded-2xl shadow-md text-blue-950 hover:bg-blue-950 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-red-600 transition-all"
        >
          <Share2 size={16} /> Share Karein
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* 2. BADGES */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase shadow-md">
            {news.category || 'Taza Khabar'}
          </span>
          <span className="bg-blue-950 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase flex items-center gap-1.5">
            <MapPin size={12} /> {news.district}
          </span>
        </div>

        {/* 3. TITLE */}
        <h1 className="text-3xl md:text-5xl font-black text-blue-950 leading-[1.1] mb-8 tracking-tighter">
          {news.title}
        </h1>

        {/* 4. META INFO */}
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-black text-xs shadow-inner">HP</div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Source</p>
              <p className="text-sm font-black text-blue-950 uppercase tracking-tight">HP Today</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Published</p>
              <p className="text-sm font-black text-blue-950 uppercase">
                {new Date(news.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* 5. IMAGE */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 bg-gray-200 group">
          <img 
            src={news.image_url || 'https://via.placeholder.com/1200x800'} 
            className="w-full h-full min-h-[300px] md:max-h-[600px] object-cover" 
            alt={news.title}
            loading="lazy"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x800?text=HP+Today+News'; }}
          />
        </div>

        {/* 6. CONTENT */}
        <div className="max-w-none px-2">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium whitespace-pre-wrap first-letter:text-6xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left first-letter:mt-1">
            {news.content}
          </p>
        </div>

        {/* 7. FOOTER ACTION */}
        <div className="mt-16 p-10 bg-gradient-to-br from-blue-950 to-blue-900 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <h3 className="text-white text-2xl font-black uppercase italic mb-4 relative z-10">Himachal Ki Awaaz, HP Today</h3>
          <p className="text-blue-200 text-sm mb-8 max-w-sm mx-auto relative z-10">Har update ke liye jude rahein humare saath. Himachal Pradesh ki taaza tareen khabrein.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-blue-950 px-10 py-4 rounded-2xl font-black uppercase text-xs hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-xl relative z-10"
          >
            Sari Khabrein Dekhein
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;