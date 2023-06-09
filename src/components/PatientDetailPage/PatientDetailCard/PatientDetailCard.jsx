import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
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
  const [patientDischarged, setPatientDischarged] = useState(false);

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
        setPatientDischarged(data.dischargeDate !== null);
        props.setDischarged(data.discharged);
        console.log(data);
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
        setPatientDischarged(true);
        updateData();
      });

    //window.location.reload(false);
  }

  function showModifyForm(show) {
    setModify(show);
  }
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16px",
      }}
    >
      <Row>
        <Col>
          <Card style={{ width: "60em", margin: 20 }}>
            <Card.Header as="h2">
              {patient.firstName} {patient.lastName}
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <ListGroup>
                    <ListGroupItem>Nombre: {patient.firstName}</ListGroupItem>
                    <ListGroupItem>Apellidos: {patient.lastName}</ListGroupItem>
                    <ListGroupItem>DNI: {patient.dni}</ListGroupItem>

                    <ListGroupItem>
                      Teléfono: {patient.phoneNumber}
                    </ListGroupItem>
                    <ListGroupItem>Síntomas: {patient.symptoms}</ListGroupItem>
                    <ListGroupItem>
                      Fecha registro:{" "}
                      {new Date(patient.registerDate).toLocaleString("es-ES")}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup>
                    <ListGroupItem>
                      Habitación:{" "}
                      {patient.dischargeDate === null ? patientRoom.name : ""}
                    </ListGroupItem>
                    <ListGroupItem>
                      Planta: {patient.roomMedicalFloor}
                    </ListGroupItem>
                    <ListGroupItem>
                      Especialidad: {patient.roomMedicalSpecialty}
                    </ListGroupItem>
                    <ListGroupItem>
                      Diagnóstico: {patient.medicalDiagnosis}
                    </ListGroupItem>

                    <ListGroupItem>
                      Triaje: {patientTriage.name} ({patientTriage.level})
                    </ListGroupItem>
                    <ListGroupItem>
                      Fecha alta:{" "}
                      {patient.dischargeDate !== null
                        ? new Date(patient.dischargeDate).toLocaleString(
                            "es-ES"
                          )
                        : ""}
                    </ListGroupItem>
                  </ListGroup>
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      marginTop: "16px",
                    }}
                  >
                    {!patientDischarged ? (
                      <Button
                        variant="outline-secondary"
                        onClick={(event) => dischargePatient()}
                      >
                        Dar de alta
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button
                      variant="primary"
                      disabled={patientDischarged}
                      onClick={() => setModify(true)}
                      style={{ marginLeft: "8px" }}
                    >
                      Modificar datos
                    </Button>
                  </Container>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={modify} onHide={showModifyForm}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar datos del paciente</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <ModifyPatient
            actualPatient={patient}
            showModifyForm={showModifyForm}
            updateData={updateData}
          ></ModifyPatient>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const ModifyPatient = ({ actualPatient, showModifyForm, updateData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [infoMsg, setInfoMsg] = useState("");
  const [emptyRooms, setEmptyRooms] = useState([]);
  const [errorResponse, setErrorResponse] = useState(null);

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
      if (!response.ok) {
        setInfoMsg("error");
        response.json().then((error) => setErrorResponse(error));
      }
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
            Seleccionar...
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
        >
          <option value="notModify">Selecionar...</option>
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
        className="form-group mb-2"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <div className="row">
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip>
                no selecionar mantendrá el valor anterior {actualPatient.triage}
              </Tooltip>
            }
          >
            {getTriageSelect()}
          </OverlayTrigger>
        </div>
        <div className="row">
          <OverlayTrigger
            placement={"right"}
            overlay={
              <Tooltip>
                no selecionar mantendrá el valor anterior {actualPatient.triage}
              </Tooltip>
            }
          >
            {getRoomSelect()}
          </OverlayTrigger>
        </div>

        <div className="row">
          <div
            className="col"
            style={{ marginTop: 20, display: "flex", justifyContent: "right" }}
          >
            <Button
              variant="secondary outline"
              onClick={() => showModifyForm(false)}
            >
              Cancelar
            </Button>

            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: "8px" }}
            >
              Guardar cambios
            </Button>
          </div>
        </div>
        {errorResponse !== null ? (
          <Alert variant="danger" style={{ marginTop: "8px" }}>
            {errorResponse.message !== undefined
              ? errorResponse.message
              : "Error"}
          </Alert>
        ) : (
          <></>
        )}
      </Form>
    </Container>
  );
};

export default PatientDetailCard;
