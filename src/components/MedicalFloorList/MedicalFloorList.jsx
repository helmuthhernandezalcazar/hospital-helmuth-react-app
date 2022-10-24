import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MedicalFloorCard from "../MedicalFloorCard";

const MedicalFLoorList = () => {
  return (
    <Container>
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
