import React from "react";
import Details from "./Details.jsx";
import Checkbox from "./Checkbox.jsx";
import { motion } from "motion/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
export default function ActivityCard({
  activity,
  isCompleted,
  onToggleCompletion,
  isNextUp,
}) {
  const {
    time = "",
    title = "",
    notes = "",
    id = "",
    type = "",
  } = activity || {};
  const cardClasses = `mb-3 rounded-3 overflow-hidden border transition-all overflowHidden ${
    isCompleted ? "bg-black opacity-60" : "bg-dark"
  } ${isNextUp ? "border-warning border-3" : "border-dark"}`;
const MotionCard = motion(IonCard);
  return (
    <MotionCard layout
      className={cardClasses}
      style={{
        transition: "all 0.3s ease",
        backgroundColor: "var(--ion-color-step-150)",
        color: "var(--ion-color-step-900)",
      }}
      viewport={{ amount: 0}}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.007, ease: "easeInOut" }}
    >
      <div
        style={{ borderLeft: `5px solid var(--cat-${type})` }}
        className="px-3 py-1"
      >
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <IonCardHeader>
              <IonCardSubtitle
                className={`text-info ${isCompleted ? 'opacity-60' : 'opacity-100'}`}
              >
                {time}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <Checkbox
                id={`task-${id}`}
                toggleCompletion={onToggleCompletion}
                isCompleted={isCompleted}
                style={{ height: "60%" }}
              >
                <span
                  className={isCompleted ? "text-decoration-line-through" : ""}
                  style={{}}
                >
                  {title}
                </span>
              </Checkbox>
              {notes && (
                <div className={isCompleted ? "d-none" : "d-block"}>
                  <Details title="Details">{notes}</Details>
                </div>
              )}
            </IonCardContent>
          </div>
        </div>
      </div>
    </MotionCard>
  );
}
