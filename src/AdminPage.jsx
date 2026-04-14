import React, { useState } from "react";
import initialData from "./data/moredata.json";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
export default function AdminPage() {
  const [data, setData] = useState(initialData.DISNEY_TRIP_DATA);
  const generateFile = () => {
    const output = JSON.stringify(
      {
        familyName: initialData.familyName,
        DISNEY_TRIP_DATA: data,
        GUIDE_DATA: initialData.GUIDE_DATA,
      },
      null,
      2,
    );
    console.log(output);
    alert(output);
  };
  const updateDay = (index, field, newValue) => {
    const newData = [...data];

    const dayToUpdate = { ...newData[index] };

    // Use the 'field' argument to update the correct property
    dayToUpdate[field] = newValue;

    // Put the modified day back into the array copy
    newData[index] = dayToUpdate;

    setData(newData);
  };
  const updateActivity = (dayIdx, activityIdx, field, newValue) => {
    const newData = [...data];

    const dayToUpdate = { ...newData[dayIdx] };

    const newSchedule = [...dayToUpdate.schedule];

    // 4. Copy and update the specific activity
    const activityToEdit = { ...newSchedule[activityIdx] };
    activityToEdit[field] = newValue;

    // 5. Nest everything back up
    newSchedule[activityIdx] = activityToEdit;
    dayToUpdate.schedule = newSchedule;
    newData[dayIdx] = dayToUpdate;

    // 6. Save to React state!
    setData(newData);
  };
  const addActivity = (dayIdx) => {
    const newData = [...data];
    const dayToUpdate = { ...newData[dayIdx] };
    const newActivity = {
      id: `new-${Date.now()}`,
      time: "12:00 PM",
      title: "New Activity",
      location: "",
      notes: "",
    };
    dayToUpdate.schedule = [...dayToUpdate.schedule, newActivity];
    newData[dayIdx] = dayToUpdate;

    setData(newData);
  };
  return (
    <div className="root-div">
      <Container className="py-5 pt-3">
        <h1 className="mb-4 text-white text-center">Itinerary Generator</h1>

        {data.map((day, index) => (
          <Card
            key={day.id}
            className="mb-4 bg-dark text-white border-secondary"
          >
            <Card.Header className="fw-bold d-flex justify-content-between align-items-center">
              <span>
                Day {index + 1}: {day.parkName}
              </span>
              <small className="text-muted">{day.dateString}</small>
            </Card.Header>

            <Card.Body>
              {/* Day Level Inputs */}
              <Row className="mb-4">
                <Col>
                  <Form.Label className="small">Park Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={day.parkName}
                    onChange={(e) =>
                      updateDay(index, "parkName", e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Form.Label className="small">Date Label</Form.Label>
                  <Form.Control
                    type="text"
                    value={day.dateString}
                    onChange={(e) =>
                      updateDay(index, "dateString", e.target.value)
                    }
                  />
                </Col>
              </Row>

              <h5 className="border-bottom border-secondary pb-2">Schedule</h5>

              {/* Activity Level Inputs */}
              {day.schedule.map((item, actIdx) => (
                <div
                  key={item.id}
                  className="p-3 mb-3 border border-secondary rounded bg-black bg-opacity-25"
                >
                  <Row>
                    <Col md={3}>
                      <Form.Label className="extra-small text-light">
                        Time
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        value={item.time}
                        onChange={(e) =>
                          updateActivity(index, actIdx, "time", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={9}>
                      <Form.Label className="extra-small text-light">
                        Activity Title
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        value={item.title}
                        onChange={(e) =>
                          updateActivity(index, actIdx, "title", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                </div>
              ))}

              <Button
                variant="outline-info"
                size="sm"
                className="w-100 mt-2"
                onClick={() => addActivity(index)}
              >
                + Add Activity to Day {index + 1}
              </Button>
            </Card.Body>
          </Card>
        ))}

        <div className="sticky-bottom py-3 bg-dark border-top border-secondary text-center">
          <Button variant="primary" size="lg" onClick={generateFile}>
            🚀 Generate Data File
          </Button>
        </div>
      </Container>
    </div>
  );
}
