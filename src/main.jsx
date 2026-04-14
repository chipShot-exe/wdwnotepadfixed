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

const selectedMode = "md";
document.documentElement.style.setProperty(
  "--bs-body-font-family",
  "var(--ion-font-family)",
);

document.documentElement.setAttribute("data-bs-theme", "dark");
document.documentElement.classList.add("ion-palette-dark");
document.body.classList.add("dark");

setupIonicReact({
  mode: selectedMode,
  animated: true,
});

import("./theme/md3/theme.css?inline")
  .then((module) => {
    const style = document.createElement("style");
    style.textContent = module.default;
    document.head.appendChild(style);
    document.documentElement.classList.add("md3-loaded");
  })
  .catch((err) => console.error("MD3 Load Error:", err));
/* iOS LOGIC REMOVED FOR TESTING
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
