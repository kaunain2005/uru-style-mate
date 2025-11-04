export default function SuggestionCard({ suggestion }) {
  const { suggestions = [], bodyMessage, image, color, bodyType, eventType } = suggestion;

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        {image && <img src={image} alt="item" className="w-20 h-20 object-cover rounded" />}
        <div>
          <div className="text-sm text-gray-600">Color: <span className="font-medium">{color}</span></div>
          <div className="text-sm text-gray-600">Body: <span className="font-medium capitalize">{bodyType}</span></div>
          <div className="text-sm text-gray-600">Event: <span className="font-medium capitalize">{eventType}</span></div>
        </div>
      </div>

      {bodyMessage && <p className="text-sm text-blue-600 italic mb-3">{bodyMessage}</p>}

      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <div key={i} className="p-3 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800">{s.outfit}</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className={idx < s.rating ? "text-yellow-500" : "text-gray-300"}>⭐</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-1"><strong>How to wear:</strong> {s.howToWear}</p>
            <p className="text-sm text-gray-700 mt-1"><strong>Tip:</strong> {s.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
