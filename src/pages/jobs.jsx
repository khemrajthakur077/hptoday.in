import React from 'react';
import { 
  Calendar, MapPin, Briefcase, GraduationCap, 
  ArrowLeft, Share2, ExternalLink, CheckCircle2, 
  Clock, BellRing, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const JobPage = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans">
      
      {/* --- HERO SECTION: Gradient Header --- */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 pt-10 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-all font-bold text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <ArrowLeft size={16} /> HP Today Jobs Portal
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-block bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-[0.2em] mb-4 animate-pulse">
                New Recruitment 2026
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                HP Education Department: <span className="text-yellow-400">2500+</span> JBT & TGT Batch-wise Recruitment
              </h1>
            </div>
            <div className="hidden lg:block">
               <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white">
                  <p className="text-blue-200 text-xs font-bold uppercase mb-1">Ending Soon</p>
                  <p className="text-2xl font-black">22 Days Left</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Briefcase className="text-blue-600"/>, label: "Total Vacancy", val: "2500+", bg: "bg-blue-50" },
                { icon: <GraduationCap className="text-purple-600"/>, label: "Eligibility", val: "TET Pass", bg: "bg-purple-50" },
                { icon: <MapPin className="text-red-600"/>, label: "Job Location", val: "HP State", bg: "bg-red-50" },
                { icon: <Clock className="text-orange-600"/>, label: "Type", val: "Batch-wise", bg: "bg-orange-50" },
              ].map((stat, i) => (
                <div key={i} className={`${stat.bg} p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center`}>
                  <div className="mb-2">{stat.icon}</div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="font-black text-gray-800 text-lg">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Main Article Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-900/5 border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-1 w-20 bg-red-600 rounded-full"></div>
                 <h2 className="text-xl font-black text-blue-950 uppercase tracking-tighter">Full Notification Details</h2>
              </div>

              <div className="space-y-8 text-gray-600">
                <p className="text-lg leading-relaxed font-medium">
                  Himachal Pradesh Education Department ne batch-wise bharti prakriya ko lekar nayi notification jaari ki hai. Is recruitment drive ke antargat JBT aur TGT ke 2500+ khaali padon ko bhara jayega.
                </p>

                {/* Important Dates Box */}
                <div className="bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200">
                  <h3 className="text-blue-900 font-black flex items-center gap-2 mb-6 uppercase tracking-wider">
                    <Calendar size={20} className="text-red-600"/> Important Dates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase">Start Date</span>
                      <span className="font-black text-gray-800">05 April 2026</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase">Closing Date</span>
                      <span className="font-black text-red-600">25 April 2026</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase">Counseling Date</span>
                      <span className="font-black text-blue-600">May 2026</span>
                    </div>
                  </div>
                </div>

                {/* Requirements List */}
                <div>
                  <h3 className="text-blue-900 font-black flex items-center gap-2 mb-4 uppercase">
                    <CheckCircle2 size={20} className="text-green-600"/> Essential Requirements:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["TET Qualified", "Batch-wise Merit List", "Employment Exchange Reg.", "Himachal Bonafide"].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 bg-green-50/50 p-3 rounded-xl border border-green-100 text-sm font-bold text-green-800">
                        <ChevronRight size={14} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
                <button className="flex-[2] bg-blue-950 text-white py-5 rounded-2xl font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-red-600 hover:-translate-y-1 transition-all shadow-xl shadow-blue-900/20">
                  <ExternalLink size={20}/> Download Official PDF
                </button>
                <button className="flex-1 bg-white border-2 border-blue-950 text-blue-950 py-5 rounded-2xl font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-blue-50 transition-all">
                  <Share2 size={20}/> Share Job
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Sidebar */}
          <div className="space-y-6">
            
            {/* WhatsApp Premium Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-green-500/30 relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <BellRing className="mb-4 animate-bounce" size={32}/>
              <h3 className="text-2xl font-black leading-tight mb-2">Sarkaari Naukri Updates</h3>
              <p className="text-green-100 text-sm mb-6 font-medium">Har bharti ki update sabse pehle WhatsApp par paane ke liye join karein.</p>
              <button className="w-full bg-white text-green-700 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-colors">
                Join Group Now
              </button>
            </div>

            {/* Related Jobs List */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
               <h3 className="text-lg font-black text-blue-950 uppercase italic mb-6 border-l-4 border-red-600 pl-4">
                Other Hot Jobs
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="group cursor-pointer flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gray-100 flex-shrink-0 flex items-center justify-center font-black text-blue-900 group-hover:bg-red-600 group-hover:text-white transition-all">
                      {item}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-blue-950 group-hover:text-red-600 transition-all leading-tight">
                        HP Police Constable recruitment 2026: 1200+ posts out.
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase italic">Last Date: 15 May</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-xs font-black text-blue-900 uppercase border-t border-gray-50 hover:text-red-600">
                View All Vacancies
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;