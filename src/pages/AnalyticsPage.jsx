import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const AnalyticsPage = () => {
  const [total, setTotal] = useState(0);
  const [countryData, setCountryData] = useState([]);
  const [sourceData, setSourceData] = useState([]);

  const fetchData = async () => {
    const { count } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true });

    setTotal(count || 0);

    const { data } = await supabase.from("visitors").select("*");

    if (data) {
      const countryMap = {};
      const sourceMap = {};

      data.forEach((item) => {
        const country = item.country || "Unknown";
        const source = item.source || "direct";

        countryMap[country] = (countryMap[country] || 0) + 1;
        sourceMap[source] = (sourceMap[source] || 0) + 1;
      });

      setCountryData(
        Object.entries(countryMap).map(([name, value]) => ({
          name,
          value
        }))
      );

      setSourceData(
        Object.entries(sourceMap).map(([name, value]) => ({
          name,
          value
        }))
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, []);

  const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b"];

  return (
    <div className="space-y-8">

      {/* Header + Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">
          📊 Analytics Dashboard
        </h1>

        {/* ✅ Google Analytics Button */}
        <a 
          href="https://analytics.google.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Google Analytics
        </a>
      </div>

      {/* Total */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-gray-500">Total Visitors</h2>
        <p className="text-4xl font-bold text-blue-600">{total}</p>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Country Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-bold">🌍 Visitors by Country</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Source Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-bold">🔗 Traffic Sources</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={sourceData} dataKey="value" nameKey="name" outerRadius={100}>
                {sourceData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsPage;