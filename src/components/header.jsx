import React, { useState } from 'react';
import { Menu, X, Search, Bell, TrendingUp, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: "Breaking News", path: "/breaking-news" },
    { name: "Jobs", path: "/jobs" },
    { name: "Tourism", path: "/tourism" },
    { name: "Services", path: "/services" }
  ];

  // Keyframes wahi rahengi
  const keyframes = `
    @keyframes marquee {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
    }
  `;

  return (
    /* Header ko wrap karne wala div jo space lega */
    <div className="h-[105px] md:h-[115px]"> 
      <header className="w-full shadow-lg fixed top-0 left-0 z-50 font-sans bg-white">
        <style>{keyframes}</style>
        
        {/* --- TOP BAR (Marquee) --- */}
        <div className="bg-red-600 text-white py-1.5 overflow-hidden flex items-center">
          <div className="bg-red-700 px-4 py-1 flex items-center gap-2 font-bold uppercase text-[10px] md:text-xs italic z-10 shadow-md shrink-0">
            <TrendingUp size={14} /> Breaking
          </div>
          <div className="whitespace-nowrap flex items-center text-sm font-medium w-full">
            <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 25s linear infinite' }}>
              <span className="mx-8 font-bold">Himachal Weather Update: Heavy rain alert in Mandi...</span>
              <span className="mx-8">|</span>
              <span className="mx-8 font-bold">HP Board Exam Results soon...</span>
            </div>
          </div>
        </div>

        {/* --- MAIN NAVIGATION --- */}
        <div className="bg-white border-b-4 border-blue-800 px-4 md:px-8 py-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* LOGO */}
            <Link to="/" className="flex flex-col group">
              <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-blue-900 leading-none">
                HP<span className="text-red-600 uppercase">Today</span>
              </h1>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
                Himachal Ki Awaaz
              </p>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-6 text-blue-900 font-bold uppercase text-xs">
              {categories.map((item, index) => (
                <Link key={index} to={item.path} className="hover:text-red-600 transition-all border-b-2 border-transparent hover:border-red-600">
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/search" className="p-2 text-blue-900 hover:bg-gray-100 rounded-full transition">
                <Search size={20} />
              </Link>
              
              <Link to="/admin-login" className="p-1.5 md:p-2 text-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition shadow-sm">
                <User size={18} strokeWidth={2.5} />
              </Link>
              
              <button className="lg:hidden p-1 text-blue-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE SIDEBAR --- */}
        {/* ... (Sidebar code same rahega) ... */}
      </header>
    </div>
  );
};

export default Header;