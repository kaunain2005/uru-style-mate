"use client";
import { useState, useEffect } from "react";
import ImageUploader from "./components/ImageUploader";
import BodyTypeDropdown from "./components/BodyTypeDropdown";
import EventDropdown from "./components/EventDropdown";
import SuggestionCard from "./components/SuggestionCard";
import SavedOutfits from "./components/SavedOutfits";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detectedColor, setDetectedColor] = useState(null);
  const [bodyType, setBodyType] = useState("");
  const [eventType, setEventType] = useState("casual");
  const [suggestionsPayload, setSuggestionsPayload] = useState(null);
  const [theme, setTheme] = useState('light');
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => console.log('SW registration failed:', err));
    }
    // restore theme
    const t = localStorage.getItem('theme') || 'light';
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    setTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSuggest = async () => {
    if (!selectedImage || !detectedColor || !bodyType) {
      alert('Please upload an image, pick a body type, and (optionally) event');
      return;
    }
    // AI-simulation: show thinking animation
    setThinking(true);
    setSuggestionsPayload(null);
    setTimeout(async () => {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          color: detectedColor,
          clothingType: 'shirt',
          bodyType,
          eventType,
        }),
      });
      const data = await res.json();
      setSuggestionsPayload({ ...data, image: imagePreview, color: detectedColor, bodyType, eventType });
      setThinking(false);
    }, 1000 + Math.random()*1200); // simulate variable thinking time
  };

  const handleSave = () => {
    if (!suggestionsPayload) {
      alert('No suggestion to save yet.');
      return;
    }
    const saved = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
    saved.unshift(suggestionsPayload);
    localStorage.setItem('savedOutfits', JSON.stringify(saved));
    alert('✅ Outfit suggestions saved locally');
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">👕 URU StyleMate</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="px-3 py-1 border rounded">{theme==='dark' ? '🌙 Dark' : '☀️ Light'}</button>
          </div>
        </div>

        <p className="mb-4 text-gray-600">Upload an item, select body type and event — URU StyleMate suggests outfits with ratings and how-to-wear tips. Save favorites locally. Works offline as a PWA.</p>

        <div className="bg-card shadow-md rounded-xl p-6">
          <ImageUploader onImageSelect={handleImageSelect} onColorDetect={setDetectedColor} />

          {detectedColor && (
            <div className="mt-3 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: detectedColor }} />
              <div>
                <div className="text-sm text-gray-700">{detectedColor}</div>
                <div className="text-xs text-gray-500">Detected dominant color</div>
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <BodyTypeDropdown onSelect={setBodyType} />
            <EventDropdown onSelect={setEventType} />
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={handleSuggest} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">{thinking ? 'Thinking...' : 'Suggest Outfits'}</button>
            <button onClick={handleSave} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">💾 Save Suggestions</button>
          </div>

          {thinking && <div className="mt-4 text-sm text-gray-500">🤖 URU StyleMate is analyzing your item...</div>}

          {suggestionsPayload && <SuggestionCard suggestion={suggestionsPayload} />}
        </div>

        <div className="mt-6">
          <SavedOutfits />
        </div>
      </div>
    </main>
  );
}
