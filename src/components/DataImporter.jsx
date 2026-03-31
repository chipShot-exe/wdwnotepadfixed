import React from "react";
import { Button, Form } from "react-bootstrap";
import { saveFile } from "../utils/storage"; // The utility we discussed

export default function DataImporter({ onImportSuccess }) {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);

        // 1. Save to the permanent "drawer"
        await saveFile(jsonContent);

        alert("Trip updated successfully! ✨");

        // 2. Trigger a refresh in the parent component
        if (onImportSuccess) onImportSuccess(jsonContent);
      } catch (err) {
        alert("Oops! That file doesn't look like a valid Disney itinerary.");
        console.error("Import Error:", err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-3 border border-secondary rounded bg-dark mt-4">
      <Form.Group>
        <Form.Label className="text-info fw-bold">
          Import New Itinerary
        </Form.Label>
        <Form.Control
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="bg-secondary text-white border-0"
        />
        <Form.Text className="text-muted">
          Select the .json file sent by the Admin.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
