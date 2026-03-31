import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
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
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </HashRouter>
  );
}
