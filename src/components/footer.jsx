import React from "react";
import { IonRow, IonCol, IonText } from "@ionic/react";
 import FileImporter from "./FileImporter.jsx";
 import DownloadButton from "./downloadButton.jsx";

 export default function Footer() {
  const now = new Date();
  const displayDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

return (
    <>
      <div className="my-2">
        <IonRow className="ion-justify-content-center">
                  <IonCol size="auto">
                    <FileImporter variant="outline-light" bsclasses="my-2 mx-1">
                      Import New Data File
                    </FileImporter>
                  </IonCol>
                  <IonCol size="auto">
                    <DownloadButton bsclasses="my-2 mx-1">Or download a template</DownloadButton>
                  </IonCol>
                </IonRow>
      </div>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto" className="mt-3 mb-1">
          <IonText>{displayDate}</IonText>
        </IonCol>
      </IonRow>
    </>
  );
}