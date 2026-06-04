import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destination, travelFrom, days, travelers, tripType, currency, budgetStyle } = body;

    if (!destination || !travelFrom) {
      return NextResponse.json({ error: "destination and travelFrom are required" }, { status: 400 });
    }

    const prompt = `You are an expert travel planner. Generate a comprehensive, personalised trip plan as JSON.

TRIP DETAILS:
- Destination: ${destination}
- Traveling from: ${travelFrom}
- Duration: ${days} days
- Travelers: ${travelers}
- Trip type: ${tripType}
- Currency: ${currency}
- Budget style: ${budgetStyle}

Return a JSON object with this EXACT structure (no markdown, no code fences, just raw JSON):

{
  "bestTimeToVisit": "string — best months/season to visit and why",

  "travelOptions": [
    {
      "mode": "Flight" | "Train" | "Bus",
      "provider": "airline/train/bus operator name",
      "route": "origin to destination with stops if any",
      "estimatedCost": "cost in ${currency} per person",
      "duration": "approximate travel time",
      "bookingTip": "where/when to book for best price"
    }
  ],
  // Include at least 2-3 flight options, and if trains or buses are viable from ${travelFrom} to ${destination}, include those too.

  "placesToVisit": [
    {
      "name": "place name",
      "category": "one of: Trek/Hike/Trail, Monastery/Temple, Museum, Park/Garden, Market/Street, Landmark, Beach, Lake, Viewpoint",
      "description": "2-3 sentences about the place and what makes it special",
      "estimatedTime": "how long to spend there",
      "estimatedCost": "entry fee or cost in ${currency}",
      "tip": "practical tip for visiting"
    }
  ],
  // Include at least 10-15 places covering multiple categories. Prioritise treks/hikes/trails, monasteries/temples, museums, parks, markets, and notable streets/roads.

  "hotels": [
    {
      "name": "exact hotel name (real, bookable hotel)",
      "category": "budget" | "mid-range" | "luxury",
      "pricePerNight": "price in ${currency}",
      "location": "area/neighbourhood",
      "description": "1-2 sentences about the hotel"
    }
  ],
  // Include 2-3 hotels per category (budget, mid-range, luxury) — 6 to 9 total. Use real, well-known hotel names that can be found on booking platforms.

  "visa": {
    "required": true/false,
    "type": "visa type (e.g., Visa on Arrival, e-Visa, Tourist Visa)",
    "cost": "visa fee in ${currency} — if no visa needed, say 'Free' or 'N/A'",
    "processingTime": "how long it takes",
    "documents": ["list of documents needed"],
    "notes": "any important notes about the visa process from ${travelFrom} to ${destination}"
  },

  "daysPlan": [
    {
      "day": 1,
      "date": "Day 1",
      "theme": "short theme for the day",
      "morning": {
        "time": "start time",
        "activity": "activity name",
        "description": "what to do and practical details",
        "estimatedCost": "cost in ${currency}"
      },
      "afternoon": { "time": "", "activity": "", "description": "", "estimatedCost": "" },
      "evening": { "time": "", "activity": "", "description": "", "estimatedCost": "" }
    }
  ],
  // Generate exactly ${days} days. Make the itinerary practical and realistic — account for travel time between spots. Match the ${tripType} style and ${budgetStyle} budget.

  "budget": {
    "flights": number,
    "hotels": number,
    "food": number,
    "activities": number,
    "transport": number,
    "miscellaneous": number
  },
  // All values in ${currency} as numbers (no symbols). This is the TOTAL estimated cost for ${travelers} traveler(s) for ${days} days at a ${budgetStyle} level.

  "travelTips": [
    "practical travel tips specific to ${destination} — transportation, connectivity, safety, money, health, packing"
  ],
  // 6-8 tips

  "culturalTips": [
    "how locals live, customs to respect, etiquette, religious practices, dress code expectations, tipping culture, local greetings, food customs"
  ],
  // 5-7 tips focused on cultural sensitivity and how to travel without being disruptive

  "dosAndDonts": {
    "dos": ["things travelers should do — including cleanliness, environmental respect, supporting local businesses"],
    "donts": ["things to avoid — common tourist mistakes, offensive behaviors, environmental harm, scams to watch for"]
  }
  // 5-6 items in each. Factor in the climate/cultural difference between ${travelFrom} and ${destination}. For example if traveling from a tropical country to a cold destination, include cold-weather preparation tips.
}

IMPORTANT:
- All costs must be in ${currency}
- Use real, current, accurate information
- Hotel names must be real and bookable
- Be specific and practical — not generic travel advice
- Factor in the ${budgetStyle} level for all recommendations
- Consider the origin (${travelFrom}) for visa, flight, and cultural gap advice`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 6000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    const plan = JSON.parse(content);
    return NextResponse.json(plan);
  } catch (error: unknown) {
    console.error("Trip generation error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate trip plan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
