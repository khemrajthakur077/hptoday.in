import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  LayoutDashboard, Newspaper, Home, LogOut, 
  PlusCircle, BarChart3, UserCircle, Trash2, Edit, RefreshCw, Globe, Star, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [autoNews, setAutoNews] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [editingNews, setEditingNews] = useState(null); 
  const navigate = useNavigate();

  // Config Lists
  const categories = ["Breaking News", "Taza Khabar", "Politics", "Sports", "Entertainment"];
  const districts = ["Mandi", "Shimla", "Kangra", "Kullu", "Hamirpur", "Solan", "Chamba", "Una", "Bilaspur", "Sirmaur", "Kinnaur", "Lahaul-Spiti"];

  const [formData, setFormData] = useState({
    title: '', content: '', district: 'Mandi', category: 'Breaking News', image_url: ''
  });

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin-login');
      } else {
        setUser(session.user);
        fetchNews();
      }
    };
    getSession();
  }, [navigate]);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setNewsList(data);
  };

  // --- TOGGLE FEATURED (STAR) ---
  const toggleFeatured = async (id, currentStatus) => {
    const updatedList = newsList.map(n => ({
      ...n,
      is_featured: n.id === id ? !currentStatus : false
    }));
    setNewsList(updatedList);

    try {
      await supabase.from('news').update({ is_featured: false }).neq('id', 0);
      const { error } = await supabase
        .from('news')
        .update({ is_featured: !currentStatus })
        .eq('id', id);
      if (error) throw error;
    } catch (err) {
      alert("Error updating featured news");
      fetchNews();
    }
  };

  // --- EDIT MODAL LOGIC ---
  const handleEditClick = (news) => {
    setEditingNews(news);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('news')
      .update({
        title: editingNews.title,
        content: editingNews.content,
        district: editingNews.district,
        category: editingNews.category, // UPDATED: Category now saves
        image_url: editingNews.image_url
      })
      .eq('id', editingNews.id);

    if (!error) {
      alert("News Updated!");
      setEditingNews(null);
      fetchNews();
    } else {
      alert(error.message);
    }
  };

  // --- POST NEW ARTICLE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('news').insert([
      { ...formData, author_name: user.email.split('@')[0], author_id: user.id }
    ]);
    if (error) {
      alert(error.message);
    } else {
      alert("News Published!");
      setFormData({ title: '', content: '', district: 'Mandi', category: 'Breaking News', image_url: '' });
      fetchNews();
      setActiveTab('manage'); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this article?")) {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (!error) setNewsList(newsList.filter(item => item.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const fetchRSSNews = async () => {
    setIsFetching(true);
    const rssUrl = "https://news.google.com/rss/search?q=Himachal+Mandi+news+when:24h&hl=hi&gl=IN&ceid=IN:hi";
    try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      const data = await response.json();
      if (data.status === 'ok') setAutoNews(data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-8 border-b border-white/10 text-center">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">HP<span className="text-red-500 font-black">TODAY</span></h1>
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'overview' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-white/10 text-blue-100'}`}><LayoutDashboard size={18} /> Overview</button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'news' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-white/10 text-blue-100'}`}><PlusCircle size={18} /> Post News</button>
          <button onClick={() => setActiveTab('auto')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'auto' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-white/10 text-blue-100'}`}><Globe size={18} /> Auto Fetch</button>
          <button onClick={() => setActiveTab('manage')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition ${activeTab === 'manage' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-white/10 text-blue-100'}`}><Newspaper size={18} /> Manage News</button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-blue-950 uppercase tracking-tight">{activeTab}</h2>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-200">
            <UserCircle size={20} className="text-blue-900" />
            <span className="text-xs font-black text-blue-950 uppercase">{user?.email?.split('@')[0]}</span>
          </div>
        </header>

        {/* 1. OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-fit min-w-[300px] hover:shadow-xl transition">
            <div className="p-4 bg-red-50 rounded-2xl w-fit mb-6"><Newspaper className="text-red-600" size={32} /></div>
            <h4 className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Articles Published</h4>
            <p className="text-5xl font-black text-blue-950 mt-2 tracking-tighter">{newsList.length}</p>
          </div>
        )}

        {/* 2. POST NEWS */}
        {activeTab === 'news' && (
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-blue-900" placeholder="Enter News Headline" />
              <textarea required rows="8" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-blue-900" placeholder="Write full content here..."></textarea>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-2 block">Category (Ticker Control)</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-900 outline-none">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-2 block">District</label>
                  <select value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-900 outline-none">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <input type="text" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-900" placeholder="Image URL (Unsplash or Direct Link)" />
              
              <button type="submit" className="bg-blue-950 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition shadow-xl transform active:scale-95">🚀 Publish Article</button>
            </form>
          </div>
        )}

        {/* 3. MANAGE NEWS */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Headline</th>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Type</th>
                  <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Settings</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((news) => (
                  <tr key={news.id} className="border-b hover:bg-slate-50/80 transition">
                    <td className="p-6 font-bold text-blue-950 text-sm truncate max-w-xs">{news.title}</td>
                    <td className="p-6">
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${news.category === 'Breaking News' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-800'}`}>
                        {news.category}
                      </span>
                    </td>
                    <td className="p-6 text-right flex justify-end gap-3">
                      <button title="Feature on Hero" onClick={() => toggleFeatured(news.id, news.is_featured)} className={`p-2.5 rounded-xl transition-all ${news.is_featured ? 'text-yellow-500 bg-yellow-50 shadow-inner' : 'text-gray-300 hover:bg-gray-100 hover:text-gray-500'}`}>
                        <Star size={18} fill={news.is_featured ? "currentColor" : "none"} />
                      </button>
                      <button title="Edit" onClick={() => handleEditClick(news)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit size={18}/></button>
                      <button title="Delete" onClick={() => handleDelete(news.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. AUTO FETCH */}
        {activeTab === 'auto' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <button onClick={fetchRSSNews} disabled={isFetching} className="bg-blue-950 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-900 disabled:opacity-50 transition">
                <RefreshCw size={18} className={isFetching ? 'animate-spin' : ''} /> {isFetching ? 'Fetching Data...' : 'Sync Latest HP News'}
              </button>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Source: Google News RSS (Himachal Pradesh)</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {autoNews.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] flex justify-between items-center shadow-sm hover:shadow-md border border-gray-50 transition-all">
                  <div className="max-w-2xl">
                    <h4 className="font-black text-blue-950 text-sm leading-tight mb-1">{item.title}</h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{item.pubDate}</span>
                  </div>
                  <button onClick={() => { 
                    setFormData({...formData, title: item.title, content: item.description?.replace(/<[^>]*>?/gm, '')}); 
                    setActiveTab('news'); 
                  }} className="whitespace-nowrap bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-100">Import & Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- EDIT MODAL (POPUP) --- */}
      {editingNews && (
        <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200">
            <button onClick={() => setEditingNews(null)} className="absolute top-8 right-8 p-2 text-gray-300 hover:text-red-500 transition-colors"><X size={28}/></button>
            <h3 className="text-2xl font-black text-blue-950 mb-8 uppercase italic tracking-tighter">Edit Article Settings</h3>
            
            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Headline</label>
                <input required type="text" value={editingNews.title} onChange={(e) => setEditingNews({...editingNews, title: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-950 outline-none" />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Article Content</label>
                <textarea required rows="6" value={editingNews.content} onChange={(e) => setEditingNews({...editingNews, content: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-950 outline-none"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Category</label>
                  <select value={editingNews.category} onChange={(e) => setEditingNews({...editingNews, category: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-950 outline-none">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4">District</label>
                  <select value={editingNews.district} onChange={(e) => setEditingNews({...editingNews, district: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-950 outline-none">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Featured Image URL</label>
                <input type="text" value={editingNews.image_url} onChange={(e) => setEditingNews({...editingNews, image_url: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-950 outline-none" />
              </div>

              <button type="submit" className="bg-blue-950 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-green-600 transition shadow-lg mt-4">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;