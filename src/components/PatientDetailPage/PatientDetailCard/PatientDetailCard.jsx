import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useParams } from "react-router-dom";
import discharge from "../../../services/patient/discharge";
import getRoom from "../../../services/patient/getRoom";
import getTriage from "../../../services/patient/getTriage";
import PatientsPage from "../../PatientsPage";

const PatientDetailCard = (props) => {
  const patientId = props.patientId;
  const [patient, setPatient] = useState({});
  const [patientRoom, setPatientRoom] = useState({});
  const [patientTriage, setPatientTriage] = useState({});
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/patients/${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        setPatient(data);
      });
  }, [refreshToggle]);

  useEffect(() => {
    getRoom(patientId).then((room) => setPatientRoom(room));

    getTriage(patientId).then((triage) => setPatientTriage(triage));
  }, []);

  function dischargePatient() {
    discharge(patientId);
    setRefreshToggle(!refreshToggle);
    //window.location.reload(false);
  }

  return (
    <Card style={{ width: "26em", margin: 20 }}>
      <Card.Header as="h2">
        {patient.firstName} {patient.lastName}
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroupItem>
            Habitación: {patient.dischargeDate === null ? patientRoom.name : ""}
          </ListGroupItem>
          <ListGroupItem>
            Diagnóstico: {patient.medicalDiagnosis}{" "}
          </ListGroupItem>
          <ListGroupItem>
            Hospitalización:{" "}
            {new Date(patient.hospitalizationDate).toUTCString()}
          </ListGroupItem>
          {patient.dischargeDate !== null ? (
            <ListGroupItem>
              Alta: {new Date(patient.dischargeDate).toUTCString()}
            </ListGroupItem>
          ) : (
            <></>
          )}

          <ListGroupItem>Síntomas: {patient.symptoms}</ListGroupItem>
          <ListGroupItem>
            Triaje: {patientTriage.name} ({patientTriage.level})
          </ListGroupItem>
          <ListGroupItem>Dni: {patient.dni}</ListGroupItem>
          <ListGroupItem>Núm. teléfono: {patient.phoneNumber}</ListGroupItem>
        </ListGroup>
        {patient.dischargeDate === null ? (
          <Button onClick={(event) => dischargePatient()}>Dar de alta</Button>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
};

export default PatientDetailCard;
