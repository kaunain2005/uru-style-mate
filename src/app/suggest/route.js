import { NextResponse } from "next/server";
import { getOutfitSuggestions } from "@/app/utils/outfitRules";

export async function POST(req) {
  const body = await req.json();
  const { color, clothingType, bodyType, eventType } = body;
  const result = getOutfitSuggestions(color, clothingType, bodyType, eventType);
  return NextResponse.json(result);
}
