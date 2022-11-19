import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MedicalFloorCard from "../MedicalFloorCard";

const MedicalFLoorList = () => {
  const [medicalFloors, setMedicalFloors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/medicalFloors")
      .then((response) => response.json())
      .then((data) => setMedicalFloors(data._embedded.medicalFloors));
  }, []);

  return (
    <Container>
      <Row className="row-cols-3">
        {medicalFloors.map((medicalFloor, index) => {
          const self = medicalFloor._links.self.href;
          const id = self.split("http://localhost:8080/medicalFloors/").pop();
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
  );
};

export default MedicalFLoorList;
