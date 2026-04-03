import React, { useState } from 'react'; // useState add kiya filter ke liye
import { MapPin, Navigation, Camera, Sun, Wind, ArrowRight, Star, Heart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const TourismPage = () => {
  // Filter state
  const [activeFilter, setActiveFilter] = useState("All");

  const destinations = [
    // --- MANDI REGION ---
    { id: 1, name: "Baba Bhootnath Mandir", location: "Mandi Town", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800", tag: "Mandi Special", rating: "5.0", desc: "Chhoti Kashi ka dil aur sabse purana Shiv mandir." },
    { id: 2, name: "Prashar Lake", location: "Mandi", image: "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?auto=format&fit=crop&q=80&w=800", tag: "Adventure", rating: "4.9", desc: "Tairta hua dweep aur Rishi Prashar ka pagoda mandir." },
    { id: 3, name: "Rewalsar Lake", location: "Mandi", image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&q=80&w=800", tag: "Mandi Special", rating: "4.8", desc: "Budhist Monasteries, Gurudwara aur Hindu mandiron ka sangam." },
    { id: 4, name: "Shikari Devi", location: "Thunag, Mandi", image: "https://images.unsplash.com/photo-1621518177587-f823a31189d2?auto=format&fit=crop&q=80&w=800", tag: "Mandi Special", rating: "5.0", desc: "Chat-rahit mandir jahan barf kabhi murti par nahi tikti." },
    
    // --- SHAKTIPEETHS ---
    { id: 12, name: "Jwalamukhi Mandir", location: "Kangra", image: "https://images.unsplash.com/photo-1624571409412-1f22055ccc12?auto=format&fit=crop&q=80&w=800", tag: "Shaktipeeth", rating: "5.0", desc: "Dharti se nikalti akhand jyoti jo sadiyon se jal rahi hai." },
    { id: 13, name: "Bajreshwari Devi", location: "Kangra Town", image: "https://images.unsplash.com/photo-1624571409412-1f22055ccc12?auto=format&fit=crop&q=80&w=800", tag: "Shaktipeeth", rating: "4.9", desc: "Kangra ka vishal aur pavitra shakti dham." },
    { id: 14, name: "Baglamukhi Mandir", location: "Bankhandi", image: "https://images.unsplash.com/photo-1624571409412-1f22055ccc12?auto=format&fit=crop&q=80&w=800", tag: "Shaktipeeth", rating: "5.0", desc: "Peeli rang ki shakti, jahan mannat puri hoti hai." },

    // --- OTHER FAMOUS PLACES ---
    { id: 7, name: "Hadimba Devi", location: "Manali", image: "https://images.unsplash.com/photo-1605649516282-4c540aa65440?auto=format&fit=crop&q=80&w=800", tag: "Adventure", rating: "4.8", desc: "Dhungri Van Vihar ke beech lakdi ka adbhut mandir." },
    { id: 15, name: "Key Monastery", location: "Spiti", image: "https://images.unsplash.com/photo-1581793745862-99f575440278?auto=format&fit=crop&q=80&w=800", tag: "Adventure", rating: "5.0", desc: "Pahadi ki choti par sthit duniya ki sabse sundar monastery." },
    { id: 16, name: "Khajjiar", location: "Chamba", image: "https://images.unsplash.com/photo-1610448721566-47369c768e70?auto=format&fit=crop&q=80&w=800", tag: "Adventure", rating: "4.8", desc: "Himachal ka Mini-Switzerland." }
  ];

  // Filter Logic
  const filteredPlaces = activeFilter === "All" 
    ? destinations 
    : destinations.filter(dest => dest.tag === activeFilter);

  return (
    // pt-24 ya pt-32 add kiya hai header fix karne ke liye
    <div className="bg-slate-50 min-h-screen pb-20 font-sans  ">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden mx-4 md:mx-8 rounded-[3rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1570119842672-005187768564?q=80&w=2000&auto=format&fit=crop" 
            alt="Himachal Mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic drop-shadow-2xl">
            Himachal <span className="text-yellow-400">Darshan</span>
          </h1>
          <p className="text-white mt-4 font-bold text-sm md:text-lg bg-red-600 px-6 py-2 rounded-full inline-block shadow-lg">
            Dev Bhoomi ke har kone ki digital yatra
          </p>
        </div>
      </div>

      {/* --- FILTER & EXPLORE SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 relative z-20">
        
        {/* Modern Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 bg-white p-4 rounded-[2.5rem] shadow-xl border border-gray-100 gap-6">
          <div className="flex items-center gap-3 pl-4">
            <Filter size={20} className="text-red-600" />
            <h2 className="text-xl font-black text-blue-950 uppercase tracking-tighter">Explore By</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {["All", "Mandi Special", "Shaktipeeth", "Adventure"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                  activeFilter === cat 
                  ? "bg-blue-950 text-white scale-110 shadow-blue-900/20" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Places */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-blue-100 flex flex-col">
              {/* Image Box */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-colors">
                  <Heart size={18} />
                </div>
                <div className="absolute bottom-5 left-5">
                  <span className="bg-yellow-400 text-blue-950 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {place.tag}
                  </span>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 mb-2 font-bold text-[10px] uppercase tracking-widest">
                  <MapPin size={14} className="text-red-600"/> {place.location}
                </div>
                <h3 className="text-2xl font-black text-blue-950 mb-3 group-hover:text-red-600 transition-colors">
                  {place.name}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 italic flex-1">
                  "{place.desc}"
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                   <div className="flex items-center gap-1 font-black text-blue-950">
                      <Star size={16} className="text-yellow-500 fill-yellow-500"/>
                      <span>{place.rating}</span>
                   </div>
                   <button className="bg-blue-950 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition shadow-lg">
                     Explore
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if no places found */}
        {filteredPlaces.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-inner">
            <p className="text-gray-400 font-black uppercase italic tracking-widest text-xl">Nayi jagah jald hi add hogi!</p>
          </div>
        )}

      </div>

      {/* --- FOOTER CTA --- */}
      <div className="mt-32 mx-4 md:mx-8 bg-gradient-to-br from-blue-950 to-indigo-900 py-20 px-4 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/40">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
          <h2 className="text-3xl md:text-6xl font-black uppercase mb-6 tracking-tighter leading-tight relative z-10">
            Apne Gaon Ki Kahani <br/> <span className="text-yellow-400 italic">HP Today</span> Par Dikhaein!
          </h2>
          <p className="text-blue-200 font-bold mb-10 max-w-2xl mx-auto text-sm md:text-lg relative z-10">
            Kya aapke pas bhi kisi gupt mandir ya sundar lake ki photo aur jaankari hai? Humein bhejien aur poore Himachal ko dikhayein.
          </p>
          <button className="bg-red-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all shadow-xl relative z-10">
            WhatsApp Now
          </button>
      </div>
    </div>
  );
};

export default TourismPage;