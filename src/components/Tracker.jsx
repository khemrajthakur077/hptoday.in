import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Tracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const hasTracked = sessionStorage.getItem("tracked");
        if (hasTracked) return;

        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        await supabase.from("visitors").insert([{
          country: data.country_name || "Unknown",
          source: document.referrer || "direct"
        }]);

        sessionStorage.setItem("tracked", "true");

      } catch (err) {
        console.log("Tracking error:", err);
      }
    };

    trackVisitor();
  }, []);

  return null;
};

export default Tracker;