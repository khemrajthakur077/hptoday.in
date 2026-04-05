import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    title: "",
    location: "",
    rent: "",
    type: "",
    amenities: "",
    contact: "",
    image: ""
  });

  // 🔄 Fetch rooms
  const fetchRooms = async () => {
    const { data } = await supabase.from("rooms").select("*");
    setRooms(data || []);
  };

  useEffect(() => {
    const loadRooms = async () => {
      await fetchRooms();
    };
    loadRooms();
  }, []);

  // ➕ Add Room
  const handleAdd = async () => {
    await supabase.from("rooms").insert([
      {
        ...form,
        amenities: form.amenities.split(",")
      }
    ]);

    setForm({
      title: "",
      location: "",
      rent: "",
      type: "",
      amenities: "",
      contact: "",
      image: ""
    });

    fetchRooms();
  };

  // ❌ Delete Room
  const handleDelete = async (id) => {
    await supabase.from("rooms").delete().eq("id", id);
    fetchRooms();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Rooms (Admin)
      </h1>

      {/* ➕ ADD FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Room</h2>

        <input placeholder="Title" value={form.title}
          onChange={(e)=>setForm({...form, title:e.target.value})}
          className="w-full mb-2 p-2 border rounded" />

        <input placeholder="Location" value={form.location}
          onChange={(e)=>setForm({...form, location:e.target.value})}
          className="w-full mb-2 p-2 border rounded" />

        <input placeholder="Rent" value={form.rent}
          onChange={(e)=>setForm({...form, rent:e.target.value})}
          className="w-full mb-2 p-2 border rounded" />

        <input placeholder="Type" value={form.type}
          onChange={(e)=>setForm({...form, type:e.target.value})}
          className="w-full mb-2 p-2 border rounded" />

        <input placeholder="Amenities (comma separated)"
          value={form.amenities}
          onChange={(e)=>setForm({...form, amenities:e.target.value})}
          className="w-full mb-2 p-2 border rounded" />

        <input placeholder="Contact"
          value={form.contact}
          onChange={(e)=>setForm({...form, contact:e.target.value})}
          className="w-full mb-2 p-2 border rounded" />

        <input placeholder="Image URL"
          value={form.image}
          onChange={(e)=>setForm({...form, image:e.target.value})}
          className="w-full mb-4 p-2 border rounded" />

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Add Room
        </button>
      </div>

      {/* 📋 ROOM LIST */}
      <div className="max-w-4xl mx-auto">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white p-4 mb-4 rounded shadow flex justify-between items-center">

            <div>
              <h3 className="font-bold">{room.title}</h3>
              <p className="text-sm text-gray-500">{room.location}</p>
              <p className="text-sm">₹ {room.rent}</p>
            </div>

            <button
              onClick={() => handleDelete(room.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ManageRooms;