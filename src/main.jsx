import React from "react";
import { createRoot } from "react-dom/client";
import { setupIonicReact, IonApp, IonContent, isPlatform } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./index.css";
import App from "./App.jsx";

// 1. Determine the mode (URL override > Device Detection > Default to MD)
const searchParams = new URLSearchParams(window.location.search);
const urlMode = searchParams.get("ionic:mode");

// isPlatform('ios') detects actual iPhone/iPad hardware/simulators
const selectedMode = urlMode || (isPlatform("ios") ? "ios" : "md");

// Ensure Bootstrap respects Ionic's font family across all platforms
document.documentElement.style.setProperty(
  "--bs-body-font-family",
  "var(--ion-font-family)",
);

// Force dark theme globally for both Bootstrap and Ionic
document.documentElement.setAttribute("data-bs-theme", "dark");
document.documentElement.classList.add("ion-palette-dark"); // Ionic 8+ dark mode
document.body.classList.add("dark"); // Ionic 7 and older dark mode

setupIonicReact({
  mode: selectedMode,
  animated: true,
});

if (selectedMode !== "ios") {
  // Use ?inline to prevent Vite from unconditionally extracting and injecting the CSS on all platforms
  import("./theme/md3/theme.css?inline")
    .then((module) => {
      const style = document.createElement("style");
      style.textContent = module.default;
      document.head.appendChild(style);
      document.documentElement.classList.add("md3-loaded");
    })
    .catch((err) => console.error("MD3 Load Error:", err));
}
/*
const selectedMode = isPlatform('ios') ? 'ios' : 'md';

setupIonicReact({
  mode: selectedMode,
  animated: true
});

if (selectedMode === 'md') {import('./theme/md3/theme.css')}; */

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <IonApp>
      <App />
    </IonApp>
  </React.StrictMode>,
);
