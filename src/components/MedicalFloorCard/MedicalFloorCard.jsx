import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const MedicalFloorCard = (props) => {
  return (
    <Card>
      <Card.Header as="h3">Planta médica</Card.Header>
      <Card.Body>
        <Card.Title>
          {props.name} - {props.medicalSpecialty}
        </Card.Title>
      </Card.Body>
      <Button variant="primary">Ver</Button>
    </Card>
  );
};

export default MedicalFloorCard;
