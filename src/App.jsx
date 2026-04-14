import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { IonReactHashRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import Homepage from "./Homepage.jsx";
import AdminPage from "./AdminPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Capacitor } from "@capacitor/core";

export default function App() {
  useEffect(() => {
    const platform = Capacitor.getPlatform();
    document.body.classList.add(`platform-${platform}`);
  }, []);

  return (
    <IonReactHashRouter>
      <IonRouterOutlet>
        <Route path="/admin" component={AdminPage} />
        <Route path="/" component={Homepage} />
      </IonRouterOutlet>
    </IonReactHashRouter>
  );
}
