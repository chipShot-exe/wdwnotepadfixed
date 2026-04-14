import { useState, useEffect } from "react";
import { loadFromDevice } from "../utils/storage";
import initialData from "../data/moredata.json";

export function useAppData() {
  const [itinerary, setItinerary] = useState(initialData.DISNEY_TRIP_DATA || []);
  const [guides, setGuides] = useState(initialData.GUIDE_DATA || []);
  const [familyName, setFamilyName] = useState(initialData.familyName || "Example");
  const [isExample, setIsExample] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const savedData = await loadFromDevice();
        if (savedData && savedData.DISNEY_TRIP_DATA) {
          setItinerary(savedData.DISNEY_TRIP_DATA);
          setGuides(savedData.GUIDE_DATA || []);
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
