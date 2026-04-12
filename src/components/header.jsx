import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: "Breaking News", path: "/breaking-news" },
    { name: "Jobs", path: "/jobs" },
    { name: "Tourism", path: "/tourism" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <div className="h-[70px] md:h-[85px]"> 
      <header className="w-full shadow-lg fixed top-0 left-0 z-50 font-sans bg-white">
        
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
              <Link to="/admin-login" className="p-1.5 md:p-2 text-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition shadow-sm">
                <User size={18} strokeWidth={2.5} />
              </Link>
              
              {/* MOBILE TOGGLE BUTTON - Color Change Logic Added Here */}
              <button 
                className={`lg:hidden p-1 z-50 transition-colors duration-300 ${
                  isMenuOpen ? 'text-white' : 'text-blue-900'
                }`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE SIDEBAR --- */}
        <div className={`fixed inset-0 bg-blue-950/95 z-40 lg:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {categories.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className="text-white text-2xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <Link 
              to="/admin-login" 
              className="mt-4 px-8 py-3 bg-red-600 text-white font-black rounded-full uppercase text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;