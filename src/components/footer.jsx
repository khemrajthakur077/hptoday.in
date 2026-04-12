import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // State for Email Input
  const [email, setEmail] = useState("");

  // WhatsApp Redirect Function
  const handleWhatsAppSend = () => {
    if (!email) {
      alert("Kripya email address bharein.");
      return;
    }
    const phoneNumber = "918580881886";
    const message = `New Suggestion/Lead : ${email}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Safe Icon Check
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
  </ul>

  {/* ✅ Added Pages Links */}
  {/* ✅ Updated with React Router Links */}
<h3 className="text-lg font-bold mt-6 mb-4 text-red-500 uppercase text-xs tracking-widest">Important Links</h3>
<ul className="text-gray-300 space-y-2 text-sm font-medium">
  <li>
    <Link 
      to="/privacy-policy" 
      className="hover:text-white transition-all duration-200 hover:underline"
    >
      Privacy Policy
    </Link>
  </li>
  <li>
    <Link 
      to="/terms-conditions" 
      className="hover:text-white transition-all duration-200 hover:underline"
    >
      Terms & Conditions
    </Link>
  </li>
  <li>
    <Link 
      to="/about" 
      className="hover:text-white transition-all duration-200 hover:underline"
    >
      About Us
    </Link>
  </li>
  <li>
    <Link 
      to="/contact" 
      className="hover:text-white transition-all duration-200 hover:underline"
    >
      Contact Us
    </Link>
  </li>
</ul>
</div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-red-500 uppercase text-xs tracking-widest">Sampark</h3>
          <ul className="text-gray-300 space-y-3 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-red-500" />Sundernagar, Mandi, HP</li>
            <li className="flex items-center gap-2">
              <a href="tel:+918580881886" className="flex items-center gap-2 hover:text-white transition">
                <Phone size={16} className="text-red-500" /> +91-85808-81886
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter (Updated Section) */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-red-500 uppercase text-xs tracking-widest">Suggestion/Lead</h3>
          <div className="flex bg-white/10 rounded overflow-hidden p-1 border border-white/20">
            <input 
              type="text" 
              placeholder="Enter Suggestion" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-3 py-2 text-sm focus:outline-none w-full text-white" 
            />
            <button 
              onClick={handleWhatsAppSend}
              className="bg-red-600 p-2 rounded hover:bg-red-700 transition flex items-center justify-center"
            >
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