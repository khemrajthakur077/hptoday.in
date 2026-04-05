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
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        setAutoNews(data.items);
      } else {
        throw new Error("Failed to fetch news. Please try again later.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  // Improved Cleaning Function
  const cleanContent = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, 'text/html');
    // Google RSS description mein aksar links aur images hoti hain, unhe hata kar sirf text nikalna
    return doc.body.textContent || doc.body.innerText || "";
  };

  const handleImport = (item) => {
    // Yahan hum wo objects bhej rahe hain jo PostNews mangta hai
    const mappedData = {
      title: item.title || '',
      // description/content dono ko merge ya clean karke bhej rahe hain
      content: cleanContent(item.content || item.description), 
      image_url: item.enclosure?.link || item.thumbnail || '', 
      category: 'Himachal', // Default category set kar di
      author: item.author || 'Google News',
      source_link: item.link // Agar aap source link save karna chahen
    };

    onImport(mappedData);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Card */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-blue-950 uppercase italic tracking-tighter">AI News Aggregator</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center md:text-left">Himachal Pradesh Latest Updates</p>
        </div>
        <button 
          onClick={fetchRSSNews} 
          disabled={isFetching} 
          className="w-full md:w-auto bg-blue-950 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-600 disabled:opacity-50 transition-all shadow-xl"
        >
          <RefreshCw size={20} className={isFetching ? 'animate-spin' : ''} /> 
          {isFetching ? 'Syncing...' : 'Fetch News'}
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
            <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-md transition-all group">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {new Date(item.pubDate).toLocaleDateString('hi-IN')}
                  </span>
                  <button 
                    onClick={() => handleImport(item)}
                    className="w-full md:w-auto bg-red-600 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-blue-950 transition-all shadow-lg"
                  >
                    Import Content <ArrowRight size={14} />
                  </button>
                </div>
                
                <h3 className="text-lg md:text-xl font-black text-blue-950 leading-tight group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>

                <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <BookOpen size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Content Preview</span>
                  </div>
                  <p className="text-gray-600 font-bold text-sm leading-relaxed line-clamp-3 italic">
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
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
              <Globe className="text-slate-300 mx-auto mb-4" size={40} />
              <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No news found. Click Sync.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AutoFetch;