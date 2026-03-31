import { useState, useEffect } from "react";
import { loadFromDevice } from "../utils/storage";
// These names MUST match the "export const" names in itinerary.js
import {
  DISNEY_TRIP_DATA,
  GUIDE_DATA,
  familyName as initialFamily,
} from "../data/itinerary";

export function useAppData() {
  // Use the correct imported names here
  const [itinerary, setItinerary] = useState(DISNEY_TRIP_DATA || []);
  const [guides, setGuides] = useState(GUIDE_DATA || []);
  const [familyName, setFamilyName] = useState(initialFamily || "Example");
  const [isExample, setIsExample] = useState(true);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    async function init() {
      try {
        const savedData = await loadFromDevice();
        if (savedData && savedData.itinerary) {
          // Unpack the "Master Object" from the JSON import
          setItinerary(savedData.itinerary);
          setGuides(savedData.guides || []);
          setFamilyName(savedData.familyName || "Guest");
          setIsExample(false);
        }
      } catch (error) {
        console.log("No saved data found, using defaults");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  return { itinerary, guides, familyName, isExample, loading };
}
