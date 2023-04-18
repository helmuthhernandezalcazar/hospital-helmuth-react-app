import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { authenticationService } from "../../../services/authentication/authenticationService";
import discharge from "../../../services/patient/discharge";
import getRoom from "../../../services/patient/getRoom";
import getTriage from "../../../services/patient/getTriage";
import { patientService } from "../../../services/patient/patientService";
import getEmptyRooms from "../../../services/room/getEmptyRooms";
import PatientsPage from "../../PatientsPage";

const PatientDetailCard = (props) => {
  const patientId = props.patientId;
  const [patient, setPatient] = useState({});
  const [patientRoom, setPatientRoom] = useState({});
  const [patientTriage, setPatientTriage] = useState({});
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [modify, setModify] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:8080/patients/${patientId}?projection=patientProjection`,
      {
        method: "GET",
        headers: {
          Authorization: authenticationService.getSessionToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPatient(data);
      });
  }, [refreshToggle]);

  useEffect(() => {
    getRoom(patientId).then((room) => setPatientRoom(room));

    getTriage(patientId).then((triage) => setPatientTriage(triage));
  }, [refreshToggle]);

  function updateData() {
    setRefreshToggle(!refreshToggle);
  }
  function dischargePatient() {
    patientService
      .discharge(patientId)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        updateData();
      });

    //window.location.reload(false);
  }

  function showModifyForm(show) {
    setModify(show);
  }
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: "38em", margin: 20 }}>
            <Card.Header as="h2">
              {patient.firstName} {patient.lastName}
            </Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroupItem>
                  Habitación:{" "}
                  {patient.dischargeDate === null ? patientRoom.name : ""}
                </ListGroupItem>
                <ListGroupItem>
                  Diagnóstico: {patient.medicalDiagnosis}
                </ListGroupItem>
                <ListGroupItem>
                  Hospitalización:{" "}
                  {new Date(patient.hospitalizationDate).toLocaleString(
                    "es-ES"
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  Alta:
                  {patient.dischargeDate !== null
                    ? new Date(patient.dischargeDate).toLocaleString("es-ES")
                    : ""}
                </ListGroupItem>

                <ListGroupItem>Síntomas: {patient.symptoms}</ListGroupItem>
                <ListGroupItem>
                  Triaje: {patientTriage.name} ({patientTriage.level})
                </ListGroupItem>
                <ListGroupItem>Dni: {patient.dni}</ListGroupItem>
                <ListGroupItem>
                  Núm. teléfono: {patient.phoneNumber}
                </ListGroupItem>
              </ListGroup>
              {patient.dischargeDate === null ? (
                <Button onClick={(event) => dischargePatient()}>
                  Dar de alta
                </Button>
              ) : (
                <></>
              )}
              <Button onClick={() => setModify(true)}>Modificar datos</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {modify ? (
            <ModifyPatient
              actualPatient={patient}
              showModifyForm={showModifyForm}
              updateData={updateData}
            ></ModifyPatient>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const ModifyPatient = ({ actualPatient, showModifyForm, updateData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [infoMsg, setInfoMsg] = useState("");
  const [emptyRooms, setEmptyRooms] = useState([]);
  const [waitingRoomSwitchCheked, setWaitingRoomSwitchChecked] =
    useState(false);

  useEffect(() => {
    console.log("useEffectr");
    reset(actualPatient);
    getEmptyRooms().then((emptyRooms) => setEmptyRooms(emptyRooms));
  }, [actualPatient]);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));

    let patient = { ...data };
    if (patient.room === "notModify") delete patient.room;
    if (patient.triage === "notModify") delete patient.triage;

    fetch(patient._links.self.href, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authenticationService.getSessionToken(),
      },
      body: JSON.stringify(patient),
    }).then((response) => {
      if (!response.ok) setInfoMsg("error");
      if (response.ok) {
        setInfoMsg("Paciente registrado");
        updateData();
        showModifyForm(false);
      }
    });
  };
  function getEmptyRoomsOptions() {
    if (emptyRooms.length === 0)
      return (
        <option disabled style={{ color: "red" }}>
          No hay habitaciones vacías - Se pondrá al paciente en Sala de espera.
        </option>
      );

    return (
      <>
        {emptyRooms.map((room, index) => (
          <option value={room._links.self.href} key={index}>
            {room.name}
          </option>
        ))}
      </>
    );
  }
  function getRoomSelect() {
    return (
      <label>
        Habitación
        <select
          id="roomSelector"
          className="form-control"
          defaultValue="notModify"
          name="room"
          {...register("room")}
        >
          <option id="defaultRoomSelector" value="notModify">
            No modificar
          </option>
          {getEmptyRoomsOptions()}
        </select>
      </label>
    );
  }

  function getTriageSelect() {
    return (
      <label>
        Triaje
        <select
          className="form-control"
          name="triage"
          defaultValue="notModify"
          {...register("triage")}
          style={{ fontWeight: "bold" }}
        >
          <option value="notModify" style={{ backgroundColor: "#ff8080" }}>
            No modificar
          </option>
          <option value="/triages/1" style={{ backgroundColor: "#ff8080" }}>
            Nivel 1 - Atención inmediata
          </option>
          <option value="/triages/2" style={{ backgroundColor: "#ffb380" }}>
            Nivel 2 - Muy urgente
          </option>
          <option value="/triages/3" style={{ backgroundColor: "#ffe680" }}>
            Nivel 3 - Urgente
          </option>
          <option value="/triages/4" style={{ backgroundColor: "#fff0b3" }}>
            Nivel 4 - Urgencia menor
          </option>
          <option value="/triages/5" style={{ backgroundColor: "#fffae6" }}>
            Nivel 5 - No urgente
          </option>
        </select>
      </label>
    );
  }
  return (
    <Container>
      <Form
        style={{ marginTop: "16px" }}
        className="form-group shadow p-3 mb-5 bg-body rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Modificar datos</h2>
        <div className="row">
          <div className="col">
            <label>
              Nombre
              <input
                type="text"
                className="form-control"
                name="firstName"
                defaultValue={actualPatient.firstName}
                {...register("firstName")}
              />
            </label>
          </div>
          <div className="col">
            <label>
              Apellidos
              <input
                type="text"
                className="form-control"
                name="lastName"
                defaultValue={actualPatient.lastName}
                {...register("lastName")}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              DNI
              <input
                type="text"
                className="form-control"
                name="dni"
                defaultValue={actualPatient.dni}
                {...register("dni")}
              />
            </label>
          </div>
          <div className="col">
            <label>
              Teléfono
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                defaultValue={actualPatient.phoneNumber}
                {...register("phoneNumber")}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <label>
            Síntomas
            <textarea
              type="text"
              className="form-control"
              name="symptoms"
              rows="3"
              defaultValue={actualPatient.symptoms}
              {...register("symptoms")}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Diagnóstico
            <input
              type="text"
              className="form-control"
              name="medicalDiagnosis"
              defaultValue={actualPatient.medicalDiagnosis}
              {...register("medicalDiagnosis")}
            />
          </label>
        </div>
        <div className="row">{getTriageSelect()}</div>
        <div className="row">{getRoomSelect()}</div>

        <div className="row">
          <div className="col" style={{ marginTop: 20 }}>
            <input
              type="submit"
              className="btn btn-primary"
              value="Guardar cambios"
            />
            <Button variant="secondary" onClick={() => showModifyForm(false)}>
              Cancelar
            </Button>
            <p>{infoMsg}</p>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default PatientDetailCard;
