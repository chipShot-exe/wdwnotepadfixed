import React from "react";

export default function Checkbox({
  children,
  toggleCompletion,
  isCompleted,
  id,
}) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        className="task-checkbox"
        checked={isCompleted}
        onChange={toggleCompletion}
      />
      <label htmlFor={id} className="checkbox-label">
        <div className="checkbox-box">
          <div className="checkbox-fill" />
          <div className="checkmark">
            <svg viewBox="0 0 24 24" className="check-icon">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <div className="success-ripple" />
        </div>
        <span className="checkbox-text">{children}</span>
      </label>
    </div>
  );
}
