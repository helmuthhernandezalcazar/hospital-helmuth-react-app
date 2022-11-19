import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import getMedicalSpecialty from "../../services/medicalFloor/getMedicalSpecialty";

const MedicalFloorCard = (props) => {
  const medicalFloorId = props.medicalFloorId;
  const [medicalSpecialty, setMedicalSpecialty] = useState({});
  const [medicalFloor, setMedicalFloor] = useState({});

  useEffect(() => {
    getMedicalSpecialty(medicalFloorId).then((medicalSpecialty) =>
      setMedicalSpecialty(medicalSpecialty)
    );
  }, [medicalFloor]);

  useEffect(() => {
    setMedicalFloor(props.medicalFloor);
  }, []);

  return (
    <Card style={{ marginTop: "16px" }}>
      <Card.Header as="h3">{medicalSpecialty.name}</Card.Header>
      <Card.Body>
        <Card.Title>Planta: {medicalFloor.name}</Card.Title>
      </Card.Body>
      <Button
        variant="primary"
        href={`/plantas/${medicalFloorId}/habitaciones`}
      >
        Ver habitaciones
      </Button>
    </Card>
  );
};

export default MedicalFloorCard;
