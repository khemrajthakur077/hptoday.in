import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, LogIn, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Login successful, Dashboard par bhejein
      navigate('/admin-dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top Branding */}
        <div className="bg-blue-900 p-10 text-center text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">
            HP<span className="text-red-500">Today</span>
          </h2>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mt-2">Admin Portal</p>
        </div>

        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-black text-blue-950 mb-2">Welcome Back!</h3>
          <p className="text-gray-500 text-sm font-medium mb-8">Apne credentials enter karein portal access karne ke liye.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-700 text-xs font-bold flex items-center gap-2 rounded-r-lg animate-shake">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@hptoday.in"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-2xl outline-none transition-all font-bold text-blue-950 text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-2xl outline-none transition-all font-bold text-blue-950 text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Login to Dashboard"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-400 hover:text-blue-900 text-[10px] font-black uppercase tracking-widest transition">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;