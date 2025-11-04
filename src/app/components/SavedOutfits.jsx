"use client";
import { useEffect, useState } from "react";

export default function SavedOutfits() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("savedOutfits");
    if (data) setSaved(JSON.parse(data));
  }, []);

  const handleDelete = (index) => {
    const updated = saved.filter((_, i) => i !== index);
    setSaved(updated);
    localStorage.setItem("savedOutfits", JSON.stringify(updated));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(saved, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uru_stylemate_saved_outfits.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!saved || saved.length === 0) {
    return <div className="mt-6 text-center text-gray-500">No saved outfits yet.</div>;
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-700">💾 Saved Outfits</h2>
        <button onClick={handleExport} className="text-sm text-blue-600">Export JSON</button>
      </div>

      <div className="grid gap-4">
        {saved.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-3">
            <div className="flex gap-3 items-center">
              <img src={item.image} alt="saved" className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">Event: <strong>{item.eventType}</strong></div>
                <div className="text-sm text-gray-600">Body: <strong>{item.bodyType}</strong></div>
                <div className="text-sm text-gray-700 mt-1">Suggestions: {item.suggestions.map(s => s.outfit).slice(0,2).join(" • ")}</div>
              </div>
              <div>
                <button onClick={() => handleDelete(index)} className="text-red-500 text-sm">Delete ✖</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
