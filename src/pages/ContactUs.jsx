import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const ContactUs = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_3dus4gx', 
      'template_qz1idxm', 
      form.current, 
      'gjsOWhdEdkUa0cThx'
    )
    .then(() => {
        setLoading(false);
        setShowSuccess(true);
        form.current.reset();
        setTimeout(() => setShowSuccess(false), 5000);
    })
    .catch((err) => {
        console.error("Submission Error:", err);
        setLoading(false);
        alert("Oops! Kuch error aaya. Please dobara try karein.");
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-20 rounded-[2rem] shadow-2xl relative overflow-hidden px-6 border-b-4 border-blue-500">
          <div className="absolute inset-0 opacity-10 select-none">
            <div className="absolute transform -rotate-12 -left-10 top-10 text-9xl font-black uppercase tracking-tighter">HP Today</div>
          </div>
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold mb-6 uppercase tracking-widest">
              Himachal's Reliable News Network
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Contact <span className="text-blue-400">Our Team</span>
            </h1>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Have a scoop, feedback, or inquiry? HP Today values your voice.
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          
          {/* Left Column: Contact Info & Socials */}
          <div className="space-y-10">
            <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-slate-100 relative group overflow-hidden">
              <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center tracking-tight uppercase">
                  <span className="w-2 h-8 bg-blue-600 rounded-full mr-4"></span>
                  Grievance & Editorial
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center p-5 bg-slate-50/50 rounded-2xl group-hover:bg-white transition-all shadow-sm">
                    <BriefcaseIcon className="w-10 h-10 text-blue-600 mr-5" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-xl tracking-tight">Khemraj Thakur (Raj Thakur)</h3>
                      <p className="text-slate-600 font-medium italic text-sm">Founder, Editor & Grievance Officer</p>
                    </div>
                  </div>
                  <div className="flex items-center p-5 bg-slate-50/50 rounded-2xl group-hover:bg-white transition-all shadow-sm">
                    <MapPinIcon className="w-10 h-10 text-orange-500 mr-5" />
                    <span className="text-lg font-bold text-slate-700">Sundernagar, Mandi, Himachal Pradesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-slate-900 text-white rounded-[2rem] p-10 border border-slate-700 shadow-2xl">
              <h3 className="text-3xl font-extrabold mb-8 tracking-tight flex items-center uppercase text-slate-100">
                <span className="w-2 h-8 bg-white rounded-full mr-4"></span>
                Follow the Buzz
              </h3>
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
                    className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <img src={social.img} alt={social.label} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                    <span className="ml-3 font-bold text-base group-hover:text-blue-400">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with EmailJS */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] p-10 lg:p-14 border border-slate-100 ring-1 ring-slate-200/50 relative">
            
            {showSuccess && (
              <div className="absolute inset-0 z-50 bg-white/95 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-300">
                <CheckCircleIcon className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
                <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase">Submit Done!</h2>
                <p className="text-xl text-slate-600 font-medium">Aapka scoop humein mil gaya hai. Shukriya!</p>
                <button onClick={() => setShowSuccess(false)} className="mt-8 text-blue-600 font-bold uppercase tracking-widest text-sm hover:underline">Naya message bhejein</button>
              </div>
            )}

            <h2 className="text-3xl font-extrabold text-slate-900 mb-10 tracking-tight flex items-center uppercase">
              <span className="w-2 h-8 bg-green-500 rounded-full mr-4"></span>
              Send News Scoop
            </h2>
            
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 font-sans">Full Name</label>
                  <input required name="from_name" type="text" className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all text-lg font-medium" placeholder="आपका नाम" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 font-sans">Email</label>
                  <input required name="from_email" type="email" className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all text-lg font-medium" placeholder="name@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 font-sans">Subject</label>
                <input required name="subject" type="text" className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all text-lg font-medium" placeholder="खबर का विषय" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 font-sans">Message</label>
                <textarea required name="message" rows={5} className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all text-lg font-medium" placeholder="Write your news story here..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-2xl font-black text-xl shadow-lg transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-blue-200 hover:-translate-y-1 uppercase'}`}
              >
                {loading ? (
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'SUBMIT SCOOP'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-20 border-t-2 border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-widest italic">Direct Line</h3>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="mailto:hptoday16@gmail.com" className="group flex items-center px-10 py-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-slate-100 border-b-4 border-b-green-500">
              <div className="p-3 bg-green-50 rounded-xl mr-5 group-hover:bg-green-500 transition-colors">
                <EnvelopeIcon className="w-8 h-8 text-green-600 group-hover:text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Email Us</p>
                <p className="text-xl font-bold text-slate-900">hptoday16@gmail.com</p>
              </div>
            </a>
            
            <a href="tel:+918580881886" className="group flex items-center px-10 py-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-slate-100 border-b-4 border-b-blue-500">
              <div className="p-3 bg-blue-50 rounded-xl mr-5 group-hover:bg-blue-500 transition-colors">
                <PhoneIcon className="w-8 h-8 text-blue-600 group-hover:text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Call Now</p>
                <p className="text-xl font-bold text-slate-900">+91 85808 81886</p>
              </div>
            </a>
          </div>
          <p className="mt-16 text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
            📍 Sundernagar, Mandi, HP | © {new Date().getFullYear()} HP Today Network
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;