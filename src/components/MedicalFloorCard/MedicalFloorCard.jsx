import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const MedicalFloorCard = (props) => {
  const [medicalSpecialtyName, setMedicalSpecialtyName] = useState(null);

  useEffect(() => {
    fetch(props.medicalSpecialty)
      .then((response) => response.json())
      .then((data) => setMedicalSpecialtyName(data.name));
  }, []);

  return (
    <Card style={{ marginTop: "16px" }}>
      <Card.Header as="h3">Planta médica</Card.Header>
      <Card.Body>
        <Card.Title>
          {props.name} - {medicalSpecialtyName}
        </Card.Title>
      </Card.Body>
      <Button variant="primary">Ver</Button>
    </Card>
  );
};

export default MedicalFloorCard;
