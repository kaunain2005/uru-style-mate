"use client";
export default function BodyTypeDropdown({ onSelect }) {
  return (
    <div>
      <label className="block text-gray-700 mb-2">Body Type</label>
      <select className="w-full p-2 border rounded" onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="ectomorph">Ectomorph</option>
        <option value="mesomorph">Mesomorph</option>
        <option value="endomorph">Endomorph</option>
      </select>
    </div>
  );
}
