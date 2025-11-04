function rgbToColorName(rgb) {
  if (!rgb) return "neutral";
  const [r, g, b] = rgb.replace(/[^\d,]/g, "").split(",").map((v) => parseInt(v, 10));
  if (r > 200 && g > 200 && b > 200) return "white";
  if (r < 60 && g < 60 && b < 60) return "black";
  if (b > r + 30 && b > g + 30) return "blue";
  if (r > g + 30 && r > b + 30) return "red";
  if (g > r + 30 && g > b + 30) return "green";
  if (r > 150 && g > 140 && b < 120) return "beige";
  return "neutral";
}

const baseOutfits = {
  blue: [ { outfit: "White chinos with navy loafers" }, { outfit: "Beige trousers and brown boots" }, { outfit: "Black jeans and white sneakers" } ],
  black: [ { outfit: "Grey chinos with leather shoes" }, { outfit: "Beige trousers with loafers" }, { outfit: "Denim jeans with sneakers" } ],
  white: [ { outfit: "Blue jeans with sneakers" }, { outfit: "Black trousers with loafers" }, { outfit: "Green chinos with sandals" } ],
  red: [ { outfit: "White trousers with black boots" }, { outfit: "Grey chinos with brown shoes" }, { outfit: "Denim jeans with sneakers" } ],
  green: [ { outfit: "Beige chinos with loafers" }, { outfit: "Navy trousers with sneakers" }, { outfit: "Brown pants with boots" } ],
  beige: [ { outfit: "White jeans with sneakers" }, { outfit: "Olive chinos with loafers" }, { outfit: "Black trousers with boots" } ],
  neutral: [ { outfit: "Denim jeans with sneakers" }, { outfit: "Khaki trousers with loafers" }, { outfit: "White chinos with sandals" } ]
};

const eventModifiers = {
  casual: {
    preferIndex: [2,0,1],
    howToWear: [
      "Keep it untucked for a relaxed vibe",
      "Short sleeves or roll sleeves",
      "Pair with casual sneakers"
    ]
  },
  party: {
    preferIndex: [0,1,2],
    howToWear: [
      "Roll up the sleeves and add accessories",
      "Half-tuck for a modern look",
      "Wear bright or textured shoes"
    ]
  },
  office: {
    preferIndex: [1,0,2],
    howToWear: [
      "Tuck in your shirt and add a belt",
      "Wear full sleeves and loafers",
      "Use a blazer or structured jacket"
    ]
  },
  date: {
    preferIndex: [0,2,1],
    howToWear: [
      "Half-tuck the shirt for smart-casual balance",
      "Add a watch and neat shoes",
      "Keep accessories minimal"
    ]
  },
  formal: {
    preferIndex: [1,0,2],
    howToWear: [
      "Tuck in fully and wear formal shoes",
      "Use full sleeves and a jacket",
      "Choose darker tones and minimal accessories"
    ]
  }
};

const bodyAdvice = {
  ectomorph: "Layer clothes to add volume and structure your silhouette.",
  mesomorph: "Opt for fitted outfits that show off balanced proportions.",
  endomorph: "Structured fits, darker shades, and vertical lines enhance shape."
};

const styleTips = [
  "Add a belt for balance and shape",
  "Roll sleeves for a relaxed look",
  "Tuck in for a cleaner silhouette",
  "Use minimal accessories for polish",
  "Choose textured fabrics for contrast",
  "Pair complementary colors for visual harmony"
];

export function getOutfitSuggestions(colorRgb, clothingType, bodyType, eventType = "casual") {
  const color = rgbToColorName(colorRgb);
  const base = baseOutfits[color] || baseOutfits.neutral;
  const event = eventModifiers[eventType] || eventModifiers.casual;

  const suggestions = event.preferIndex.map((idx, i) => {
    const baseItem = base[idx % base.length];
    let rating = 3 + Math.floor(Math.random() * 3); // 3–5 stars randomly

    if (bodyType === "mesomorph" && eventType !== "party") rating = 5;
    if (bodyType === "ectomorph" && eventType === "formal") rating = 4;
    if (bodyType === "endomorph" && color === "black") rating = 5;

    if (rating > 5) rating = 5;

    const howToWear = event.howToWear[i % event.howToWear.length] || styleTips[i % styleTips.length];
    const tip = styleTips[(i + 1) % styleTips.length];

    return { outfit: baseItem.outfit, rating, howToWear, tip };
  });

  const bodyMessage = bodyAdvice[bodyType] || "Dress with confidence—style is about comfort and attitude.";

  return { color, bodyMessage, suggestions };
}
