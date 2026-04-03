import React from 'react';
import * as Icons from 'lucide-react'; // Saare icons ek saath bula liye

const Footer = () => {
  // Safe Icon Check: Agar Facebook nahi milta toh User icon dikha dega (crash nahi hoga)
  const Facebook = Icons.Facebook || Icons.FacebookIcon || Icons.User;
  const Instagram = Icons.Instagram || Icons.InstagramIcon || Icons.User;
  const Youtube = Icons.Youtube || Icons.YoutubeIcon || Icons.User;
  const { Mail, Phone, MapPin, Send } = Icons;

  return (
    <footer className="bg-blue-950 text-white pt-12 pb-6 px-4 md:px-8 border-t-8 border-red-600 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-black mb-4 tracking-tighter">
            HP<span className="text-red-500">TODAY</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Himachal Pradesh ka apna digital news channel. Mandi aur Sundernagar ki har khabar ab aapki mutthi mein.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-blue-600 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-pink-600 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-red-600 transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-red-500 uppercase text-xs tracking-widest">Khabrein</h3>
          <ul className="text-gray-300 space-y-2 text-sm font-medium">
            <li className="hover:text-white cursor-pointer transition">Himachal News</li>
            <li className="hover:text-white cursor-pointer transition">Government Jobs</li>
            <li className="hover:text-white cursor-pointer transition">Mandi Special</li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-red-500 uppercase text-xs tracking-widest">Sampark</h3>
          <ul className="text-gray-300 space-y-3 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /> Mandi, HP</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-red-500" /> +91-XXXXX-XXXXX</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-red-500 uppercase text-xs tracking-widest">Update Rahe</h3>
          <div className="flex bg-white/10 rounded overflow-hidden p-1 border border-white/20">
            <input type="text" placeholder="Email..." className="bg-transparent px-3 py-2 text-sm focus:outline-none w-full" />
            <button className="bg-red-600 p-2 rounded hover:bg-red-700 transition">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 text-center text-[10px] text-gray-500 uppercase tracking-widest">
        <p>© 2026 HP TODAY. ALL RIGHTS RESERVED. | POWERED BY <span className="text-white">HPTWEBSTUDIO</span></p>
      </div>
    </footer>
  );
};

export default Footer;