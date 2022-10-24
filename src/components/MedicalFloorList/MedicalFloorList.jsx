import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MedicalFloorCard from "../MedicalFloorCard";

const MedicalFLoorList = () => {
  const [medicalFloors, setMedicalFloors] = useState([]);
  const [medicalSpecialtyName, setMedicalSpecialtyName] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/medicalFloors")
      .then((response) => response.json())
      .then((data) => setMedicalFloors(data._embedded.medicalFloors));
  }, []);

  return (
    <Container>
      {medicalFloors.map((medicalFloor, index) => {
        return (
          <Row>
            {console.log("medicalSpecialty: " + medicalSpecialtyName)}
            <MedicalFloorCard
              key={index}
              name={medicalFloor.name}
              medicalSpecialty={medicalFloor._links.medicalSpecialty.href}
            ></MedicalFloorCard>
          </Row>
        );
      })}

      <Row>
        <Col>
          <MedicalFloorCard
            name="1A"
            medicalSpecialty="Urología"
          ></MedicalFloorCard>
        </Col>
        <Col>
          <MedicalFloorCard
            name="2A"
            medicalSpecialty="Urgencias"
          ></MedicalFloorCard>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicalFLoorList;
