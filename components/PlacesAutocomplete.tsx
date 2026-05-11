"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  types?: string[];
  required?: boolean;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    initGooglePlaces?: () => void;
  }
}

let scriptLoaded = false;
let scriptLoading = false;
const callbacks: (() => void)[] = [];

function loadGoogleMapsScript(apiKey: string, onLoad: () => void) {
  if (scriptLoaded) { onLoad(); return; }
  callbacks.push(onLoad);
  if (scriptLoading) return;
  scriptLoading = true;

  window.initGooglePlaces = () => {
    scriptLoaded = true;
    callbacks.forEach((cb) => cb());
    callbacks.length = 0;
  };

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGooglePlaces`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export default function PlacesAutocomplete({
  value,
  onChange,
  placeholder = "City, country, or airport",
  className = "",
  types = ["(cities)"],
  required = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google?.maps?.places) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ac = new (window.google as any).maps.places.Autocomplete(
      inputRef.current,
      { types, fields: ["name", "formatted_address"] }
    );
    autocompleteRef.current = ac;
    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (place?.name) onChange(place.name);
    });
    setReady(true);
  }, [onChange, types]);

  useEffect(() => {
    if (!apiKey) { setReady(true); return; }
    if (typeof window !== "undefined" && window.google?.maps?.places) {
      initAutocomplete();
    } else {
      loadGoogleMapsScript(apiKey, initAutocomplete);
    }
  }, [apiKey, initAutocomplete]);

  return (
    <input
      ref={inputRef}
      type="text"
      required={required}
      placeholder={ready && apiKey ? placeholder : placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      autoComplete={apiKey ? "off" : "on"}
    />
  );
}
