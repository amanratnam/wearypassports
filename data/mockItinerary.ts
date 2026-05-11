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

interface DestinationData {
  plans: Partial<ItineraryDay>[];
  bestTime: string;
  visaInfo: string;
  tips: (params: { destination: string; travelFrom: string }) => string[];
  flightBase: number;
  hotelBase: number;
  foodBase: number;
}

const destinationData: Record<string, DestinationData> = {
  bali: {
    bestTime: "May to October (dry season) — avoid Jan–Mar monsoon",
    visaInfo: "Free Visa on Arrival for Indian passport holders for up to 30 days. Extendable once.",
    tips: ({ travelFrom }) => [
      `Book round-trip flights from ${travelFrom} to Denpasar (DPS) at least 4–6 weeks ahead — IndiGo and Air Asia often have deals under ₹25,000.`,
      "Get an SIM at the airport — Telkomsel has the best coverage across Bali.",
      "Ubud is your cultural base; Seminyak or Canggu for beach and nightlife. Don't try to do both in one day.",
      "Carry IDR cash — most warungs and local spots are cash-only.",
      "Book the Tanah Lot and Uluwatu sunset visits on separate evenings — both get crowded by 5pm.",
      "Hire a private driver for the day (IDR 500,000 ≈ ₹2,500) rather than relying on Grab — it's cheaper and far more flexible.",
    ],
    flightBase: 26000,
    hotelBase: 2800,
    foodBase: 1000,
    plans: [
      {
        theme: "Arrival & Ubud Check-in",
        morning: {
          time: "10:00 AM",
          activity: "Land at Ngurah Rai Airport",
          description: "Collect your Visa on Arrival, get an SIM, and take a pre-booked driver to Ubud (~1.5 hrs). Check in, freshen up.",
          estimatedCost: "₹0 (included in hotel transfer)",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Ubud Market & Monkey Forest",
          description: "Walk Ubud's main market for local batik and spices. Then head to Sacred Monkey Forest — arrive before 3pm to beat the crowds.",
          estimatedCost: "₹600",
        },
        evening: {
          time: "07:00 PM",
          activity: "Dinner at Locavore or Naughty Nuri's",
          description: "For a splurge: Locavore (book ahead). For local BBQ ribs and cold Bintang: Naughty Nuri's on Jl. Ubud Raya.",
          estimatedCost: "₹1,200–₹3,500",
        },
      },
      {
        theme: "Rice Terraces & Temples",
        morning: {
          time: "07:30 AM",
          activity: "Tegalalang Rice Terraces",
          description: "Go early before the tour buses arrive. Walk the narrow paths between the terraces. The mist at 7am is worth every early alarm.",
          estimatedCost: "₹250",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Tirta Empul Temple",
          description: "Bali's most sacred water temple. You can participate in the purification ritual — bring a sarong (or rent one at the entrance).",
          estimatedCost: "₹350",
        },
        evening: {
          time: "06:30 PM",
          activity: "Kecak Fire Dance at Uluwatu",
          description: "Drive to Uluwatu cliff temple for the sunset Kecak performance. One of the most cinematic things you'll see in Southeast Asia.",
          estimatedCost: "₹800",
        },
      },
      {
        theme: "Seminyak Beach Day",
        morning: {
          time: "09:00 AM",
          activity: "Transfer to Seminyak",
          description: "Move to your beach-side hotel or villa in Seminyak or Canggu. Drop bags, change, head straight to the sand.",
          estimatedCost: "₹800 (driver)",
        },
        afternoon: {
          time: "12:00 PM",
          activity: "Seminyak Beach & La Plancha",
          description: "Spend the afternoon at Seminyak Beach. The bean bags at La Plancha are a classic — order a Bintang, watch surfers, don't move.",
          estimatedCost: "₹700",
        },
        evening: {
          time: "06:30 PM",
          activity: "Sunset at Potato Head & Dinner",
          description: "Potato Head beach club for sunset cocktails (budget ₹2,000–₹3,000 for drinks). Dinner at Sarong or Métis for something memorable.",
          estimatedCost: "₹2,500",
        },
      },
      {
        theme: "Nusa Penida Day Trip",
        morning: {
          time: "07:00 AM",
          activity: "Fast Boat to Nusa Penida",
          description: "Catch an early fast boat from Sanur (30 mins). The island is raw, dramatic, and nothing like mainland Bali.",
          estimatedCost: "₹1,800 return",
        },
        afternoon: {
          time: "11:00 AM",
          activity: "Kelingking Beach & Crystal Bay",
          description: "Kelingking's T-Rex cliff viewpoint is the most photographed spot in all of Bali. Swim at Crystal Bay in the afternoon.",
          estimatedCost: "₹600",
        },
        evening: {
          time: "05:30 PM",
          activity: "Return & Seafood Dinner",
          description: "Boat back to Sanur. Head to Jimbaran Bay for grilled seafood on the beach — order by weight and haggle gently.",
          estimatedCost: "₹1,200",
        },
      },
      {
        theme: "Cooking Class & Leisure",
        morning: {
          time: "08:30 AM",
          activity: "Balinese Cooking Class",
          description: "Visit a local market to buy ingredients, then learn to cook 6–8 Balinese dishes. You eat what you cook. Almost every class is excellent.",
          estimatedCost: "₹2,500",
        },
        afternoon: {
          time: "01:30 PM",
          activity: "Spa & Traditional Massage",
          description: "Bali has some of the world's best-value spas. A 2-hour traditional massage + scrub at a well-reviewed spot costs ₹1,200–₹1,800.",
          estimatedCost: "₹1,500",
        },
        evening: {
          time: "07:00 PM",
          activity: "Rooftop Bar & Last Night Dinner",
          description: "Sundara or Ku De Ta for the final evening. Order the grilled fish and watch the lights come on over the Indian Ocean.",
          estimatedCost: "₹2,200",
        },
      },
    ],
  },

  ladakh: {
    bestTime: "June to September — roads open after snowmelt. Pangong freezes beautifully Dec–Feb if you fly in.",
    visaInfo: "No visa required for Indian citizens. Carry Aadhaar + passport. Some restricted areas need an Inner Line Permit (ILP) — get it in Leh.",
    tips: ({ travelFrom }) => [
      `Fly from ${travelFrom} to Leh (IXL) — acclimatise for the first full day. Do NOT trek or exert yourself on day 1.`,
      "Altitude sickness is real. Diamox (acetazolamide) can help — consult your doctor before travel.",
      "Rent a Royal Enfield or hire a shared taxi for the Khardung La and Nubra Valley loop.",
      "Pangong Lake is 5 hours from Leh — stay the night at a tent camp to see it at sunrise. Worth every rupee.",
      "Carry enough cash — ATMs in Leh are unreliable and there's nothing beyond the city.",
      "Dress in layers. Summer mornings in Leh are freezing; afternoons can hit 25°C. UV is brutal at altitude.",
    ],
    flightBase: 8000,
    hotelBase: 2200,
    foodBase: 700,
    plans: [
      {
        theme: "Arrival & Acclimatisation",
        morning: {
          time: "09:00 AM",
          activity: "Fly into Leh — Rest & Hydrate",
          description: "Land at Kushok Bakula Rimpochee Airport at 3,500m. Go directly to your hotel. Drink water, eat light, sleep. Your body needs this day.",
          estimatedCost: "₹0",
        },
        afternoon: {
          time: "03:00 PM",
          activity: "Slow Walk: Leh Palace & Market",
          description: "A gentle stroll — don't rush. Leh Palace (the original Ladakhi royal seat) gives panoramic views. Walk the main market for momos and butter tea.",
          estimatedCost: "₹200",
        },
        evening: {
          time: "07:00 PM",
          activity: "Dinner at a Local Restaurant",
          description: "Try Tibetan thukpa (noodle soup) or a warm tsampa meal. Mona Lisa Restaurant on the main drag is a classic first-night spot.",
          estimatedCost: "₹400",
        },
      },
      {
        theme: "Monasteries & Magnetic Hill",
        morning: {
          time: "08:00 AM",
          activity: "Shanti Stupa & Thiksey Monastery",
          description: "Shanti Stupa at sunrise is transcendent. Then drive to Thiksey — Ladakh's most photogenic monastery, built like a small Potala Palace.",
          estimatedCost: "₹350",
        },
        afternoon: {
          time: "12:30 PM",
          activity: "Magnetic Hill & Sangam",
          description: "The so-called gravity-defying hill (it's an optical illusion — still fun). Then to Sangam where the Zanskar meets the Indus — two rivers, two colours.",
          estimatedCost: "₹150",
        },
        evening: {
          time: "06:30 PM",
          activity: "Leh Rooftop Sunset & Local Food",
          description: "Back to Leh for a rooftop sunset. Lala's Art Café or Il Forno for something warm. Try the yak butter tea at least once.",
          estimatedCost: "₹500",
        },
      },
      {
        theme: "Khardung La — World's Highest Pass",
        morning: {
          time: "07:00 AM",
          activity: "Drive to Khardung La (5,359m)",
          description: "Take a jeep north over Khardung La pass. Stop at the top — 5,359m. Thin air, prayer flags, and a view that makes every discomfort worth it.",
          estimatedCost: "₹1,200 (jeep share)",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Nubra Valley & Hunder Sand Dunes",
          description: "Descend to Nubra Valley — a surprise desert in the Himalayas. Walk the cold desert dunes at Hunder. Bactrian camels roam here.",
          estimatedCost: "₹400",
        },
        evening: {
          time: "07:00 PM",
          activity: "Overnight Camp at Nubra",
          description: "Stay the night in a Nubra Valley camp. Watch the stars from 3,100m — zero light pollution means the Milky Way is a ceiling, not a concept.",
          estimatedCost: "₹1,800 (camp + dinner)",
        },
      },
      {
        theme: "Pangong Lake",
        morning: {
          time: "06:30 AM",
          activity: "Drive to Pangong Tso",
          description: "5 hours from Leh via Chang La pass (5,360m). The drive is half the experience. Carry snacks — there's nothing on this road.",
          estimatedCost: "₹1,800 (jeep)",
        },
        afternoon: {
          time: "01:30 PM",
          activity: "Pangong Lakeshore",
          description: "The lake shifts from turquoise to navy to deep blue depending on the light. Sit. Photograph. Let yourself be small. That's the point.",
          estimatedCost: "₹0",
        },
        evening: {
          time: "06:00 PM",
          activity: "Sunset & Overnight at Lake Camp",
          description: "Stay in a lakeside tent camp. Pangong at sunset turns molten orange. Wake up at 5am for the dawn — nobody forgets this.",
          estimatedCost: "₹2,200 (tent + meals)",
        },
      },
      {
        theme: "Zanskar Valley & Departure",
        morning: {
          time: "07:00 AM",
          activity: "Chadar Trek Viewpoint (summer) or Sham Valley Walk",
          description: "In summer, walk the Sham Valley for village views. In winter, the frozen Zanskar river (Chadar) is one of the world's great treks.",
          estimatedCost: "₹500",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Hemis Monastery",
          description: "Largest monastery in Ladakh. The Hemis Festival in July (masked Cham dances) is extraordinary if your dates align.",
          estimatedCost: "₹200",
        },
        evening: {
          time: "07:00 PM",
          activity: "Last Night in Leh — Rooftop Dinner",
          description: "Order a final thali at Bon Appetit or The Tibetan Kitchen. Cold Kingfisher if you're acclimatised. Sunrise tomorrow and you'll miss this sky.",
          estimatedCost: "₹600",
        },
      },
    ],
  },

  thailand: {
    bestTime: "November to March (cool dry season) — avoid June–October monsoon on the coasts",
    visaInfo: "Indian passport holders get 30 days free Visa on Arrival at major Thai airports. Extendable once.",
    tips: ({ travelFrom }) => [
      `Fly from ${travelFrom} to Bangkok (BKK/DMK) — Thai Airways, IndiGo, and Air Asia all operate this route.`,
      "Get a Thailand SIM at the airport — AIS or DTAC both have tourist plans with solid data coverage.",
      "Use the BTS Skytrain and MRT metro in Bangkok — cheap, fast, and air-conditioned. Don't take metered cabs in traffic.",
      "Bargain at street markets but not at temples or with monks — read the room.",
      "The south (Phuket, Koh Samui) and north (Chiang Mai) are completely different experiences. Don't rush between them.",
      "Book island ferries and sleeper trains in advance — they fill up fast during peak season.",
    ],
    flightBase: 22000,
    hotelBase: 2500,
    foodBase: 800,
    plans: [
      {
        theme: "Bangkok Arrival & Temples",
        morning: {
          time: "10:00 AM",
          activity: "Arrive Bangkok — Khao San Road or Sukhumvit",
          description: "Check in. Bangkok hits differently when you step outside — heat, tuk-tuks, jasmine garlands, and the smell of pad thai from street stalls.",
          estimatedCost: "₹0",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Wat Pho & Grand Palace",
          description: "The Grand Palace complex is overdone but unmissable. Then Wat Pho next door — the 46m Reclining Buddha is genuinely staggering.",
          estimatedCost: "₹900",
        },
        evening: {
          time: "07:00 PM",
          activity: "Chinatown Street Food",
          description: "Yaowarat Road after dark is Bangkok at its best. Crab omelets, grilled pork skewers, fresh oysters. Eat everything.",
          estimatedCost: "₹700",
        },
      },
      {
        theme: "Markets & Rooftops",
        morning: {
          time: "09:00 AM",
          activity: "Chatuchak Weekend Market",
          description: "35 acres of shopping — clothes, antiques, street food, plants, everything. Budget 3 hours minimum. Bring cash and comfortable shoes.",
          estimatedCost: "₹1,500 (shopping budget)",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Wat Arun & Chao Phraya River",
          description: "Take a river taxi to Wat Arun — the Temple of Dawn. Climb to the middle terrace for the best view of Bangkok's skyline.",
          estimatedCost: "₹400",
        },
        evening: {
          time: "07:30 PM",
          activity: "Rooftop Bar — Vertigo or Sky Bar",
          description: "Bangkok's rooftop bars are world-class. Sky Bar (Hangover 2 fame) or Vertigo at Banyan Tree. Cocktails with 360° city views.",
          estimatedCost: "₹2,500",
        },
      },
      {
        theme: "Day Trip: Ayutthaya",
        morning: {
          time: "08:00 AM",
          activity: "Train to Ayutthaya (1.5 hrs)",
          description: "Thailand's ancient capital — now a UNESCO World Heritage site. The ruined temples and the famous Buddha head in tree roots.",
          estimatedCost: "₹150 (train)",
        },
        afternoon: {
          time: "12:00 PM",
          activity: "Cycle the Ruins",
          description: "Rent a bicycle (₹200/day) and explore the temple complex at your own pace. The scale of Wat Mahathat and Wat Phra Si Sanphet is humbling.",
          estimatedCost: "₹400",
        },
        evening: {
          time: "06:00 PM",
          activity: "Return to Bangkok",
          description: "Head back in time for a night at Asiatique — the riverside night market with Ferris wheel views and decent restaurants.",
          estimatedCost: "₹600",
        },
      },
      {
        theme: "Fly to Chiang Mai",
        morning: {
          time: "08:30 AM",
          activity: "Fly Bangkok → Chiang Mai (1 hr)",
          description: "Chiang Mai is slower, cooler, and more beautiful than Bangkok. The entire old city is inside a medieval moat.",
          estimatedCost: "₹3,500 domestic",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Old City Temples: Wat Chedi Luang & Wat Phra Singh",
          description: "Two of the finest temples in northern Thailand — both inside the moat. Calm, grand, and genuinely spiritual compared to Bangkok's tourist rush.",
          estimatedCost: "₹300",
        },
        evening: {
          time: "06:00 PM",
          activity: "Sunday Walking Street",
          description: "If it's Sunday, the Walking Street on Wualai Road is not to be missed — hill tribe handicrafts, local food, live music. Show up at 5pm.",
          estimatedCost: "₹800",
        },
      },
      {
        theme: "Elephant Sanctuary & Night Bazaar",
        morning: {
          time: "08:00 AM",
          activity: "Ethical Elephant Sanctuary Visit",
          description: "Spend the morning at one of Chiang Mai's ethical sanctuaries (Elephant Nature Park is the gold standard). Feed, walk, and observe — no riding.",
          estimatedCost: "₹3,800",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Thai Cooking Class",
          description: "A 3-hour Thai cooking class in Chiang Mai (including market visit) is one of the best things you can do in Thailand. Red curry paste from scratch.",
          estimatedCost: "₹2,000",
        },
        evening: {
          time: "07:00 PM",
          activity: "Night Bazaar & Final Dinner",
          description: "Chiang Mai Night Bazaar for final souvenir shopping. Dinner at David's Kitchen or the Riverside — both are excellent.",
          estimatedCost: "₹1,200",
        },
      },
    ],
  },

  japan: {
    bestTime: "March–April (cherry blossom) or October–November (autumn foliage) — both peak and crowded",
    visaInfo: "Tourist visa required for Indian passport holders. Apply via the Japanese consulate 3–4 weeks before travel. Free for 15 days with prior sponsorship.",
    tips: ({ travelFrom }) => [
      `Fly from ${travelFrom} to Tokyo Narita (NRT) or Haneda (HND) — ANA and JAL code-shares via Singapore or Bangkok.`,
      "Get a 14-day JR Pass before you leave India — it's significantly cheaper than buying in Japan and covers the Shinkansen.",
      "IC Cards (Suica/Pasmo) are essential for local trains and convenience store payments — load them at the airport.",
      "Japan is expensive but predictable. Convenience stores (7-Eleven, FamilyMart) sell genuinely good food at ₹200–₹400 per meal.",
      "Book popular restaurants 4–6 weeks in advance — Tokyo's best sushi counters and ramen shops fill up months ahead.",
      "Don't tip — it's considered rude. Just say 'arigato gozaimasu' and mean it.",
    ],
    flightBase: 45000,
    hotelBase: 4500,
    foodBase: 1800,
    plans: [
      {
        theme: "Tokyo Arrival & Shibuya",
        morning: {
          time: "10:00 AM",
          activity: "Arrive Tokyo — Narita or Haneda",
          description: "Take the Narita Express (N'EX) to Shinjuku or Shibuya. Your first vending machine will be within 4 minutes of landing.",
          estimatedCost: "₹1,800 (N'EX)",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Shibuya Crossing & Harajuku",
          description: "Stand in the middle of the world's busiest pedestrian crossing at rush hour. Then walk to Harajuku's Takeshita Street for the surreal fashion subcultures.",
          estimatedCost: "₹400",
        },
        evening: {
          time: "07:00 PM",
          activity: "Ramen in Shinjuku",
          description: "Ichiran or Fuunji in Shinjuku for your first proper Japanese ramen. Order through the vending machine and eat alone in your cubicle — it's intentional.",
          estimatedCost: "₹700",
        },
      },
      {
        theme: "Asakusa & Tokyo Skytree",
        morning: {
          time: "09:00 AM",
          activity: "Senso-ji Temple, Asakusa",
          description: "Tokyo's oldest temple. Walk the Nakamise shopping street before 9am when it's quiet. The gate (Kaminarimon) and incense smoke — unmistakably Japan.",
          estimatedCost: "₹200",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Tokyo Skytree & Akihabara",
          description: "Go up the Skytree (634m) for the full Tokyo panorama. Then walk to Akihabara — the electronics and anime district — even if it's not your thing.",
          estimatedCost: "₹2,500",
        },
        evening: {
          time: "07:00 PM",
          activity: "Izakaya Night in Yurakucho",
          description: "Under the train tracks in Yurakucho, tiny izakayas serve yakitori and cold Sapporo. Perfect for a spontaneous evening with salarymen.",
          estimatedCost: "₹1,200",
        },
      },
      {
        theme: "Day Trip: Nikko or Kamakura",
        morning: {
          time: "08:00 AM",
          activity: "Shinkansen / Train Out of Tokyo",
          description: "Kamakura (1 hr south): the 13m bronze Buddha and Zen temples. Nikko (2 hrs north): the most ornate shrine complex in Japan. Pick one.",
          estimatedCost: "₹1,500 (JR Pass)",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Explore & Temple Walk",
          description: "In Kamakura: walk the Daibutsu Hiking Trail between temples. In Nikko: the Toshogu Shrine is a UNESCO site that rewards slow walking.",
          estimatedCost: "₹600",
        },
        evening: {
          time: "06:30 PM",
          activity: "Return to Tokyo & Sushi Dinner",
          description: "Back in Tokyo, find a conveyor belt sushi (kaiten-zushi) spot for dinner — Sushiro or Kura Sushi are chains but genuinely good.",
          estimatedCost: "₹900",
        },
      },
      {
        theme: "Shinkansen to Kyoto",
        morning: {
          time: "09:00 AM",
          activity: "Shinkansen Tokyo → Kyoto (2h 15m)",
          description: "If the weather is clear, you'll see Mount Fuji from the right side of the train (sit on the E seats). It's actually there.",
          estimatedCost: "₹0 (JR Pass)",
        },
        afternoon: {
          time: "12:00 PM",
          activity: "Fushimi Inari Shrine",
          description: "10,000 orange torii gates climbing a forested mountain south of Kyoto. Go past the first loop — most tourists turn back at 30 mins. Keep going.",
          estimatedCost: "₹0",
        },
        evening: {
          time: "07:00 PM",
          activity: "Gion District at Dusk",
          description: "Walk Hanamikoji Street in Gion as the lanterns come on. You might spot a geiko (geisha) walking to an appointment — don't photograph without asking.",
          estimatedCost: "₹1,000",
        },
      },
      {
        theme: "Kyoto Temples & Arashiyama",
        morning: {
          time: "07:30 AM",
          activity: "Kinkaku-ji (Golden Pavilion)",
          description: "Go at opening time (9am) to avoid the worst crowds. The gold-leaf pavilion reflecting in the mirror pond is genuinely as beautiful as the photos.",
          estimatedCost: "₹500",
        },
        afternoon: {
          time: "12:00 PM",
          activity: "Arashiyama Bamboo Grove",
          description: "The bamboo grove takes 8 minutes to walk. That's fine — keep going to the Okochi-Sanso villa garden for the panoramic view. Worth the ₹500 entry.",
          estimatedCost: "₹600",
        },
        evening: {
          time: "06:00 PM",
          activity: "Nishiki Market & Kaiseki Dinner",
          description: "Walk the 'Kitchen of Kyoto' — Nishiki Market — for pickled vegetables, fresh tofu, and street skewers. Dinner at a kaiseki restaurant if budget allows.",
          estimatedCost: "₹2,500",
        },
      },
    ],
  },

  goa: {
    bestTime: "November to February (perfect weather, sea is calm) — avoid May–September monsoon",
    visaInfo: "No visa required for Indian citizens. Carry a government ID.",
    tips: ({ travelFrom }) => [
      `Fly from ${travelFrom} to Dabolim or Mopa airport — GoAir, SpiceJet, and IndiGo cover this route frequently.`,
      "North Goa (Baga, Calangute, Anjuna) = parties and beach shacks. South Goa (Palolem, Agonda) = quieter, cleaner, less crowded. Pick your vibe.",
      "Rent a scooter — it's the only way to move around Goa properly. Budget ₹400–₹600/day. Get an IDP if you're using an out-of-state licence.",
      "The best beaches for swimming are Palolem and Morjim. Baga has the party. Arambol has the hippie energy.",
      "Old Goa's churches (Se Cathedral, Basilica of Bom Jesus with St. Francis Xavier's remains) are genuinely impressive — give them 2 hours.",
      "Eat the fish curry rice. Every single meal if possible. The coconut-based Goan fish curry is one of India's finest regional dishes.",
    ],
    flightBase: 6000,
    hotelBase: 2000,
    foodBase: 900,
    plans: [
      {
        theme: "Arrival & North Goa Beaches",
        morning: {
          time: "11:00 AM",
          activity: "Land at Goa Airport — Rent a Scooter",
          description: "Pick up a scooter at the airport or your hotel. Drop bags. Put on sunscreen. Head straight to the beach.",
          estimatedCost: "₹500 (scooter rental)",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Baga or Calangute Beach",
          description: "Your classic Goa afternoon. Beach shack, cold Kingfisher, fried prawn. Settle in. You're in Goa.",
          estimatedCost: "₹800",
        },
        evening: {
          time: "07:00 PM",
          activity: "Tito's Lane & Baga Nightlife",
          description: "Start with dinner at Brittos or Fiesta. Then Tito's or Club Cubana if you want the classic Goa night out — both fill up after 10pm.",
          estimatedCost: "₹1,500",
        },
      },
      {
        theme: "Flea Markets & Old Goa",
        morning: {
          time: "09:00 AM",
          activity: "Anjuna Flea Market (Wed) or Mapusa Market (Fri)",
          description: "The Anjuna market is small but atmospheric — banjara jewellery, cashew feni, spices, clothes. Show up early for the best finds.",
          estimatedCost: "₹1,200",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Old Goa UNESCO Heritage Churches",
          description: "Se Cathedral and Basilica of Bom Jesus are genuinely grand — St. Francis Xavier's body has been here since 1553. Don't skip this.",
          estimatedCost: "₹0",
        },
        evening: {
          time: "07:30 PM",
          activity: "Panjim Restaurant Row",
          description: "Panjim's 31st January Road has excellent Goan-Portuguese restaurants. Viva Panjim and Shetty's Lunch Home both serve legendary prawn recheado.",
          estimatedCost: "₹1,000",
        },
      },
      {
        theme: "South Goa: Palolem & Agonda",
        morning: {
          time: "09:30 AM",
          activity: "Drive South: Palolem Beach",
          description: "1.5 hrs from North Goa. Palolem's crescent bay is one of India's most beautiful beaches. Rent a kayak and paddle around the headland.",
          estimatedCost: "₹600",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Agonda Beach & Seafood Lunch",
          description: "Agonda is quieter, almost deserted in comparison. Swim, read, do absolutely nothing. The seafood here is cheaper and fresher than North Goa.",
          estimatedCost: "₹700",
        },
        evening: {
          time: "07:00 PM",
          activity: "Silent Disco at Palolem",
          description: "Palolem's silent discos are a Goa original — wireless headphones, three channels, dancing on the beach. Strange and completely joyful.",
          estimatedCost: "₹800",
        },
      },
      {
        theme: "Water Sports & Sunset Cruise",
        morning: {
          time: "09:00 AM",
          activity: "Water Sports at Candolim/Calangute",
          description: "Parasailing, jet-skiing, banana boat, windsurfing — the operators on the northern beaches run tight packages. Book the parasailing.",
          estimatedCost: "₹2,500",
        },
        afternoon: {
          time: "01:30 PM",
          activity: "Chapora Fort",
          description: "The fort overlooking Vagator beach — where Dil Chahta Hai was filmed. The view from the ramparts is exactly what you think it is.",
          estimatedCost: "₹0",
        },
        evening: {
          time: "05:30 PM",
          activity: "Mandovi River Sunset Cruise",
          description: "The GTDC Sunset Cruise from Panjim is touristy but fun — Goan folk music, drinks, the sun going into the Arabian Sea.",
          estimatedCost: "₹700",
        },
      },
    ],
  },

  dubai: {
    bestTime: "October to April (cool, 20–30°C) — avoid June–August when temperatures hit 45°C",
    visaInfo: "Indians with a valid US/UK/Schengen visa or permanent residency get a free 14-day visa on arrival. Otherwise, apply for a UAE Tourist Visa through an airline or travel agent (₹5,000–₹8,000).",
    tips: ({ travelFrom }) => [
      `Direct flights from ${travelFrom} to Dubai (DXB) on Emirates, Air India, and IndiGo. Book 6 weeks ahead for under ₹25,000 return.`,
      "Get a Nol card at the metro — covers buses, trams, and metro. Much cheaper than cabs.",
      "The Dubai Mall and Mall of the Emirates are free to enter. Budget your shopping carefully — it adds up.",
      "Book the Burj Khalifa At the Top (level 124) in advance online — it's cheaper and you skip the queue.",
      "Respect local customs — no public displays of affection, dress modestly outside beach/hotel zones.",
      "Dubai Marina Walk and JBR Beach are free and excellent for an evening stroll and people-watching.",
    ],
    flightBase: 25000,
    hotelBase: 5000,
    foodBase: 1400,
    plans: [
      {
        theme: "Arrival & Downtown Dubai",
        morning: {
          time: "11:00 AM",
          activity: "Arrive DXB — Dubai Metro to Hotel",
          description: "Take the Red Line metro from the airport — efficient, cheap, and air-conditioned. Check in and head straight to Downtown.",
          estimatedCost: "₹200 (metro)",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Dubai Mall & Burj Khalifa Base",
          description: "Walk through the Dubai Mall — the world's largest. Waterfalls, an aquarium, an ice rink. Then stand outside the Burj Khalifa and look straight up.",
          estimatedCost: "₹500",
        },
        evening: {
          time: "06:00 PM",
          activity: "Dubai Fountain Show & Dinner",
          description: "The Dubai Fountain show runs every 30 minutes after sunset — synchronised jets 150m high. Dinner at Souk Al Bahar nearby for the views.",
          estimatedCost: "₹2,500",
        },
      },
      {
        theme: "Burj Khalifa & Old Dubai",
        morning: {
          time: "09:00 AM",
          activity: "Burj Khalifa At the Top (Level 124)",
          description: "Pre-book online. The views at 442m are extraordinary — on a clear day you can see the Palm and the desert. Go in the morning before the heat haze.",
          estimatedCost: "₹2,000",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Al Fahidi & Dubai Museum",
          description: "Old Dubai. The Al Fahidi Historic District has wind towers, art galleries, and the Dubai Museum inside an 18th-century fort. All free or cheap.",
          estimatedCost: "₹100",
        },
        evening: {
          time: "06:00 PM",
          activity: "Abra Across the Creek & Gold Souk",
          description: "Take an abra (traditional wooden boat) across the Dubai Creek for ₹15. Browse the Gold Souk — the density of jewellery on display is staggering.",
          estimatedCost: "₹200",
        },
      },
      {
        theme: "Desert Safari",
        morning: {
          time: "09:00 AM",
          activity: "Palm Jumeirah & Atlantis",
          description: "Walk (or take the monorail) to the Palm. See the Atlantis from outside or splash out on the Aquaventure Waterpark. The views back to the skyline are the shot.",
          estimatedCost: "₹1,200",
        },
        afternoon: {
          time: "04:00 PM",
          activity: "Desert Safari: Dune Bashing",
          description: "Operators run half-day tours — 4x4 dune bashing, sandboarding, camel ride, and a Bedouin camp dinner. Book from your hotel. This is a Dubai essential.",
          estimatedCost: "₹3,500",
        },
        evening: {
          time: "07:30 PM",
          activity: "Bedouin Camp: BBQ & Belly Dance",
          description: "Part of the safari package — BBQ dinner under the stars, shisha, henna, and a belly dance show in a traditional Bedouin camp.",
          estimatedCost: "₹0 (included)",
        },
      },
      {
        theme: "Jumeirah & Dubai Frame",
        morning: {
          time: "09:30 AM",
          activity: "Jumeirah Mosque & Beach",
          description: "The Jumeirah Mosque is one of the few in Dubai open to non-Muslims — guided tours at 10am. Then the public beach right beside it.",
          estimatedCost: "₹150",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Dubai Frame",
          description: "The 150m picture frame straddles old and new Dubai. The glass floor walkway at the top is terrifying. The symbolism is on-the-nose but it works.",
          estimatedCost: "₹1,200",
        },
        evening: {
          time: "07:00 PM",
          activity: "Dubai Marina Walk & Dinner",
          description: "Dubai Marina at night is spectacular — yacht berths, glass towers, and good restaurants on the waterfront. Dinner at Pier 7 if budget allows.",
          estimatedCost: "₹2,000",
        },
      },
    ],
  },

  rajasthan: {
    bestTime: "October to March (comfortable 20–28°C) — avoid April–June when Jaisalmer hits 45°C",
    visaInfo: "No visa required for Indian citizens. Carry Aadhaar or passport. Some heritage hotels ask for ID at check-in.",
    tips: ({ travelFrom }) => [
      `Fly into Jaipur (JAI) from ${travelFrom} or take the overnight Rajdhani Express — both are excellent options.`,
      "Jaipur → Jodhpur → Jaisalmer → Bikaner → back to Jaipur is the classic Rajasthan circuit. Allow 10 days minimum.",
      "Book heritage haveli hotels — in Jaisalmer especially, a fort-facing rooftop room is a core part of the experience.",
      "The Thar Desert safari (camel or jeep) is best done from Jaisalmer or Bikaner — skip the tourist traps near Sam Sand Dunes.",
      "Bargain at every fixed-price-less shop — except government emporiums. Start at 40% of the ask.",
      "Try the dal baati churma in Jodhpur and the pyaaz kachori in Jaipur. Both are transcendent.",
    ],
    flightBase: 5000,
    hotelBase: 2500,
    foodBase: 600,
    plans: [
      {
        theme: "Jaipur: The Pink City",
        morning: {
          time: "09:00 AM",
          activity: "Amber Fort",
          description: "The crown jewel of Jaipur. Walk up or take a jeep. The Sheesh Mahal (Hall of Mirrors) is incomprehensible — 1 candle appears as 1000.",
          estimatedCost: "₹500",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Hawa Mahal & Johri Bazaar",
          description: "The Hawa Mahal's 953 windows face east so the women of the court could see the street unseen. Walk the Johri Bazaar for silver jewellery and gems.",
          estimatedCost: "₹300",
        },
        evening: {
          time: "07:00 PM",
          activity: "Chokhi Dhani or Suvarna Mahal",
          description: "Chokhi Dhani is a kitsch Rajasthani village experience that tourists love — camel rides, folk dance, traditional thali. Or dinner at a palace hotel.",
          estimatedCost: "₹1,200",
        },
      },
      {
        theme: "Jodhpur: The Blue City",
        morning: {
          time: "09:00 AM",
          activity: "Mehrangarh Fort",
          description: "The finest fort in India — bar none. The museum inside is exceptional. The view of the blue city below is the postcard that defines Rajasthan.",
          estimatedCost: "₹600",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Jaswant Thada & Clock Tower Market",
          description: "The white marble cenotaph glows in the afternoon sun. Then walk the Clock Tower market for spices, turbans, and the famous Jodhpur mirchi bada.",
          estimatedCost: "₹200",
        },
        evening: {
          time: "07:00 PM",
          activity: "Rooftop Dinner with Fort View",
          description: "Several rooftop restaurants face the illuminated Mehrangarh. Order the laal maas (Rajasthani mutton curry) — it's what Jodhpur is known for.",
          estimatedCost: "₹900",
        },
      },
      {
        theme: "Jaisalmer: The Golden City",
        morning: {
          time: "09:00 AM",
          activity: "Jaisalmer Fort — Living Fort",
          description: "Unlike most forts, Jaisalmer is still inhabited — 3,000 people live inside. Walk the narrow lanes, visit the Jain temples, look over the desert.",
          estimatedCost: "₹300",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Patwon Ki Haveli & Nathmal Ki Haveli",
          description: "The carved yellow sandstone havelis of Jaisalmer are extraordinary. Patwon Ki is the grandest — five connected mansions from the 19th century.",
          estimatedCost: "₹200",
        },
        evening: {
          time: "04:30 PM",
          activity: "Thar Desert Camp — Camel Sunset",
          description: "Head to the dunes at Sam or Khuri. Camel ride at sunset, campfire, folk music, star gazing. The silence of the Thar at night is total.",
          estimatedCost: "₹2,500 (with overnight camp)",
        },
      },
    ],
  },

  maldives: {
    bestTime: "November to April (dry season, crystal visibility) — May–October has waves and rain",
    visaInfo: "30-day free visa on arrival for all nationalities including Indian passport holders.",
    tips: ({ travelFrom }) => [
      `Fly from ${travelFrom} to Malé (MLE) on IndiGo, Air India, or Emirates. Then a speedboat or seaplane to your resort.`,
      "Seaplanes are expensive (₹15,000–₹20,000 per person) but the transfer itself is a highlight — 15 minutes over the atolls.",
      "Book your resort package including meals (full board) — eating off-resort in the Maldives is expensive and logistically difficult.",
      "The overwater bungalow upgrade is worth it if this is a honeymoon or a once-in-a-decade trip.",
      "Bring your own snorkel — decent snorkelling starts right off the beach at most resorts.",
      "Book at least 3 months ahead for December–January dates — the best resorts sell out.",
    ],
    flightBase: 35000,
    hotelBase: 12000,
    foodBase: 2500,
    plans: [
      {
        theme: "Arrival & Island Orientation",
        morning: {
          time: "11:00 AM",
          activity: "Land at Malé International Airport",
          description: "Collect baggage and meet your resort transfer. The speedboat ride through the atolls is your first taste — turquoise water in every direction.",
          estimatedCost: "₹0 (resort transfer)",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Check-in & First Swim",
          description: "Change and get straight into the water. The lagoon at your resort is probably cleaner than any water you've seen. The fish don't move away.",
          estimatedCost: "₹0",
        },
        evening: {
          time: "07:00 PM",
          activity: "Overwater Sunset & Welcome Dinner",
          description: "Watch the sun sink into the Indian Ocean from your deck or the resort's sunset bar. The sky turns pink and purple. This is why you came.",
          estimatedCost: "₹3,000 (dinner)",
        },
      },
      {
        theme: "Snorkelling & House Reef",
        morning: {
          time: "08:00 AM",
          activity: "Morning Snorkel — House Reef",
          description: "Most resorts have a living reef just metres from the beach. Before 9am the visibility is best and the fish are most active — parrotfish, turtles, rays.",
          estimatedCost: "₹0 (own snorkel)",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Lagoon Activities",
          description: "Kayaking, paddleboarding, or glass-bottom boat tour if offered. The water is shallow, warm, and safe — even non-swimmers can enjoy it.",
          estimatedCost: "₹1,500",
        },
        evening: {
          time: "07:00 PM",
          activity: "Underwater Restaurant or Beach Dinner",
          description: "Some resorts have underwater restaurants — book ahead. Otherwise a beach dinner with torches and the stars above is equally extraordinary.",
          estimatedCost: "₹4,000",
        },
      },
      {
        theme: "Diving or Dolphin Cruise",
        morning: {
          time: "07:30 AM",
          activity: "Scuba Diving or Snorkel Excursion",
          description: "Reef dive with manta rays or whale sharks if season aligns. Even a beginner Discover Scuba session (no certification needed) is transformative.",
          estimatedCost: "₹5,000",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Spa Treatment",
          description: "Maldives resorts have among the world's best spa facilities. An overwater treatment room with the sound of the ocean below is a complete experience.",
          estimatedCost: "₹6,000",
        },
        evening: {
          time: "06:00 PM",
          activity: "Dolphin Sunset Cruise",
          description: "Almost every resort offers a dolphin cruise at sunset — spinner dolphins jump alongside the boat in the golden hour. Spectacular.",
          estimatedCost: "₹2,500",
        },
      },
    ],
  },

  singapore: {
    bestTime: "February to April and July to September — Singapore is year-round but these months are drier",
    visaInfo: "Indian passport holders on an e-Visa can get 30-day entry. Apply online at ICA website — takes 3–5 working days. Free.",
    tips: ({ travelFrom }) => [
      `Direct flights from ${travelFrom} to Singapore Changi (SIN) on Singapore Airlines, IndiGo, and Air India.`,
      "Changi Airport alone is worth 3 hours — Rain Vortex, butterfly garden, cinema. Land early and explore.",
      "The EZ-Link card covers all MRT and bus trips — get one at the airport. Singapore's public transport is world-class.",
      "Hawker centres (Maxwell Food Centre, Old Airport Road) serve extraordinary food for ₹200–₹400 per dish. This is how Singaporeans actually eat.",
      "Gardens by the Bay is best visited at sunset into evening — the Supertrees light up at 7:45pm and 8:45pm.",
      "Visit Sentosa for Universal Studios, beaches, and cable car — worth a full day.",
    ],
    flightBase: 30000,
    hotelBase: 5500,
    foodBase: 1200,
    plans: [
      {
        theme: "Arrival & Marina Bay",
        morning: {
          time: "11:00 AM",
          activity: "Arrive Changi Airport — Explore the Terminal",
          description: "The Rain Vortex in Terminal 3 is a 40m indoor waterfall. Allow 1 hour before heading to your hotel — it's genuinely worth your time.",
          estimatedCost: "₹0",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Marina Bay Sands & Helix Bridge",
          description: "Walk the Helix Bridge to Marina Bay Sands. The observation deck (SkyPark) gives the full Singapore skyline shot. The rooftop infinity pool is residents-only.",
          estimatedCost: "₹1,800 (deck)",
        },
        evening: {
          time: "07:45 PM",
          activity: "Gardens by the Bay — Supertrees Light Show",
          description: "The Supertree Grove at 7:45pm and 8:45pm: a 10-minute light and music show. Walk the OCBC Skyway between the trees for the aerial view.",
          estimatedCost: "₹1,500",
        },
      },
      {
        theme: "Hawker Culture & Cultural Districts",
        morning: {
          time: "09:00 AM",
          activity: "Maxwell Food Centre Breakfast",
          description: "Tian Tian Hainanese Chicken Rice (even at 9am), char kway teow, and a strong kopi. This is why you're in Singapore.",
          estimatedCost: "₹300",
        },
        afternoon: {
          time: "12:00 PM",
          activity: "Chinatown & Little India",
          description: "Singapore's Chinatown Heritage Centre tells the migrant story well. Then walk to Little India — the flower garland shops, Mustafa Centre, and temple.",
          estimatedCost: "₹400",
        },
        evening: {
          time: "07:00 PM",
          activity: "Clarke Quay & Singapore River",
          description: "The old godown warehouses are now bars and restaurants along Clarke Quay. Boat Quay is quieter and nicer — sit riverside and eat satay.",
          estimatedCost: "₹1,800",
        },
      },
      {
        theme: "Sentosa Island",
        morning: {
          time: "09:30 AM",
          activity: "Universal Studios Singapore",
          description: "If you have kids (or are one at heart): half a day at USS. Transformers, Battlestar Galactica, and Jurassic World are the headline rides.",
          estimatedCost: "₹5,500",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Siloso Beach & Cable Car",
          description: "Sentosa's beaches are man-made but genuinely pleasant. The Singapore cable car from HarbourFront offers a brilliant aerial view of the southern islands.",
          estimatedCost: "₹1,200",
        },
        evening: {
          time: "07:00 PM",
          activity: "Wings of Time Show",
          description: "The outdoor laser, water, and fire show at Siloso Beach is kitsch and spectacular. The 20-min Wings of Time production is a proper send-off for the evening.",
          estimatedCost: "₹700",
        },
      },
    ],
  },

  varanasi: {
    bestTime: "October to March (comfortable 15–25°C) — avoid the monsoon July–September",
    visaInfo: "No visa required for Indian citizens. Carry Aadhaar or Passport — some ghats and BHU campus ask for ID.",
    tips: ({ travelFrom }) => [
      `Fly from ${travelFrom} to Varanasi (VNS) or take the Kashi Vishwanath Express overnight — both work.`,
      "Stay on or near the ghats — it's worth paying more for a guesthouse with a Ganga-facing terrace.",
      "The Ganga Aarti at Dashashwamedh Ghat happens every evening at sunset. Arrive 30 minutes early to get a good position.",
      "Hire a boat for sunrise on the Ganga — the light on the ghats between 5:30–6:30am is unlike anything else in India.",
      "Do not eat meat near the Kashi Vishwanath temple complex — the area is strictly vegetarian.",
      "Varanasi's street food is exceptional: malaiyo (winter only), banarasi paan, thandai, and kachori sabzi at the ghats.",
    ],
    flightBase: 5500,
    hotelBase: 1800,
    foodBase: 500,
    plans: [
      {
        theme: "Ganga Aarti & First Evening",
        morning: {
          time: "10:00 AM",
          activity: "Arrive Varanasi — Check in at Ghat-Side Hotel",
          description: "Settle in. Walk to the nearest ghat and just watch. Nothing prepares you for the first sight of the Ganga — the width, the activity, the sound.",
          estimatedCost: "₹0",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Dashashwamedh Ghat & Kashi Vishwanath",
          description: "Walk the ghats from Dashashwamedh to Assi. Queue for the Kashi Vishwanath temple darshan — arrive early to avoid 2-hour waits.",
          estimatedCost: "₹200",
        },
        evening: {
          time: "06:30 PM",
          activity: "Ganga Aarti — Dashashwamedh Ghat",
          description: "Seven priests, synchronised lamps, the conch shell, and hundreds watching from the ghats and from boats on the river. Arrive 30 mins early. Sit near the front.",
          estimatedCost: "₹300 (boat viewing)",
        },
      },
      {
        theme: "Sunrise Boat Ride & Ghats",
        morning: {
          time: "05:30 AM",
          activity: "Sunrise Boat Ride on the Ganga",
          description: "This is the reason to come to Varanasi. The ghats in the first light — cremation fires still burning, priests beginning rituals, pilgrims bathing. Overwhelming and beautiful.",
          estimatedCost: "₹600 (private boat)",
        },
        afternoon: {
          time: "10:00 AM",
          activity: "Manikarnika Ghat — Cremation Ghat",
          description: "Manikarnika burns 24 hours a day. Walk nearby with a guide (not alone). This is a real place of death and transition — approach with reverence, not as spectacle.",
          estimatedCost: "₹200",
        },
        evening: {
          time: "07:00 PM",
          activity: "Street Food Walk: Kachori & Lassi",
          description: "Kachori sabzi at Kashi Chat Bhandar. Banarasi lassi at Blue Lassi shop in Kashi (the oldest lassi shop in India). Walk Vishwanath Gali for paan.",
          estimatedCost: "₹300",
        },
      },
      {
        theme: "Sarnath — Where Buddha Preached",
        morning: {
          time: "09:00 AM",
          activity: "Sarnath: Dhamek Stupa & Museum",
          description: "12km from Varanasi — where the Buddha gave his first sermon. The Dhamek Stupa (500 AD) and the Sarnath Museum (finest collection of Mauryan art in India).",
          estimatedCost: "₹300",
        },
        afternoon: {
          time: "01:00 PM",
          activity: "Ramnagar Fort",
          description: "The seat of the Maharaja of Benares across the river. The fort museum has vintage cars, weapons, and 18th-century Banarasi brocade. A forgotten gem.",
          estimatedCost: "₹200",
        },
        evening: {
          time: "06:30 PM",
          activity: "Final Ganga Aarti by Boat",
          description: "Your last evening — watch the aarti from the river by boat. You'll see it differently the second time. The sound of the bells and the fire on the water.",
          estimatedCost: "₹400",
        },
      },
    ],
  },

  santorini: {
    bestTime: "May, June, September, October — fewer crowds than July–August, same beauty",
    visaInfo: "Schengen Visa required for Indian passport holders. Apply at the Greece Visa Application Centre (VFS). Takes 15–20 working days. Requires bank statements, hotel bookings, and travel itinerary.",
    tips: ({ travelFrom }) => [
      `Fly from ${travelFrom} to Athens (ATH), then a 45-min domestic flight to Santorini (JTR) or a 8-hour ferry.`,
      "Stay in Oia or Imerovigli for the iconic caldera views — Fira is cheaper but noisier.",
      "The famous Oia sunset is crowded with 2,000+ people by 6pm in peak season. Walk to Imerovigli for a quieter version.",
      "Rent a quad bike or scooter to explore the island independently — the southern beaches (Perivolos, Red Beach) are beautiful.",
      "Book restaurants with caldera views at least 2 weeks ahead in summer — Ammoudi Fish Tavern (at the bottom of the 300 steps) is worth the hike.",
      "Try the local Assyrtiko white wine — Santorini's volcanic soil produces some of the world's most distinctive whites.",
    ],
    flightBase: 55000,
    hotelBase: 9000,
    foodBase: 2200,
    plans: [
      {
        theme: "Arrival & Fira Exploration",
        morning: {
          time: "11:00 AM",
          activity: "Arrive Santorini Airport — Transfer to Oia/Fira",
          description: "The drive from the airport to Oia takes 30 minutes. Your first view of the caldera — the drowned volcano — will stop you mid-sentence.",
          estimatedCost: "₹1,200 (taxi)",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Fira Town & Caldera Walk",
          description: "Walk the cliff-side path from Fira toward Imerovigli. The caldera drops 300m into the sea. The white-and-blue geometry of the houses against the Aegean.",
          estimatedCost: "₹0",
        },
        evening: {
          time: "07:30 PM",
          activity: "Caldera-View Restaurant & Wine",
          description: "Most restaurants on the caldera rim charge for the view — it's worth it once. Order grilled octopus, fava dip, and a bottle of Assyrtiko.",
          estimatedCost: "₹4,000",
        },
      },
      {
        theme: "Oia & The Iconic Sunset",
        morning: {
          time: "09:00 AM",
          activity: "Oia Morning Walk",
          description: "Walk Oia before 10am when the cruise tourists haven't arrived. The blue-domed churches are quieter and more beautiful without 500 people in front of them.",
          estimatedCost: "₹0",
        },
        afternoon: {
          time: "12:00 PM",
          activity: "Red Beach & Perivolos",
          description: "Rent a quad and drive to the Red Beach (unique volcanic red cliffs) and then the black-sand beaches of Perivolos in the south. Swim at both.",
          estimatedCost: "₹1,500 (quad rental)",
        },
        evening: {
          time: "06:30 PM",
          activity: "Oia Sunset — Castle Ruins",
          description: "The Byzantine castle ruins in Oia are the sunset viewing point. Arrive 90 minutes early. Bring wine. When the sun touches the caldera and goes orange-gold: that's Santorini.",
          estimatedCost: "₹0 (BYOB wine ₹800)",
        },
      },
      {
        theme: "Caldera Boat Tour",
        morning: {
          time: "09:30 AM",
          activity: "Caldera Boat Tour — Hot Springs",
          description: "Catamaran or classic boat tour around the caldera: swim at the volcanic hot springs (muddy, warm, sulphuric — completely unique), see the active volcano crater.",
          estimatedCost: "₹4,500",
        },
        afternoon: {
          time: "02:00 PM",
          activity: "Akrotiri Prehistoric Site",
          description: "The Pompeii of the Bronze Age — a perfectly preserved Minoan town buried by the same eruption that formed the caldera. Remarkably atmospheric.",
          estimatedCost: "₹700",
        },
        evening: {
          time: "07:30 PM",
          activity: "Ammoudi Bay Seafood Dinner",
          description: "Descend the 300 steps (or take a donkey) to Ammoudi Bay below Oia. The tavernas serve the freshest seafood on the island. Sunset from sea level.",
          estimatedCost: "₹3,500",
        },
      },
    ],
  },
};

