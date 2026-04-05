import React, { useState } from 'react';
import { MapPin, Navigation, Camera, Sun, Wind, ArrowRight, Star, Heart, Filter, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const TourismPage = () => {
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

  const filteredPlaces = activeFilter === "All"
    ? destinations
    : destinations.filter(dest => dest.tag === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 font-sans">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1570119842672-005187768564?q=80&w=2000&auto=format&fit=crop"
            alt="Himachal Mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Compass className="text-white mr-2" size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Himachal <span className="text-emerald-400">Darshan</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light mb-6 leading-relaxed px-2">
            Discover the divine beauty of Dev Bhoomi through our curated collection of sacred sites and natural wonders
          </p>
          <div className="flex flex-col gap-3 px-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[48px]">
              Start Exploring
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 min-h-[48px]">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="text-white rotate-90" size={24} />
        </div>
      </section>

      {/* Filter Section - Mobile First */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Explore Destinations</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Filter through our collection of sacred temples, serene lakes, and adventure spots across Himachal Pradesh
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
            {["All", "Mandi Special", "Shaktipeeth", "Adventure"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 min-h-[40px] sm:min-h-[44px] ${
                  activeFilter === cat
                    ? "bg-emerald-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredPlaces.map((place) => (
              <div key={place.id} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                    <Heart size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                      {place.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center text-white">
                      <Star size={14} className="sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-semibold text-sm sm:text-base">{place.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin size={14} className="sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm font-medium">{place.location}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                    {place.name}
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {place.desc}
                  </p>
                  <button className="w-full bg-gray-900 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-300 text-sm sm:text-base min-h-[44px]">
                    Explore Destination
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <p className="text-gray-500 text-lg sm:text-xl font-medium px-4">No destinations found for this category. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Share Your Hidden Gems with HP Today
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2">
            Do you know of a secret temple or breathtaking viewpoint? Send us your photos and stories to showcase the beauty of Himachal Pradesh.
          </p>
          <button className="bg-white text-emerald-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg min-h-[48px]">
            Contact Us on WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};

export default TourismPage;