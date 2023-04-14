import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { medicalFloorService } from "../../services/medicalFloor/medicalFloorService";
import MedicalFloorCard from "../MedicalFloorCard";

const MedicalFLoorList = () => {
  const [medicalFloors, setMedicalFloors] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    medicalFloorService
      .getAll()
      .then((medicalFloors) => {
        setMedicalFloors(medicalFloors);
      })
      .finally(() => setShowSpinner(false));
  }, []);

  return (
    <>
      {!showSpinner ? (
        <Container>
          <Row className="row-cols-3">
            {medicalFloors.map((medicalFloor, index) => {
              const self = medicalFloor._links.self.href;
              const id = self
                .split("http://localhost:8080/medicalFloors/")
                .pop();
              return (
                <Col key={index}>
                  <MedicalFloorCard
                    medicalFloor={medicalFloor}
                    medicalFloorId={id}
                  ></MedicalFloorCard>
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <Spinner
          animation="border"
          role="status"
          style={{ position: "absolute", left: "50%", top: "50%" }}
        ></Spinner>
      )}
    </>
  );
};

export default MedicalFLoorList;
