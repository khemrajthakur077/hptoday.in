import React, { useState } from 'react';
import { RefreshCw, Globe, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

const AutoFetch = ({ onImport }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [autoNews, setAutoNews] = useState([]);
  const [error, setError] = useState(null);

  const rssUrl = "https://news.google.com/rss/search?q=Himachal+Mandi+news+when:24h&hl=hi&gl=IN&ceid=IN:hi";

  const fetchRSSNews = async () => {
    setIsFetching(true);
    setError(null);
    try {
      // rss2json API ka use karke RSS ko readable JSON mein convert kar rahe hain
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        setAutoNews(data.items);
      } else {
        throw new Error("Failed to fetch news. Please try again later.");
      }
    } catch (err) {
      setError(err.message);
      console.error("RSS Fetch Error:", err);
    } finally {
      setIsFetching(false);
    }
  };

  // HTML content ko saaf karne ke liye function
  const cleanContent = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Card */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-blue-950 uppercase italic tracking-tighter">AI News Aggregator</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Fetch latest news from Himachal Pradesh</p>
        </div>
        <button 
          onClick={fetchRSSNews} 
          disabled={isFetching} 
          className="bg-blue-950 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-red-600 disabled:opacity-50 transition-all shadow-xl shadow-blue-900/10"
        >
          <RefreshCw size={20} className={isFetching ? 'animate-spin' : ''} /> 
          {isFetching ? 'Syncing...' : 'Fetch Latest News'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-600 font-bold">
          <AlertCircle /> {error}
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6">
        {autoNews.length > 0 ? (
          autoNews.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-md transition-all group">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {item.pubDate}
                  </span>
                  <button 
                    onClick={() => onImport({
                      title: item.title,
                      content: cleanContent(item.description || item.content),
                      image_url: item.enclosure?.link || ''
                    })}
                    className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase flex items-center gap-2 hover:bg-blue-950 transition-all shadow-lg shadow-red-600/20"
                  >
                    Import Content <ArrowRight size={14} />
                  </button>
                </div>
                
                <h3 className="text-xl font-black text-blue-950 leading-tight group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <BookOpen size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Content Preview</span>
                  </div>
                  <p className="text-gray-600 font-bold text-sm leading-relaxed line-clamp-4 italic">
                    {cleanContent(item.description || item.content)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                  <Globe size={12} /> Source: {item.author || "Google News RSS"}
                </div>
              </div>
            </div>
          ))
        ) : (
          !isFetching && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-slate-300" size={40} />
              </div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No data fetched yet. Click the sync button above.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AutoFetch;