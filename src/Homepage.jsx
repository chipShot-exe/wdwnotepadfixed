import React, { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import TripHeader from "./components/TripHeader.jsx";
import DayNavigation from "./components/DayNavigation.jsx";
import ActivityCard from "./components/ActivityCard.jsx";
import GuideView from "./components/GuideView.jsx";
import { Container, Modal, CloseButton } from "react-bootstrap";
import { useAppData } from "./hooks/useAppData.js";
import FileImporter from "./components/FileImporter.jsx";
import { 
  isPlatform, 
  IonButton, 
  IonModal, 
  IonHeader, 
  IonContent, 
  IonToolbar, 
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon
} from "@ionic/react";
import Footer from "./components/footer.jsx";
import { calendarOutline, informationCircleOutline } from "ionicons/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Homepage() {
  const { itinerary, guides, isExample, loading, familyName } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("schedule");
  const swiperRef = useRef(null);

  const isPhysicalMobile = isPlatform("ios") || isPlatform("android");
  const isForcedMobile = window.location.search.includes("ionic:mode=");
  const useMobileUI = isPhysicalMobile || isForcedMobile || window.innerWidth <= 1024;

  useEffect(() => {
    if (!loading && isExample) {
      setShowModal(true);
    }
  }, [loading, isExample]);

  const handleCloseModal = () => setShowModal(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (swiperRef.current) {
      swiperRef.current.slideTo(tab === "schedule" ? 0 : 1);
    }
  };

  const hasItinerary = Array.isArray(itinerary) && itinerary.length > 0;

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment 
            value={activeTab} 
            onIonChange={(e) => handleTabChange(e.detail.value)}
          >
            <IonSegmentButton value="schedule">
              <IonIcon icon={calendarOutline} />
              <IonLabel>SCHEDULE</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="guides">
              <IonIcon icon={informationCircleOutline} />
              <IonLabel>GUIDES</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex === 0 ? "schedule" : "guides")}
          style={{ width: '100%', height: '100%' }}
        >
          <SwiperSlide>
            <SchedulePage itinerary={itinerary} familyName={familyName} />
          </SwiperSlide>
          <SwiperSlide>
            <GuidesPage itinerary={itinerary} guides={guides} familyName={familyName} />
          </SwiperSlide>
        </Swiper>
      </IonContent>
      {!useMobileUI ? (
        <Modal show={showModal} onHide={handleCloseModal} centered data-bs-theme="dark">
          <Modal.Header className="text-dark" style={{ background: "var(--ion-color-warning-shade)" }}>
            <Modal.Title className="fw-bold">No data uploaded</Modal.Title>
            <CloseButton data-bs-theme="light" onClick={handleCloseModal} />
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            You have not yet uploaded trip data. <strong>Upload Data</strong> below.
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <FileImporter variant="primary">
              <i className="bi bi-file-earmark-arrow-up"></i> Upload Data
            </FileImporter>
            <IonButton color="secondary" onClick={handleCloseModal}>Close</IonButton>
          </Modal.Footer>
        </Modal>
      ) : (
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar color="warning">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px" }}>
                <FileImporter variant="light" styles={{ margin: 0 }}>
                  <i className="bi bi-file-earmark-arrow-up"></i> Upload
                </FileImporter>
                <ion-title>No data uploaded</ion-title>
                <IonButton fill="clear" color="dark" onClick={() => setShowModal(false)}>Close</IonButton>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent color="dark" className="ion-padding">
            <p>You have not yet uploaded trip data. <strong>Upload Data</strong> below.</p>
          </IonContent>
        </IonModal>
      )}
    </IonPage>
  );
}

const SchedulePage = ({ itinerary, familyName }) => {
  const [dayIdx, setDayIdx] = useLocalStorage("disney_day_idx", 0);
  const [progress, setProgress] = useLocalStorage("disney_progress_v1", {});

  const handleToggle = (id) => {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentDay = itinerary[dayIdx] || itinerary[0];
  const totalTasks = currentDay?.schedule?.length || 0;
  const completedTasks = currentDay?.schedule?.filter((item) => progress[item.id]).length || 0;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const nextTask = currentDay?.schedule?.find((item) => !progress[item.id]);

  return (
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
          days={itinerary || []}
          selectedIndex={dayIdx}
          onSelect={setDayIdx}
        />
        <div className="my-4">
          <h2 style={{ fontSize: "2rem", fontWeight: "900" }}>{currentDay?.parkName}</h2>
          <span className="badge bg-secondary">{currentDay?.dateString}</span>
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
        <Footer />
      </Container>
    </IonContent>
  );
};

const GuidesPage = ({ itinerary, guides, familyName }) => {
  const [dayIdx] = useLocalStorage("disney_day_idx", 0);
  const [progress] = useLocalStorage("disney_progress_v1", {});

  const currentDay = itinerary[dayIdx] || itinerary[0];
  const totalTasks = currentDay?.schedule?.length || 0;
  const completedTasks = currentDay?.schedule?.filter((item) => progress[item.id]).length || 0;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
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
        <Footer />
      </Container>
    </IonContent>
  ); 
};
