import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams } from "react-router-dom";

const PatientDetailCard = () => {
  const { id } = useParams([]);
  const [patient, setPatient] = useState({});
  const [room, setRoom] = useState({});
  useEffect(() => {
    fetch(`http://localhost:8080/patients/${id}`)
      .then((response) => response.json())
      .then((data) => setPatient(data));
  }, []);

  return (
    <Card style={{ width: "18em" }}>
      <Card.Header as="h2">
        {patient.firstName} {patient.lastName}
      </Card.Header>

      <ListGroup>
        <ListGroupItem>Habitación: </ListGroupItem>
        <ListGroupItem>Diagnóstico: {patient.medicalDiagnosis} </ListGroupItem>
        <ListGroupItem>
          Hospitalizado: {new Date(patient.hospitalizationDate).toUTCString()}
        </ListGroupItem>
        <ListGroupItem>Síntomas: {patient.symptoms}</ListGroupItem>
        <ListGroupItem>Triaje: {} </ListGroupItem>
      </ListGroup>
      <ListGroup>
        <ListGroupItem>Dni: {patient.dni}</ListGroupItem>
        <ListGroupItem>Núm. teléfono: {patient.phoneNumber}</ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default PatientDetailCard;
