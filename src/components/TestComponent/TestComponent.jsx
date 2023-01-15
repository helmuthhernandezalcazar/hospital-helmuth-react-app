import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import getEmptyRooms from "../../services/room/getEmptyRooms";

const TestComponent = () => {
  const [actualPatient, setActualPatient] = useState({});
  const { register, handleSubmit } = useForm({ ...actualPatient });
  const [infoMsg, setInfoMsg] = useState("");
  const [emptyRooms, setEmptyRooms] = useState([]);
  const [waitingRoomSwitchCheked, setWaitingRoomSwitchChecked] =
    useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/patients/7?projection=patientProjection")
      .then((response) => response.json())
      .then((data) => setActualPatient(data));
  }, []);

  useEffect(() => {
    getEmptyRooms().then((emptyRooms) => setEmptyRooms(emptyRooms));
  }, []);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(actualPatient));
    let patient = { ...actualPatient };
    patient = { ...data, hospitalizationDate: new Date() };
    if (patient.room === "default" || waitingRoomSwitchCheked)
      patient = { ...patient, room: null };
    fetch("http://localhost:8080/patients", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    }).then((response) => {
      if (!response.ok) setInfoMsg("error");
      if (response.ok) setInfoMsg("Paciente registrado");
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
          defaultValue="default"
          name="room"
          {...register("room")}
        >
          <option id="defaultRoomSelector" value="default" disabled>
            Elegir Habitación
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
          defaultValue="/triages/5"
          value={actualPatient.triageLevel}
          {...register("triage")}
          style={{ fontWeight: "bold" }}
        >
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
        <div className="row">{getTriageSelect()}</div>
        <div className="row">{getRoomSelect()}</div>
        <div className="row">
          <div className="col">
            <Form.Check
              type="switch"
              label="sala de espera"
              id="waitingRoomSwitch"
              onChange={(e) => {
                console.log(e);
                setWaitingRoomSwitchChecked(e.target.checked);
                if (!waitingRoomSwitchCheked) {
                  document.getElementById(
                    "defaultRoomSelector"
                  ).selected = true;
                  document.getElementById("roomSelector").disabled = true;
                } else document.getElementById("roomSelector").disabled = false;
              }}
            ></Form.Check>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="submit"
              className="btn btn-primary"
              value="Guardar cambios"
              style={{ marginTop: 20 }}
            />

            <p>{infoMsg}</p>
          </div>
        </div>
      </Form>
    </Container>
  );
};

const RoomSelect = () => {
  const [emptyRooms, setEmptyRooms] = useState([]);
  useEffect(() => {
    getEmptyRooms().then((emptyRooms) => setEmptyRooms(emptyRooms));
  }, []);
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
  return (
    <select
      id="roomSelector"
      className="form-control"
      defaultValue="default"
      name="room"
    >
      <option id="defaultRoomSelector" value="default" disabled>
        Elegir Habitación
      </option>
      {getEmptyRoomsOptions()}
    </select>
  );
};
export default TestComponent;
