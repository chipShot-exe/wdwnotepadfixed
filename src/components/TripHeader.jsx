import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { isPlatform, IonBadge } from "@ionic/react";
export default function TripHeader({
  currentDay,
  progress,
  percent,
  complete,
  total,
}) {
  const nextActivity = currentDay.schedule.find((act) => !progress[act.id]) || {
    time: "✨",
    title: "Day Complete!",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "var(--ion-background-color-step-950)",
        borderBottom: "1px solid #444",
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: isPlatform("ios")
            ? "var(--md-ref-palette-primary40)"
            : "#6138e9",
          padding: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IonBadge slot="start" className="px-1">
            NEXT UP
          </IonBadge>
          <div
            style={{
              color: "#fff",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "wrap",
            }}
          >
            {nextActivity.time} — {nextActivity.title}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "var(--ion-background-color-step-900)",
          padding: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
        className="text-center"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {" "}
          {complete}/{total} complete ({percent}%)
          <ProgressBar
            now={percent}
            variant="warning"
            style={{
              height: "7px",
              width: "100%",
              backgroundColor: " var(--clr-surface-a20)",
            }}
          />
        </div>
      </div>
    </header>
  );
}
