export interface TravelOption {
  mode: string;
  provider: string;
  route: string;
  estimatedCost: string;
  duration: string;
  bookingTip: string;
}

export interface PlaceToVisit {
  name: string;
  category: string;
  description: string;
  estimatedTime: string;
  estimatedCost: string;
  tip: string;
}

export interface HotelRecommendation {
  name: string;
  category: "budget" | "mid-range" | "luxury";
  pricePerNight: string;
  location: string;
  description: string;
}

export interface VisaInfo {
  required: boolean;
  type: string;
  cost: string;
  processingTime: string;
  documents: string[];
  notes: string;
}

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

export interface TripPlan {
  destination: string;
  travelFrom: string;
  days: number;
  travelers: number;
  tripType: string;
  currency: string;
  budgetStyle: string;
  bestTimeToVisit: string;
  travelOptions: TravelOption[];
  placesToVisit: PlaceToVisit[];
  hotels: HotelRecommendation[];
  visa: VisaInfo;
  daysPlan: ItineraryDay[];
  budget: BudgetBreakdown;
  travelTips: string[];
  culturalTips: string[];
  dosAndDonts: { dos: string[]; donts: string[] };
}
