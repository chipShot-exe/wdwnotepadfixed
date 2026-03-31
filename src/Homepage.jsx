import React, { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import TripHeader from "./components/TripHeader.jsx";
import DayNavigation from "./components/DayNavigation.jsx";
import ActivityCard from "./components/ActivityCard.jsx";
import GuideView from "./components/GuideView.jsx";
import { Container, Modal, CloseButton } from "react-bootstrap";
import { useAppData } from "./hooks/useAppData.js";
import FileImporter from "./components/FileImporter.jsx";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonTab,
  IonToolbar,
  IonTitle,
  isPlatform,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { calendarOutline, informationCircleOutline } from "ionicons/icons";
import { Capacitor } from "@capacitor/core";
export default function Homepage() {
  const { itinerary, guides, isExample, loading, familyName } = useAppData();

  const [showModal, setShowModal] = useState(false);
  const [dayIdx, setDayIdx] = useState(0);
  const [progress, setProgress] = useLocalStorage("disney_progress_v1", {});
  const isPhysicalMobile = isPlatform("ios") || isPlatform("android");
  const isForcedMobile = window.location.search.includes("ionic:mode=");
  const useMobileUI =
    isPhysicalMobile || isForcedMobile || window.innerWidth <= 1024;
  useEffect(() => {
    if (!loading && isExample) {
      setShowModal(true);
    }
  }, [loading, isExample]);

  const handleCloseModal = () => setShowModal(false);

  const handleToggle = (id) => {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hasItinerary = Array.isArray(itinerary) && itinerary.length > 0;
  const currentDay = hasItinerary ? itinerary[dayIdx] : null;

  if (loading) {
    return <div className="p-5 text-white text-center">Loading Trip...</div>;
  }
  if (!hasItinerary) {
    return (
      <div className="p-5 text-white text-center">
        <h1>No Data</h1>
        <p>Please upload a trip file to begin.</p>
        <FileImporter />
      </div>
    );
  }

  const totalTasks = currentDay?.schedule?.length || 0;
  const completedTasks =
    currentDay?.schedule?.filter((item) => progress[item.id]).length || 0;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const nextTask = currentDay?.schedule?.find((item) => !progress[item.id]);

  return (
    <>
      {!useMobileUI ? (
        <div>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            centered
            data-bs-theme="dark"
          >
            <Modal.Header
              className="text-dark"
              style={{ background: "var(--ion-color-warning-shade)" }}
            >
              <Modal.Title className="fw-bold">No data uploaded</Modal.Title>
              <CloseButton data-bs-theme="light" onClick={handleCloseModal} />
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
              You have not yet uploaded trip data. <strong>Upload Data</strong>{" "}
              below, or use the example data to see the app's function. You can
              still upload by scrolling to the bottom of the page at any time.
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <FileImporter variant="primary">
                {" "}
                <i className="bi bi-file-earmark-arrow-up"></i> Upload Data
              </FileImporter>
              <IonButton color="secondary" onClick={handleCloseModal}>
                Close
              </IonButton>
            </Modal.Footer>
          </Modal>{" "}
        </div>
      ) : (
        <div>
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonHeader>
              <IonToolbar color="warning">
                <IonButtons slot="start">
                  <FileImporter variant="primary">
                    {" "}
                    <i className="bi bi-file-earmark-arrow-up"></i> Upload Data
                  </FileImporter>
                </IonButtons>
                <IonTitle>No data uploaded</IonTitle>
                <IonButtons slot="end">
                  <IonButton color="light" onClick={() => setShowModal(false)}>
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color="dark">
              <p>
                You have not yet uploaded trip data.{" "}
                <strong>Upload Data</strong> below, or use the example data to
                see the app's function. You can still upload by scrolling to the
                bottom of the page at any time.
              </p>
            </IonContent>
          </IonModal>{" "}
        </div>
      )}

      <IonTabs>
        <IonTabBar slot="top">
          <IonTabButton tab="schedule">
            <IonIcon aria-hidden="true" icon={calendarOutline} />
            <IonLabel>SCHEDULE</IonLabel>
          </IonTabButton>
          <IonTabButton tab="guides">
            <IonIcon aria-hidden="true" icon={informationCircleOutline} />
            <IonLabel>GUIDES</IonLabel>
          </IonTabButton>
        </IonTabBar>

        <IonTab tab="schedule">
          <IonContent>
            <TripHeader
              currentDay={currentDay}
              progress={progress}
              percent={percentage}
              complete={completedTasks}
              total={totalTasks}
              familyName={familyName}
            />
            <Container fluid="md" className="py-3">
              <DayNavigation
                days={itinerary}
                selectedIndex={dayIdx}
                onSelect={setDayIdx}
              />

              <div className="my-4">
                <h2 style={{ fontSize: "2rem", fontWeight: "900" }}>
                  {currentDay?.parkName}
                </h2>
                <span className="badge bg-secondary">
                  {currentDay?.dateString}
                </span>
              </div>

              <div className="activity-list">
                {currentDay?.schedule?.map((item) => (
                  <ActivityCard
                    key={item.id}
                    activity={item}
                    isCompleted={!!progress[item.id]}
                    isNextUp={item.id === nextTask?.id}
                    onToggleCompletion={() => handleToggle(item.id)}
                  />
                ))}
              </div>
              <div className="text-center mt-2 mb-5">
                <FileImporter variant="outline-light">
                  Import New Data File
                </FileImporter>
              </div>
            </Container>
          </IonContent>
        </IonTab>
        <IonTab tab="guides">
          <IonContent>
            <TripHeader
              currentDay={currentDay}
              progress={progress}
              percent={percentage}
              complete={completedTasks}
              total={totalTasks}
              familyName={familyName}
            />
            <Container fluid="md" className="py-3">
              <GuideView guides={guides} />
              <div className="text-center mt-2 mb-5">
                <FileImporter variant="outline-light">
                  Import New Data File
                </FileImporter>
              </div>
            </Container>
          </IonContent>
        </IonTab>
      </IonTabs>
    </>
  );
}
