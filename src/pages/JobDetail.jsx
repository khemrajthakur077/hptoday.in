import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Share2, ExternalLink } from 'lucide-react';
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

const JobDetail = () => {
  const { slug } = useParams();
  const getJobSlug = (job) => slugify(job?.title || job?.id || '');
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      let jobData = null;
      const normalizedSlug = slug?.toString().toLowerCase();
      const isId = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(normalizedSlug)
        || /^[0-9]+$/.test(normalizedSlug);

      if (isId) {
        const { data, error } = await supabase
          .from('jobs').select('*').eq('id', normalizedSlug).maybeSingle();
        if (!error && data) jobData = data;
      }

      if (!jobData) {
        const { data, error } = await supabase
          .from('jobs').select('*').limit(1000);
        if (!error && data) {
          jobData = data.find((item) => slugify(item?.title) === normalizedSlug);
        }
      }

      if (jobData) {
        setJob(jobData);
        const { data: related } = await supabase
          .from('jobs').select('id, title, vacancy');
        if (related) {
          setRelatedJobs(related.filter((r) => r.id !== jobData.id).slice(0, 3));
        }
      }

      setLoading(false);
    };
    fetchJob();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: job.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1c3f6e]"></div>
        <p className="font-serif text-[#1c3f6e] tracking-widest text-sm">Loading...</p>
      </div>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <p className="font-serif text-2xl text-gray-800 mb-2">Recruitment not found</p>
      <p className="text-sm text-gray-500 mb-6">This job may have expired or the link is incorrect.</p>
      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center gap-2 text-sm font-sans font-medium border border-gray-800 px-5 py-2 hover:bg-gray-100 transition-all"
      >
        <ArrowLeft size={15} /> Back to Jobs
      </button>
    </div>
  );

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const stats = [
    { label: 'Total Vacancy', value: job.vacancy || 'N/A', red: false },
    { label: 'Eligibility', value: job.eligibility || 'N/A', red: false },
    { label: 'Location', value: job.location || 'HP State', red: false },
    { label: 'Last Date', value: job.end_date || 'TBA', red: true },
  ];

  const dates = [
    { key: 'Application start', val: job.start_date || 'TBA', red: false },
    { key: 'Last date to apply', val: job.end_date || 'TBA', red: true },
    { key: 'Exam date', val: 'To be announced', red: false },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-serif">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">

        {/* Back Link */}
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 font-sans text-xs text-gray-500 hover:text-gray-900 tracking-widest uppercase mb-6 transition-all"
        >
          <ArrowLeft size={13} /> All Recruitments
        </Link>

        {/* Masthead */}
        <div className="border-b-[3px] border-gray-900 pb-2 mb-1">
          <p className="font-sans text-xl font-bold tracking-tight text-gray-900">
            HP Today — Sarkari Bharti
          </p>
        </div>
        <div className="border-b border-gray-400 pb-2 mb-5 flex justify-between items-center">
          <span className="font-sans text-[11px] font-medium tracking-widest uppercase bg-[#1c3f6e] text-white px-3 py-1">
            Recruitment Notice
          </span>
          <span className="font-sans text-[11px] text-gray-500">
            {today} | Himachal Pradesh
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-4xl font-medium leading-snug text-gray-900 border-b border-gray-200 pb-4 mb-3">
          {job.title}
        </h1>

        {/* Byline */}
        <div className="flex flex-wrap gap-4 font-sans text-[11px] text-gray-500 tracking-widest uppercase mb-5">
          {job.vacancy && <span>Vacancy: {job.vacancy}</span>}
          {job.eligibility && <span>Eligibility: {job.eligibility}</span>}
          {job.location && <span>Location: {job.location}</span>}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-300 mb-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-3 border-r border-b border-gray-300 last:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4)]:border-r-0"
            >
              <p className="font-sans text-[10px] font-medium text-gray-400 tracking-widest uppercase mb-1">
                {stat.label}
              </p>
              <p className={`font-sans text-sm font-medium ${stat.red ? 'text-red-700' : 'text-gray-900'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Lead Para */}
            <p className="font-serif text-base leading-relaxed text-gray-800 border-l-[3px] border-[#1c3f6e] pl-4 mb-5">
              {job.description ? job.description.split('.')[0] + '.' : ''}
            </p>

            {/* Body Text */}
            <div
              className="font-sans text-sm leading-7 text-gray-600 mb-6"
              style={{ columnCount: 2, columnGap: '1.5rem' }}
            >
              {job.description}
            </div>

            {/* Important Dates */}
            <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-gray-400 border-b border-gray-300 pb-1 mb-3">
              Important Dates
            </p>
            <div className="border border-gray-300 mb-6">
              {dates.map((row, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-4 py-3 font-sans text-sm ${i !== dates.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <span className="text-gray-500">{row.key}</span>
                  <span className={`font-medium ${row.red ? 'text-red-700' : 'text-gray-900'}`}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-gray-400 border-b border-gray-300 pb-1 mb-3">
              Apply Now
            </p>
            {job.pdf_url && (
              <a
                href={job.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#1c3f6e] text-white font-sans text-xs font-medium tracking-widest uppercase py-4 mb-3 hover:bg-[#153258] transition-all"
              >
                <ExternalLink size={14} /> Official Notification (PDF)
              </a>
            )}
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 w-full border border-gray-800 text-gray-800 font-sans text-xs font-medium tracking-widest uppercase py-4 hover:bg-gray-50 transition-all"
            >
              <Share2 size={14} /> Share This Recruitment
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">

            {/* WhatsApp Card */}
            <div className="border border-[#97C459] bg-[#EAF3DE] p-5 mb-6">
              <p className="font-sans text-sm font-medium text-[#27500A] mb-1">Sarkari updates</p>
              <p className="font-sans text-xs text-[#3B6D11] mb-4 leading-relaxed">
                WhatsApp par turant notification paayein — free mein.
              </p>
              <a
                href="https://whatsapp.com/channel/0029Vb7CRmy60eBm0gsfJb08"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#27500A] text-[#C0DD97] font-sans text-xs font-medium tracking-widest uppercase py-3 text-center hover:bg-[#173404] transition-all"
              >
                Join Channel
              </a>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div>
                <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-gray-400 border-b border-gray-300 pb-1 mb-3">
                  Other Active Jobs
                </p>
                {relatedJobs.map((rj) => (
                  <Link
                    key={rj.id}
                    to={`/jobs/${slugify(rj.title)}`}
                    className="block py-3 border-b border-gray-100 hover:bg-gray-50 transition-all px-1"
                  >
                    <p className="font-serif text-sm text-gray-800 leading-snug mb-1 line-clamp-2">
                      {rj.title}
                    </p>
                    {rj.vacancy && (
                      <span className="font-sans text-[11px] text-gray-400">
                        {rj.vacancy} posts
                      </span>
                    )}
                  </Link>
                ))}
                <Link
                  to="/jobs"
                  className="block font-sans text-xs text-[#1c3f6e] tracking-widest uppercase mt-3 hover:underline"
                >
                  View all recruitments
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="mt-10 pt-4 border-t-2 border-gray-900 flex justify-between items-center flex-wrap gap-2">
          <span className="font-sans text-[11px] text-gray-500 tracking-widest uppercase">
            hptoday.in — official recruitment portal
          </span>
          <span className="font-sans text-[11px] text-gray-400">
            Last updated: {today}
          </span>
        </div>

      </div>
    </div>
  );
};

export default JobDetail;