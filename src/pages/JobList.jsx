import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, GraduationCap, Users } from 'lucide-react';
import { supabase } from '../supabaseClient';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs').select('*').order('created_at', { ascending: false });
      if (!error) setJobs(data || []);
      setLoading(false);
    };
    fetchJobs();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-900"></div>
        <p className="text-blue-900 font-bold animate-pulse">Loading Jobs...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 pt-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-[0.2em] mb-4 animate-pulse">
            Latest Recruitment 2026
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase">
            HP Govt Jobs Portal
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        {/* Featured */}
        {jobs[0] && (
          <div className="bg-blue-950 text-white rounded-[2.5rem] p-8 mb-8">
            <span className="inline-block bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-[0.2em] mb-4 animate-pulse">
              Featured
            </span>
            <h3 className="text-2xl font-black mb-4 leading-tight">{jobs[0].title}</h3>
            <div className="flex flex-wrap gap-4 mb-4 text-blue-200 text-sm">
              <span className="flex items-center gap-1"><Users size={14}/> {jobs[0].vacancy || 'N/A'} Posts</span>
              <span className="flex items-center gap-1"><GraduationCap size={14}/> {jobs[0].eligibility || 'N/A'}</span>
              <span className="flex items-center gap-1"><MapPin size={14}/> {jobs[0].location || 'HP State'}</span>
            </div>
            <p className="text-blue-200 text-sm line-clamp-2 mb-6">{jobs[0].description}</p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="text-red-400 font-bold text-sm flex items-center gap-1">
                <Calendar size={14}/> Last Date: {jobs[0].end_date || 'TBA'}
              </span>
              <Link
                to={`/jobs/${jobs[0].id}`}
                className="bg-white text-blue-950 px-6 py-3 rounded-2xl font-black uppercase text-sm hover:bg-red-600 hover:text-white transition-all"
              >
                View Details →
              </Link>
            </div>
          </div>
        )}

        {/* All Jobs Grid */}
        <h2 className="text-xl font-black text-blue-950 uppercase mb-4 flex items-center gap-3">
          <div className="h-1 w-12 bg-red-600 rounded-full"></div>
          All Active Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.slice(1).map((job) => (
            <div key={job.id} className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
              <h4 className="font-black text-gray-800 text-base mb-3 leading-tight line-clamp-2">{job.title}</h4>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Users size={12}/> {job.vacancy || 'N/A'}</span>
                <span className="flex items-center gap-1"><GraduationCap size={12}/> {job.eligibility || 'N/A'}</span>
                <span className="flex items-center gap-1"><MapPin size={12}/> {job.location || 'HP State'}</span>
              </div>
              <p className="text-gray-500 text-xs line-clamp-2 mb-4">{job.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-bold text-xs flex items-center gap-1">
                  <Calendar size={12}/> {job.end_date || 'TBA'}
                </span>
                <Link
                  to={`/jobs/${job.id}`}
                  className="bg-blue-950 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase hover:bg-red-600 transition-all"
                >
                  Apply →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsList;