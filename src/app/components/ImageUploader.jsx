"use client";
import { useState, useRef } from "react";
import ColorThief from "color-thief-browser";

export default function ImageUploader({ onImageSelect, onColorDetect }) {
  const [preview, setPreview] = useState(null);
  const imgRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageSelect(file);
  };

  const handleImageLoad = async () => {
    if (!imgRef.current) return;
    try {
      const ct = new ColorThief();
      const rgb = await ct.getColor(imgRef.current);
      const rgbStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      onColorDetect(rgbStr);
    } catch (err) {
      console.log("Color detection failed:", err);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Upload Clothing Image</label>
      <input type="file" accept="image/*" onChange={handleFile} className="w-full p-2 border rounded" />
      {preview && (
        <div className="mt-3 flex flex-col items-center">
          <img ref={imgRef} src={preview} alt="preview" onLoad={handleImageLoad} className="rounded-lg max-h-64 object-contain" />
        </div>
      )}
    </div>
  );
}
