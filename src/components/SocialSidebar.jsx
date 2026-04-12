import React from 'react';
import { useLocation } from 'react-router-dom'; // URL check karne ke liye

const SocialSidebar = () => {
  const location = useLocation();

  // Jin pages par sidebar NAHI dikhani unke paths yahan likhein
  const hiddenPaths = ['/admin-login', '/dashboard', '/admin-panel'];

  // Agar current path hiddenPaths mein se koi ek hai, toh kuch bhi render mat karo
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  const socials = [
    { 
      name: "Facebook", 
      icon: "/facebook.png", 
      href: "https://www.facebook.com/share/1EGnsMgMuG/",
      color: "hover:bg-blue-600" 
    },
    { 
      name: "Instagram", 
      icon: "/instagram.png", 
      href: "https://www.instagram.com/hp.today?igsh=dGt1cGRteDVmczk3",
      color: "hover:bg-pink-600" 
    },
    { 
      name: "YouTube", 
      icon: "/youtube.png", 
      href: "https://youtube.com/@hp_today?si=D_MHsh_6ljNw47rU",
      color: "hover:bg-red-600" 
    },
    { 
      name: "Threads", 
      icon: "/threads.png", 
      href: "https://www.threads.net/@hp.today",
      color: "hover:bg-black" 
    }
  ];

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-[60] flex-col gap-2 p-3">
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center bg-white shadow-2xl rounded-full p-3 transition-all duration-300 hover:pl-6 ${social.color} hover:text-white border border-slate-100`}
          >
            <img 
              src={social.icon} 
              alt={social.name} 
              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" 
            />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold text-sm whitespace-nowrap">
              {social.name}
            </span>
          </a>
        ))}
      </div>

      {/* --- MOBILE FLOATING BAR --- */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-[320px]">
        <div className="bg-slate-900/90 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-2 flex justify-around items-center">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <img 
                src={social.icon} 
                alt={social.name} 
                className="w-7 h-7 object-contain active:scale-90 transition-transform" 
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialSidebar;