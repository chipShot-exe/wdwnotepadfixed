import React from "react";
import { IonButton } from "@ionic/react";
export default function DayNavigation({ days, selectedIndex, onSelect }) {
  return (
    <div className="m-2 my-0">
      <div
        style={{
          display: "flex",
          gap: "8px",
          paddingBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        {days.map((day, index) => (
          <IonButton
            key={day.id || index}
            onClick={() => onSelect(index)}
            shape="round"
            fill={selectedIndex === index ? "solid" : "outline"}
            color={selectedIndex === index ? "primary" : "secondary"}
          >
            Day {index + 1}
          </IonButton>
        ))}
      </div>
    </div>
  );
}
