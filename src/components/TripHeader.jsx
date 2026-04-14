import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { isPlatform, IonBadge } from "@ionic/react";
import { motion } from "motion/react";
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

  return (<>
    <header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "var(--md-sys-surface-container)",
        borderBottom: "1px solid var(--md-sys-outline)",
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--md-sys-primary)",
          padding: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IonBadge slot="start" className="px-1">
            NEXT UP
          </IonBadge>
          <motion.div
            style={{
              color: "var(--md-sys-on-primary)",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "wrap",
            }}
            key={nextActivity.time + nextActivity.title} initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0, transition: { duration: 0.2 }}} transition={{ type: "spring" }}
          >
            {nextActivity.time} — {nextActivity.title}
          </motion.div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "var(--md-sys-surface-container-high)",
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
          <ProgressBar className="custom-bar"
            now={percent}
            variant="warning"
            style={{
              height: "7px",
              width: "100%",
              backgroundColor: "var(--md-sys-surface-variant)",
            }}
          />
          
        </div>
      </div>
    </header>
    </>
  );
}
