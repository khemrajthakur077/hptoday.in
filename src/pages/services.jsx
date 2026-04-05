import React, { useState, useEffect } from 'react';
import { MapPin, Phone, IndianRupee, Users, CheckCircle2, Search } from 'lucide-react';
import { supabase } from '../supabaseClient';

const RentalServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);

  // 🔄 Fetch data from Supabase
  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*");

    if (error) {
      console.log("Error:", error);
    } else {
      setRooms(data);
    }
  };

  useEffect(() => {
    const loadRooms = async () => {
      await fetchRooms();
    };
    loadRooms();
  }, []);

  // ⚡ Realtime update
  useEffect(() => {
    const channel = supabase
      .channel('realtime-rooms')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms' },
        () => {
          fetchRooms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 🔍 Search filter
  const filteredRooms = rooms.filter(room =>
    room.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-blue-950 uppercase tracking-tighter italic">
          Sundernagar <span className="text-red-600">Rentals</span>
        </h1>

        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by location..."
            className="w-full pl-14 pr-6 py-5 rounded-full shadow-lg font-bold"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="relative h-60">
              <img src={room.image} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-xl flex items-center">
                <IndianRupee size={14}/> {room.rent}
              </div>
            </div>

            <div className="p-6">
              <p className="text-red-500 text-xs flex items-center">
                <MapPin size={12}/> {room.location}
              </p>

              <h3 className="text-xl font-bold">{room.title}</h3>

              <div className="flex items-center text-gray-500 text-sm mt-2">
                <Users size={14}/> {room.type}
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mt-4">
                {room.amenities?.map((item, i) => (
                  <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    <CheckCircle2 size={10}/> {item}
                  </span>
                ))}
              </div>

              {/* Contact */}
              <a 
                href={`tel:${room.contact}`}
                className="block mt-6 bg-blue-900 text-white py-2 rounded-lg text-center"
              >
                <Phone size={14}/> Contact
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RentalServices;