import React from "react";
import { IonButton } from "@ionic/react";
import { saveFile } from "../utils/storage";

export default function FileImporter({ children, bsclasses, variant }) {
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target.result);

        await saveFile(json);

        alert("Trip Imported Successfully!");

        // Refresh the page to let useAppData grab the new data
        window.location.reload();
      } catch (err) {
        alert("Error: That doesn't look like a valid Disney JSON file.");
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      {/* We hide the ugly default input and trigger it via a nice button */}
      <input
        type="file"
        id="fileInput"
        accept=".json"
        onChange={handleFileImport}
        style={{ display: "none" }}
      />
      <IonButton
        size=""
        onClick={() => document.getElementById("fileInput").click()}
      >
        {children ? <>{children}</> : <>Import File</>}
      </IonButton>
    </div>
  );
}
