import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useParams } from "react-router-dom";
import PatientsPage from "../../PatientsPage";

const PatientDetailCard = (props) => {
  const patientId = props.patientId;
  const [patient, setPatient] = useState({});
  useEffect(() => {
    fetch(`http://localhost:8080/patients/${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        setPatient(data);
      });
  }, []);

  return (
    <Card style={{ width: "26em", margin: 20 }}>
      <Card.Header as="h2">
        {patient.firstName} {patient.lastName}
      </Card.Header>

      <ListGroup>
        <ListGroupItem>Habitación:</ListGroupItem>
        <ListGroupItem>Diagnóstico: {patient.medicalDiagnosis} </ListGroupItem>
        <ListGroupItem>
          Hospitalización: {new Date(patient.hospitalizationDate).toUTCString()}
        </ListGroupItem>
        <ListGroupItem>Síntomas: {patient.symptoms}</ListGroupItem>
        <ListGroupItem>Triaje:</ListGroupItem>
      </ListGroup>
      <ListGroup>
        <ListGroupItem>Dni: {patient.dni}</ListGroupItem>
        <ListGroupItem>Núm. teléfono: {patient.phoneNumber}</ListGroupItem>
      </ListGroup>
    </Card>
  );
};

const RoomName = (props) => {
  const [room, setRoom] = useState({});

  useEffect(() => {
    fetch(props.room)
      .then((response) => response.json())
      .then((data) => setRoom(data));
  }, [props.room]);

  return <span>{room.name}</span>;
};

const TriageName = (props) => {
  const [triage, setTriage] = useState({});

  useEffect(() => {
    fetch(props.triage)
      .then((response) => response.json())
      .then((data) => setTriage(data));
  }, [props.triage]);

  return <span>{triage.name}</span>;
};
export default PatientDetailCard;
