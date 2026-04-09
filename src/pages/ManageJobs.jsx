import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Navigate import kiya
import { supabase } from '../supabaseClient';
import { 
  PlusCircle, Pencil, Trash2, Save, X, 
  Briefcase, GraduationCap, MapPin, Calendar, Link as LinkIcon,
  AlertCircle, CheckCircle2, Loader2, ExternalLink // 2. ExternalLink icon add kiya
} from 'lucide-react';

const slugify = (value) => {
  if (!value) return '';
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_–—]+/g, '-')
    .replace(/[^\w\u0900-\u097F]+/g, '') // Allow word characters and Devanagari script
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const ManageJobs = () => {
  const navigate = useNavigate(); // Navigation hook
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vacancy: '',
    eligibility: '',
    location: '',
    start_date: '',
    end_date: '',
    pdf_url: ''
  });

  // Data Fetch Karna
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Form Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('jobs')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        alert("Job Updated Successfully!");
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert([formData]);
        if (error) throw error;
        alert("New Job Published!");
      }
      resetForm();
      fetchJobs();
    } catch (error) {
      alert("Error saving job: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (job) => {
    setEditingId(job.id);
    setFormData({
      title: job.title,
      description: job.description,
      vacancy: job.vacancy,
      eligibility: job.eligibility,
      location: job.location,
      start_date: job.start_date,
      end_date: job.end_date,
      pdf_url: job.pdf_url
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Kya aap is job post ko hamesha ke liye delete karna chahte hain?")) {
      try {
        const { error } = await supabase.from('jobs').delete().eq('id', id);
        if (error) throw error;
        fetchJobs();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '', description: '', vacancy: '', eligibility: '',
      location: '', start_date: '', end_date: '', pdf_url: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
      {/* Header Section */}
      <div className="bg-blue-950 text-white pt-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">
              HP Today <span className="text-red-500">Admin</span>
            </h1>
            <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mt-2">Manage All Recruitment Posts</p>
          </div>
          <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10">
            <span className="text-sm font-bold">Total Jobs: {jobs.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: Editor Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-blue-900/10 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-blue-950 uppercase flex items-center gap-3">
                  {editingId ? <Pencil className="text-red-600" /> : <PlusCircle className="text-red-600" />}
                  {editingId ? "Edit Job Post" : "Add New Recruitment"}
                </h2>
                {editingId && (
                  <button onClick={resetForm} className="text-gray-400 hover:text-red-600 transition-colors">
                    <X size={24} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block tracking-widest">Job Title / Bharti Ka Naam</label>
                  <input 
                    type="text" required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-950 p-5 rounded-3xl outline-none transition-all font-bold text-gray-800" 
                    placeholder="E.g. HP State Selection Commission Recruitment 2026" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block tracking-widest">Total Vacancy</label>
                    <input 
                      type="text"
                      value={formData.vacancy}
                      onChange={(e) => setFormData({...formData, vacancy: e.target.value})}
                      className="w-full bg-gray-50 p-5 rounded-3xl outline-none font-bold" 
                      placeholder="e.g. 125 Posts" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block tracking-widest">Eligibility</label>
                    <input 
                      type="text"
                      value={formData.eligibility}
                      onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                      className="w-full bg-gray-50 p-5 rounded-3xl outline-none font-bold" 
                      placeholder="e.g. 12th Pass / Graduate" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block tracking-widest">Notification Description</label>
                  <textarea 
                    rows="6" required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-gray-50 p-6 rounded-[2rem] outline-none font-medium text-gray-700" 
                    placeholder="Describe the job details, age limit, fees etc..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block tracking-widest">Job Location</label>
                    <input 
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-gray-50 p-5 rounded-3xl outline-none font-bold" 
                      placeholder="Shimla, HP" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-2 block tracking-widest">PDF Link (Official)</label>
                    <input 
                      type="url"
                      value={formData.pdf_url}
                      onChange={(e) => setFormData({...formData, pdf_url: e.target.value})}
                      className="w-full bg-gray-50 p-5 rounded-3xl outline-none font-bold" 
                      placeholder="https://..." 
                    />
                  </div>
                </div>

                <div className="bg-blue-50/50 p-6 rounded-[2rem] border-2 border-dashed border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-blue-400 uppercase mb-2 block">Application Start Date</label>
                    <input 
                      type="text"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      className="w-full bg-white p-4 rounded-2xl outline-none font-black text-blue-900 shadow-sm" 
                      placeholder="01 April 2026" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-red-400 uppercase mb-2 block">Closing Last Date</label>
                    <input 
                      type="text"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="w-full bg-white p-4 rounded-2xl outline-none font-black text-red-600 shadow-sm" 
                      placeholder="30 April 2026" 
                    />
                  </div>
                </div>

                <button 
                  disabled={submitting}
                  className="w-full bg-blue-950 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-lg hover:bg-red-600 disabled:bg-gray-400 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : <Save />}
                  {editingId ? "Update Job Post" : "Publish Job Post"}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Active List */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-blue-950 uppercase flex items-center gap-3 px-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Active Jobs
            </h3>
            
            <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="text-center py-10 text-gray-400 font-bold uppercase animate-pulse">Loading Database...</div>
              ) : jobs.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl text-center text-gray-400 font-bold">No jobs found!</div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-blue-950 transition-all group">
                    <h4 className="font-black text-gray-800 leading-tight mb-3 uppercase text-sm line-clamp-2">
                      {job.title}
                    </h4>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">End Date</span>
                        <span className="text-xs font-bold text-red-600">{job.end_date || 'N/A'}</span>
                      </div>
                      <div className="flex gap-2">
                        {/* 3. VIEW BUTTON ADDED HERE */}
                        <button 
                          onClick={() => window.open(`/jobs/${slugify(job.title)}`, '_blank')}
                          className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                          title="View Live Page"
                        >
                          <ExternalLink size={18} />
                        </button>

                        <button 
                          onClick={() => handleEdit(job)}
                          className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Pencil size={18} />
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(job.id)}
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageJobs;