import React from "react";
import { GUIDE_DATA } from "../data/itinerary";
import Details from "./Details.jsx";

export default function GuideView({ guides }) {
  const displayGuides = guides && guides.length > 0 ? guides : GUIDE_DATA;

  return (
    <div style={{ padding: "16px 8px", animation: "fadeIn 0.3s ease" }}>
      <h2
        style={{
          fontWeight: "800",
          marginBottom: "16px",
          color: "#fff",
        }}
        className="text-center fs-1"
      >
        How to do anything
        <hr />
      </h2>
      {displayGuides.map((guide) => (
        <div
          key={guide.id || guide.title} // Use the ID if possible
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #444",
            marginBottom: "12px",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <h5
            style={{
              color: "#0ea5e9",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            <Details title={guide.title}>{guide.content}</Details>
          </h5>
        </div>
      ))}
    </div>
  );
}
