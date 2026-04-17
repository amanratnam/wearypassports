export interface DayActivity {
  time: string;
  activity: string;
  description: string;
  estimatedCost: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  theme: string;
  morning: DayActivity;
  afternoon: DayActivity;
  evening: DayActivity;
}

export interface BudgetBreakdown {
  flights: number;
  hotels: number;
  food: number;
  activities: number;
  transport: number;
  miscellaneous: number;
}

export interface TripItinerary {
  destination: string;
  travelFrom: string;
  days: number;
  travelers: number;
  tripType: string;
  currency: string;
  budgetStyle: string;
  budget: BudgetBreakdown;
  days_plan: ItineraryDay[];
  tips: string[];
  bestTimeToVisit: string;
  visaInfo: string;
}

export function generateMockItinerary(params: {
  destination: string;
  travelFrom: string;
  days: number;
  travelers: number;
  tripType: string;
  currency: string;
  budgetStyle: string;
}): TripItinerary {
  const { destination, travelFrom, days, travelers, tripType, currency, budgetStyle } = params;

  const multiplier = budgetStyle === "budget" ? 1 : budgetStyle === "mid-range" ? 1.8 : 3;
  const travelersMultiplier = travelers;

  const budget: BudgetBreakdown = {
    flights: Math.round(28000 * multiplier * travelersMultiplier),
    hotels: Math.round(3500 * days * multiplier * travelersMultiplier * 0.5),
    food: Math.round(1200 * days * multiplier * travelersMultiplier),
    activities: Math.round(1800 * days * multiplier * travelersMultiplier * 0.6),
    transport: Math.round(600 * days * multiplier * travelersMultiplier * 0.4),
    miscellaneous: Math.round(800 * days * multiplier * travelersMultiplier * 0.3),
  };

  const destinationPlans: Record<string, Partial<ItineraryDay>[]> = {
    default: [
      {
        theme: "Arrival & Orientation",
        morning: {
          time: "09:00 AM",
          activity: "Arrival & Hotel Check-in",
          description: `Land at ${destination} international airport. Transfer to your hotel and freshen up.`,
          estimatedCost: `${currency} 0`,
        },
        afternoon: {
          time: "01:00 PM",
          activity: "City Centre Exploration",
          description: `Walk the main thoroughfare of ${destination}. Grab lunch at a local eatery — go for the regional specialty.`,
          estimatedCost: `${currency} 800`,
        },
        evening: {
          time: "07:00 PM",
          activity: "Welcome Dinner",
          description: `Settle into a rooftop or waterfront restaurant with views. Order the local signature dish.`,
          estimatedCost: `${currency} 1,500`,
        },
      },
      {
        theme: "Culture & Heritage",
        morning: {
          time: "08:00 AM",
          activity: "Major Temple / Heritage Site",
          description: `Visit the most iconic cultural landmark in ${destination}. Arrive early to beat crowds.`,
          estimatedCost: `${currency} 500`,
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Local Market Walk",
          description: `Explore the main bazaar or artisan market. Pick up local crafts, spices, or snacks.`,
          estimatedCost: `${currency} 600`,
        },
        evening: {
          time: "06:30 PM",
          activity: "Sunset Viewpoint",
          description: `Head to the best sunset spot in the area. Bring a camera — golden hour here is exceptional.`,
          estimatedCost: `${currency} 200`,
        },
      },
      {
        theme: "Nature & Adventure",
        morning: {
          time: "07:00 AM",
          activity: "Nature Walk / Trekking",
          description: `Early morning hike or nature excursion to experience the landscape before the heat sets in.`,
          estimatedCost: `${currency} 1,200`,
        },
        afternoon: {
          time: "01:30 PM",
          activity: "Outdoor Activity",
          description: `${tripType === "adventure" ? "White water rafting, ATV, or zip-lining" : tripType === "relaxation" ? "Spa and wellness session" : "Guided cultural tour or cooking class"} in the afternoon.`,
          estimatedCost: `${currency} 2,500`,
        },
        evening: {
          time: "07:00 PM",
          activity: "Night Market / Street Food",
          description: `Evening at the local night market. Street food, live music, and local atmosphere.`,
          estimatedCost: `${currency} 800`,
        },
      },
      {
        theme: "Day Trip",
        morning: {
          time: "08:30 AM",
          activity: "Excursion to Nearby Attraction",
          description: `Full day trip to a neighboring landmark or village within 1–2 hours of ${destination}.`,
          estimatedCost: `${currency} 1,500`,
        },
        afternoon: {
          time: "12:30 PM",
          activity: "Lunch at Local Restaurant",
          description: `Stop at a well-regarded local restaurant on the day trip route. Order the lunch thali or set menu.`,
          estimatedCost: `${currency} 700`,
        },
        evening: {
          time: "06:00 PM",
          activity: "Return & Leisure",
          description: `Return to ${destination}. Relax at hotel pool or explore the neighborhood independently.`,
          estimatedCost: `${currency} 300`,
        },
      },
      {
        theme: "Shopping & Leisure",
        morning: {
          time: "10:00 AM",
          activity: "Slow Morning & Café",
          description: `Late start. Breakfast at a well-reviewed local café. No rushing today.`,
          estimatedCost: `${currency} 500`,
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Shopping District",
          description: `Browse the best retail area — from luxury malls to boutique street shops depending on your preference.`,
          estimatedCost: `${currency} 3,000`,
        },
        evening: {
          time: "07:30 PM",
          activity: "Farewell Dinner",
          description: `Special dinner at a highly-rated restaurant. Celebrate the trip with the best meal of your stay.`,
          estimatedCost: `${currency} 2,500`,
        },
      },
    ],
  };

  const planTemplate = destinationPlans["default"];

  const days_plan: ItineraryDay[] = Array.from({ length: Math.min(days, 7) }, (_, i) => {
    const template = planTemplate[i % planTemplate.length];
    const dayDate = new Date();
    dayDate.setDate(dayDate.getDate() + i + 7);
    return {
      day: i + 1,
      date: dayDate.toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" }),
      theme: template.theme || `Day ${i + 1}`,
      morning: template.morning!,
      afternoon: template.afternoon!,
      evening: template.evening!,
    };
  });

  const tips = [
    `Book flights from ${travelFrom} to ${destination} at least 6 weeks in advance for best rates.`,
    "Download offline maps before you leave — data roaming charges add up fast.",
    "Carry a mix of local currency and a travel card — not all vendors accept cards.",
    "Travel insurance is non-negotiable for international trips. Budget ₹500–₹1,500 per person.",
    `Best neighbourhood to stay in ${destination} for first-time visitors is the city centre — saves on transport.`,
    "Photo IDs are often required at temples and heritage sites — carry a printout.",
  ];

  return {
    destination,
    travelFrom,
    days,
    travelers,
    tripType,
    currency,
    budgetStyle,
    budget,
    days_plan,
    tips,
    bestTimeToVisit: "April to October (dry season)",
    visaInfo: "Visa on arrival available for Indian passport holders. Check current requirements before travel.",
  };
}
