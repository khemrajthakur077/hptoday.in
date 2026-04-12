import React, { useState, useEffect } from 'react'; // 1. useEffect add kiya
import { supabase } from '../supabaseClient';
import { Send, Image as ImageIcon, MapPin, Tag, Loader2 } from 'lucide-react';

const PostNews = ({ user, onPublishSuccess, initialData }) => { // 2. initialData prop liya
  const categories = ["Breaking News", "Taza Khabar", "Politics", "Sports", "Entertainment"];
  const districts = ["All", "Mandi", "Shimla", "Kangra", "Kullu", "Hamirpur", "Solan", "Chamba", "Una", "Bilaspur", "Sirmaur", "Kinnaur", "Lahaul-Spiti"];

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    district: 'Mandi',
    category: 'Breaking News',
    image_url: ''
  });

  // ✅ 3. Yeh EFFECT data auto-fill karega
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        district: initialData.district || 'Mandi',
        category: initialData.category || 'Breaking News',
        image_url: initialData.image_url || ''
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in the title and content.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('news').insert([
        { 
          ...formData, 
          author_name: user?.email?.split('@')[0] || 'Admin', 
          author_id: user?.id 
        }
      ]);

      if (error) throw error;

      alert("News Published Successfully! 🚀");
      
      setFormData({ 
        title: '', 
        content: '', 
        district: 'Mandi', 
        category: 'Breaking News', 
        image_url: '' 
      });

      if (onPublishSuccess) onPublishSuccess();

    } catch (err) {
      console.error("Publishing Error:", err.message);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8 md:mb-10 border-l-4 border-red-600 pl-4 md:pl-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-blue-950 uppercase italic tracking-tighter">Create New Article</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Fill in the details to publish news</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Headline */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">News Headline</label>
            <input 
              required 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              className="w-full p-4 md:p-5 bg-slate-50 rounded-2xl outline-none font-bold text-blue-950 border-2 border-transparent focus:border-blue-900 transition-all" 
              placeholder="E.g. Mandi mein bhari baarish ka alert..." 
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Article Body</label>
            <textarea 
              required 
              rows="8" 
              value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})} 
              className="w-full p-4 md:p-5 bg-slate-50 rounded-2xl outline-none font-bold text-blue-950 border-2 border-transparent focus:border-blue-900 transition-all resize-none" 
              placeholder="Write full news content here..."
            ></textarea>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest flex items-center gap-2">
                <Tag size={12} /> Category
              </label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
                className="w-full p-4 md:p-5 bg-slate-50 rounded-2xl font-bold text-blue-950 border-2 border-transparent focus:border-blue-900 outline-none appearance-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest flex items-center gap-2">
                <MapPin size={12} /> District
              </label>
              <select 
                value={formData.district} 
                onChange={(e) => setFormData({...formData, district: e.target.value})} 
                className="w-full p-4 md:p-5 bg-slate-50 rounded-2xl font-bold text-blue-950 border-2 border-transparent focus:border-blue-900 outline-none appearance-none"
              >
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest flex items-center gap-2">
              <ImageIcon size={12} /> Image URL (Optional)
            </label>
            <input 
              type="text" 
              value={formData.image_url} 
              onChange={(e) => setFormData({...formData, image_url: e.target.value})} 
              className="w-full p-4 md:p-5 bg-slate-50 rounded-2xl font-bold text-blue-950 outline-none border-2 border-transparent focus:border-blue-900 transition-all" 
              placeholder="https://example.com/image.jpg" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-950 text-white w-full py-5 md:py-6 rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <><Loader2 className="animate-spin" size={20} /> Publishing...</>
            ) : (
              <><Send size={20} /> Publish Article Now</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostNews;