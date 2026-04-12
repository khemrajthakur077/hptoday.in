import React from 'react';
import {
  UsersIcon,
  TrophyIcon,
  GlobeAmericasIcon,
  NewspaperIcon,
  ArrowRightIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section - Balanced Height */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 select-none pointer-events-none">
          <div className="absolute transform -rotate-12 -left-10 top-10 text-8xl font-black">HP TODAY</div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-4 uppercase tracking-widest">
            Himachal's Trusted News Network
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            About <span className="text-blue-400">HP Today</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Founded in August 2025, HP Today is the digital pulse of Himachal Pradesh, delivering verified news with speed and integrity.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Statistics Cards - Scaled Down to Medium */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Followers', value: '12K+', icon: UsersIcon, color: 'text-blue-600' },
            { label: 'Launched', value: 'Aug 2025', icon: TrophyIcon, color: 'text-yellow-500' },
            { label: 'Coverage', value: 'All HP', icon: GlobeAmericasIcon, color: 'text-green-600' },
            { label: 'Stories', value: 'Verified', icon: NewspaperIcon, color: 'text-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all group text-center">
              <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Founder Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center">
               <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
               Our Mission
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
              "HP Today ka maqsad Himachal ke har nagrik ko sach aur satya se jode rakhna hai. Hum sirf khabar nahi, vishwas dikhate hain."
            </p>
            <div className="p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                <p className="text-slate-800 font-bold leading-relaxed">
                   Managed and established by <span className="text-blue-600">Khemraj Thakur</span>, HP Today has become a movement for transparent digital journalism in the hills.
                </p>
            </div>
          </div>
          
          {/* Founder Profile Card - Scaled Down */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6 group-hover:rotate-3 transition-transform">
                KT
              </div>
              <h3 className="text-2xl font-black text-slate-900">Khemraj Thakur</h3>
              <p className="text-blue-600 font-bold mb-6">Founder & Editor-in-Chief</p>
              
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <div className="flex items-center justify-center text-slate-700 p-3 bg-slate-50 rounded-xl">
                  <MapPinIcon className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="font-bold text-sm text-slate-600">Sundernagar, Mandi, HP</span>
                </div>
                <div className="flex items-center justify-center text-slate-700 p-3 bg-slate-50 rounded-xl">
                  <NewspaperIcon className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-bold text-sm text-slate-600">Digital Media Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Connection Section using your PNGs */}
        <section className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 mb-20 overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Connect <span className="text-blue-400">With Us</span></h2>
              <p className="text-slate-400 font-medium mb-8">Join our fast-growing community on social media.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { img: "/facebook.png", href: "https://www.facebook.com/share/1EGnsMgMuG/", label: "Facebook" },
                  { img: "/instagram.png", href: "https://www.instagram.com/hp.today?igsh=dGt1cGRteDVmczk3", label: "Instagram" },
                  { img: "/youtube.png", href: "https://youtube.com/@hp_today?si=D_MHsh_6ljNw47rU", label: "YouTube" },
                  { img: "/threads.png", href: "https://www.threads.net/@hp.today", label: "Threads" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <img src={social.img} alt={social.label} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                    <span className="ml-3 font-bold text-white text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
               <h3 className="text-xl font-bold text-white flex items-center">
                 <span className="w-1.5 h-6 bg-green-500 rounded-full mr-3"></span>
                 Why Follow Us?
               </h3>
               <div className="grid gap-3">
                  {['Real-time News', 'Fact-Checked', 'Voice of HP'].map((item, i) => (
                    <div key={i} className="text-slate-300 font-bold flex items-center text-sm bg-slate-800/50 p-3 rounded-lg">
                       <span className="text-green-400 mr-2">✓</span> {item}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* CTA - Action Buttons */}
        <div className="text-center py-16 border-t border-slate-200">
          <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">
            Have a story to share?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:hptoday16@gmail.com" className="group flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
              <EnvelopeIcon className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Send Story
            </a>
            <a href="tel:+918580881886" className="group flex items-center px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-blue-300 transition-all">
              <PhoneIcon className="w-6 h-6 mr-3 text-blue-600" />
              Call Newsroom
            </a>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
             <span className="flex items-center"><MapPinIcon className="w-4 h-4 mr-1 text-orange-500" /> Sundernagar</span>
             <span className="flex items-center"><EnvelopeIcon className="w-4 h-4 mr-1 text-blue-500" /> hptoday16@gmail.com</span>
             <span className="flex items-center"><PhoneIcon className="w-4 h-4 mr-1 text-green-500" /> +91 85808 81886</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;