function normalizeDestination(dest: string): string {
  return dest.toLowerCase().trim();
}

function getDestinationData(destination: string): DestinationData | null {
  const key = normalizeDestination(destination);
  for (const [k, v] of Object.entries(destinationData)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

const genericFallback: DestinationData = {
  bestTime: "October to April (dry season with comfortable temperatures)",
  visaInfo: "Check visa requirements for your destination country on the official embassy website before booking.",
  tips: ({ destination, travelFrom }) => [
    `Book flights from ${travelFrom} to ${destination} at least 6 weeks in advance for the best fares.`,
    "Download offline maps before you leave — data roaming charges add up fast.",
    "Carry a mix of local currency and a travel card — not all vendors accept cards.",
    "Travel insurance is non-negotiable for international trips. Budget ₹500–₹1,500 per person.",
    `Best area to stay in ${destination} for first-time visitors: the city centre — saves on transport.`,
    "Photo IDs are often required at heritage sites and some accommodation — keep a printout handy.",
  ],
  flightBase: 28000,
  hotelBase: 3500,
  foodBase: 1200,
  plans: [
    {
      theme: "Arrival & Orientation",
      morning: {
        time: "09:00 AM",
        activity: "Arrival & Hotel Check-in",
        description: "Land and transfer to your hotel. Freshen up and plan the day over a good breakfast.",
        estimatedCost: "₹0",
      },
      afternoon: {
        time: "01:00 PM",
        activity: "City Centre Exploration",
        description: "Walk the main thoroughfare. Grab lunch at a local eatery — go for the regional specialty.",
        estimatedCost: "₹800",
      },
      evening: {
        time: "07:00 PM",
        activity: "Welcome Dinner",
        description: "Find a rooftop or waterfront restaurant with views. Order the local signature dish.",
        estimatedCost: "₹1,500",
      },
    },
    {
      theme: "Culture & Heritage",
      morning: {
        time: "08:00 AM",
        activity: "Major Heritage Site",
        description: "Visit the most iconic cultural landmark. Arrive early to beat crowds.",
        estimatedCost: "₹500",
      },
      afternoon: {
        time: "02:00 PM",
        activity: "Local Market Walk",
        description: "Explore the main bazaar or artisan market. Pick up local crafts, spices, or snacks.",
        estimatedCost: "₹600",
      },
      evening: {
        time: "06:30 PM",
        activity: "Sunset Viewpoint",
        description: "Head to the best sunset spot in the area. Bring a camera — golden hour here is exceptional.",
        estimatedCost: "₹200",
      },
    },
    {
      theme: "Nature & Adventure",
      morning: {
        time: "07:00 AM",
        activity: "Nature Walk / Trekking",
        description: "Early morning hike or nature excursion before the heat sets in.",
        estimatedCost: "₹1,200",
      },
      afternoon: {
        time: "01:30 PM",
        activity: "Outdoor Activity",
        description: "An afternoon of active exploration — guided tour, water sports, or a cycling excursion.",
        estimatedCost: "₹2,500",
      },
      evening: {
        time: "07:00 PM",
        activity: "Night Market / Street Food",
        description: "Evening at the local night market. Street food, live music, and the real local atmosphere.",
        estimatedCost: "₹800",
      },
    },
    {
      theme: "Day Trip",
      morning: {
        time: "08:30 AM",
        activity: "Excursion to Nearby Attraction",
        description: "Full day trip to a neighbouring landmark or village within 1–2 hours.",
        estimatedCost: "₹1,500",
      },
      afternoon: {
        time: "12:30 PM",
        activity: "Lunch at Local Restaurant",
        description: "Stop at a well-regarded local restaurant. Order the lunch special or regional set menu.",
        estimatedCost: "₹700",
      },
      evening: {
        time: "06:00 PM",
        activity: "Return & Leisure",
        description: "Return and relax at the hotel or explore the neighbourhood independently.",
        estimatedCost: "₹300",
      },
    },
    {
      theme: "Shopping & Last Day",
      morning: {
        time: "10:00 AM",
        activity: "Slow Morning & Café",
        description: "Late start. Breakfast at a well-reviewed local café. No rushing today.",
        estimatedCost: "₹500",
      },
      afternoon: {
        time: "01:00 PM",
        activity: "Shopping District",
        description: "Browse the best retail area — from local boutiques to street markets.",
        estimatedCost: "₹3,000",
      },
      evening: {
        time: "07:30 PM",
        activity: "Farewell Dinner",
        description: "Special dinner at a highly-rated restaurant. Celebrate the trip with the best meal of your stay.",
        estimatedCost: "₹2,500",
      },
    },
  ],
};

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

  const destData = getDestinationData(destination) || genericFallback;
  const styleMultiplier = budgetStyle === "budget" ? 1 : budgetStyle === "mid-range" ? 1.8 : 3;

  const budget: BudgetBreakdown = {
    flights: Math.round(destData.flightBase * styleMultiplier * travelers),
    hotels: Math.round(destData.hotelBase * days * styleMultiplier * travelers * 0.5),
    food: Math.round(destData.foodBase * days * styleMultiplier * travelers),
    activities: Math.round((destData.foodBase * 1.5) * days * styleMultiplier * travelers * 0.6),
    transport: Math.round((destData.foodBase * 0.5) * days * styleMultiplier * travelers * 0.4),
    miscellaneous: Math.round((destData.foodBase * 0.7) * days * styleMultiplier * travelers * 0.3),
  };

  const planTemplate = destData.plans;
  const days_plan: ItineraryDay[] = Array.from({ length: Math.min(days, 10) }, (_, i) => {
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

  const tips = destData.tips({ destination, travelFrom });

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
    bestTimeToVisit: destData.bestTime,
    visaInfo: destData.visaInfo,
  };
}
