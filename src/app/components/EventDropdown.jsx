"use client";
export default function EventDropdown({ onSelect }) {
  return (
    <div>
      <label className="block text-gray-700 mb-2">Event Type</label>
      <select className="w-full p-2 border rounded" onChange={(e) => onSelect(e.target.value)} defaultValue="casual">
        <option value="casual">Casual</option>
        <option value="party">Party</option>
        <option value="office">Office</option>
        <option value="date">Date</option>
        <option value="formal">Formal</option>
      </select>
    </div>
  );
}
