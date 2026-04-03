import React, { useState } from 'react';
import { Newspaper, Clock, Share2, TrendingUp, MapPin, ChevronRight, PlayCircle } from 'lucide-react';

const BreakingNews = () => {
  const [newsList] = useState([
    {
      id: 1,
      title: "Mandi-Kullu National Highway par Landslide, Raasta Band",
      category: "Alert",
      time: "10 Min Ago",
      location: "Mandi",
      image: "https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?q=80&w=800&auto=format&fit=crop",
      isLive: true
    },
    {
      id: 2,
      title: "Sundernagar MLSM College mein Annual Function ki taiyariyaan shuru",
      category: "Local",
      time: "2 Hours Ago",
      location: "Sundernagar",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
      isLive: false
    },
    {
      id: 3,
      title: "Himachal Cabinet Meeting: Nayi Jobs aur Pension par bada faisla",
      category: "Politics",
      time: "5 Hours Ago",
      location: "Shimla",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop",
      isLive: false
    }
  ]);

  // --- SHARE FUNCTION ---
  const handleShare = async (news) => {
    const shareData = {
      title: 'HP Today - Breaking News',
      text: `${news.title} - Read more on HP Today`,
      url: window.location.href, // Aap yahan news ka specific link bhi daal sakte hain
    };

    try {
      // Check if browser supports Web Share API
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert("Link copied to clipboard! Share it anywhere.");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-gray-200 py-8 px-4 md:px-8">
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
          <div className="flex gap-2">
            <button className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase shadow-lg">Latest</button>
            <button className="bg-white text-gray-500 border border-gray-200 px-6 py-2.5 rounded-full font-bold text-xs uppercase hover:bg-gray-50">Trending</button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            {newsList.map((news) => (
              <div key={news.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row group">
                {/* News Image */}
                <div className="md:w-72 h-56 relative overflow-hidden shrink-0">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {news.isLive && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase animate-pulse">
                      Live
                    </div>
                  )}
                </div>

                {/* News Details */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase tracking-wider mb-3">
                      <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded">{news.category}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {news.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {news.location}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-blue-950 group-hover:text-red-600 transition-colors leading-tight mb-4">
                      {news.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <button className="text-blue-900 font-black text-xs uppercase flex items-center gap-1 hover:gap-2 transition-all">
                      Puri Khabar Padhein <ChevronRight size={16}/>
                    </button>
                    {/* UPDATED SHARE BUTTON */}
                    <button 
                      onClick={() => handleShare(news)}
                      className="p-3 bg-gray-50 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-90"
                      title="Share News"
                    >
                      <Share2 size={18}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar... (baaki code same rahega) */}
          <div className="space-y-8">
            <div className="bg-blue-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/30">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-yellow-400" />
                <h3 className="font-black uppercase tracking-tighter text-xl italic">Mandi Special</h3>
              </div>
              <ul className="space-y-6">
                {/* Same li items here */}
                <li className="border-b border-white/10 pb-4 cursor-pointer hover:text-yellow-400 transition">
                  <p className="text-xs font-bold opacity-60 uppercase">Sundernagar</p>
                  <p className="font-bold text-sm mt-1 leading-snug">Cinema Chowk par Traffic Jam, Altername rasta lein.</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BreakingNews;