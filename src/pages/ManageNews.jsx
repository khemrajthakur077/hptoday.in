import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Trash2, Edit, Star, X, Search, Loader2 } from 'lucide-react';

const ManageNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Data fetch karne ka function
  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNewsList(data || []);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    if (window.confirm("Kya aap is news ko delete karna chahte hain?")) {
      try {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        setNewsList(newsList.filter(item => item.id !== id));
      } catch (error) {
        alert("Delete failed: " + error.message);
      }
    }
  };

  // Featured toggle logic (FIXED: 'err' is now used in console.error)
  const toggleFeatured = async (id, currentStatus) => {
    try {
      // Pehle baaki sab news ko un-featured set karo
      await supabase.from('news').update({ is_featured: false }).neq('id', 0);
      
      // Selected news ko featured/un-featured karo
      const { error } = await supabase.from('news').update({ is_featured: !currentStatus }).eq('id', id);
      if (error) throw error;
      
      fetchNews();
    } catch (err) {
      console.error("Featured update error:", err.message); // Yahan 'err' use ho gaya
      alert("Error updating featured status");
    }
  };

  // Update function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('news').update({
        title: editingNews.title,
        content: editingNews.content,
        district: editingNews.district,
        category: editingNews.category,
        image_url: editingNews.image_url
      }).eq('id', editingNews.id);

      if (error) throw error;
      
      alert("News Updated Successfully!");
      setEditingNews(null);
      fetchNews();
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

  // Filter search logic
  const filteredNews = newsList.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search news by headline..." 
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 outline-none focus:border-blue-900 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
           <span className="text-blue-900 font-bold text-xs uppercase">Total: {filteredNews.length} Articles</span>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Headline</th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-20 text-center text-gray-400 font-bold uppercase tracking-tighter">
                    <Loader2 className="animate-spin inline mr-3 text-blue-900" size={24} /> 
                    Syncing with Database...
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-20 text-center text-gray-400 font-bold uppercase">No News Articles Found</td>
                </tr>
              ) : (
                filteredNews.map((news) => (
                  <tr key={news.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6">
                      <p className="font-bold text-blue-950 text-sm line-clamp-1">{news.title}</p>
                      <span className="text-[10px] text-gray-400 font-medium">{news.district}</span>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase rounded-full">
                        {news.category}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => toggleFeatured(news.id, news.is_featured)} 
                          title="Set as Featured"
                          className={`p-2.5 rounded-xl transition-all ${news.is_featured ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 hover:bg-gray-50'}`}
                        >
                          <Star size={18} fill={news.is_featured ? "currentColor" : "none"} />
                        </button>
                        <button 
                          onClick={() => setEditingNews(news)} 
                          className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          title="Edit"
                        >
                          <Edit size={18}/>
                        </button>
                        <button 
                          onClick={() => handleDelete(news.id)} 
                          className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingNews && (
        <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-8 md:p-10 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setEditingNews(null)} 
              className="absolute top-8 right-8 p-2 text-gray-300 hover:text-red-500 transition-colors"
            >
              <X size={28}/>
            </button>
            
            <h3 className="text-2xl font-black text-blue-950 mb-8 uppercase italic tracking-tighter border-l-4 border-red-600 pl-4">
              Edit Article
            </h3>
            
            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Headline</label>
                <input 
                  required type="text" 
                  value={editingNews.title} 
                  onChange={(e) => setEditingNews({...editingNews, title: e.target.value})} 
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-950 outline-none transition-all" 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Content</label>
                <textarea 
                  required rows="6" 
                  value={editingNews.content} 
                  onChange={(e) => setEditingNews({...editingNews, content: e.target.value})} 
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-blue-950 outline-none transition-all"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="bg-blue-950 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-blue-900/20"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;