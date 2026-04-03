import React, { useState } from 'react';
import { Home, MapPin, Phone, IndianRupee, Users, CheckCircle2, Search } from 'lucide-react';

const RentalServices = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const rooms = [
    {
      id: 1,
      title: "Premium 1BHK for Students",
      location: "Near Govt ITI, Sundernagar",
      rent: "4500",
      type: "Single/Double",
      amenities: ["Wi-Fi", "Parking", "24/7 Water"],
      contact: "98765-XXXXX",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Spacious Double Bed Room",
      location: "Bhojpur Bazar, Sundernagar",
      rent: "6000",
      type: "Family/Working",
      amenities: ["Attached Kitchen", "Main Road Access"],
      contact: "94180-XXXXX",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Budget Friendly PG",
      location: "Near MLSM College, Sundernagar",
      rent: "3500",
      type: "Students Only",
      amenities: ["Food Included", "Bed & Almirah"],
      contact: "82190-XXXXX",
      image: "https://images.unsplash.com/photo-1555854817-40e09806a493?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredRooms = rooms.filter(room => 
    room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-blue-950 uppercase tracking-tighter italic">
          Sundernagar <span className="text-red-600">Rentals</span>
        </h1>
        <p className="text-gray-500 font-bold mt-2 uppercase text-xs tracking-[0.3em]">
          Best Rooms & PGs at Zero Brokerage
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by location (e.g. ITI, College)..."
            className="w-full pl-14 pr-6 py-5 rounded-full shadow-lg border-none outline-none font-bold text-blue-900 placeholder:text-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- RENTAL LISTINGS --- */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col group">
            
            {/* Image & Price Tag */}
            <div className="relative h-60 overflow-hidden">
              <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-5 left-5 bg-blue-950 text-white px-4 py-2 rounded-2xl font-black text-sm shadow-xl flex items-center gap-1">
                <IndianRupee size={14} /> {room.rent}<span className="text-[10px] font-normal text-blue-200">/month</span>
              </div>
            </div>

            {/* Room Details */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-red-600 mb-2 font-black text-[10px] uppercase tracking-widest">
                <MapPin size={14}/> {room.location}
              </div>
              <h3 className="text-xl font-black text-blue-950 mb-4">{room.title}</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-gray-500 font-bold text-xs">
                  <Users size={14} className="text-blue-900" /> {room.type}
                </div>
              </div>

              {/* Amenities Tags */}
              <div className="flex flex-wrap gap-2 mb-8 flex-1">
                {room.amenities.map((item, index) => (
                  <span key={index} className="bg-green-50 text-green-700 text-[9px] font-black px-3 py-1.5 rounded-lg border border-green-100 flex items-center gap-1 uppercase">
                    <CheckCircle2 size={10} /> {item}
                  </span>
                ))}
              </div>

              {/* Contact Button */}
              <a 
                href={`tel:${room.contact}`}
                className="w-full bg-blue-950 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
              >
                <Phone size={16} /> Contact Owner
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* --- ADD YOUR LISTING SECTION --- */}
      <div className="max-w-4xl mx-auto mt-24 px-4">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Kya aapka bhi room khali hai?</h2>
            <p className="font-bold text-red-100 mt-2">Apni room detail Sundernagar Hub par bilkul FREE mein daalein!</p>
          </div>
          <button className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition shadow-xl">
            Register Room
          </button>
        </div>
      </div>

    </div>
  );
};

export default RentalServices;