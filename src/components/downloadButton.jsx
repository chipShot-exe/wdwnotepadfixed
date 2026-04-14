import React, { useState } from "react";
import { IonButton, IonIcon, isPlatform } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileTransfer } from "@capacitor/file-transfer";
import { Modal } from "react-bootstrap";

const DownloadButton = ({ children, bsclasses }) => {
  const [showAlert, setShowAlert] = useState(false);
  const handleDownload = async () => {
    if (isPlatform("hybrid")) {
      try {
        const fileInfo = await Filesystem.getUri({
          directory: Directory.Downloads,
          path: "example-data.json",
        });

        await FileTransfer.downloadFile({
          url: "/src/data/moredata.json",
          path: fileInfo.uri,
          progress: true,
        });
      } catch (error) {
        console.error("Error downloading:", error);
      }
    } else {
      const link = document.createElement("a");
      link.href = "/src/data/moredata.json";
      link.setAttribute("download", "example-data.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowAlert(true);
  };

  return (
    <>
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header>
          <Modal.Title>File downloaded.</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <IonButton onClick={() => setShowAlert(false)}>OK</IonButton>
        </Modal.Footer>
      </Modal>
      <IonButton onClick={handleDownload} fill="outline" className={bsclasses}>
        <IonIcon slot="start" icon={downloadOutline} />
        {children}
      </IonButton>
    </>
  );
};

export default DownloadButton;
