import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useForm } from "react-hook-form";
import getEmptyRooms from "../../../services/room/getEmptyRooms";

const PatientForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [infoMsg, setInfoMsg] = useState("");
  const [emptyRooms, setEmptyRooms] = useState([]);
  const [waitingRoomSwitchCheked, setWaitingRoomSwitchChecked] =
    useState(false);
  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    const patient = { ...data, hospitalizationDate: new Date() };
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

    props.refreshTable();
  };

  useEffect(() => {
    getEmptyRooms().then((emptyRooms) => setEmptyRooms(emptyRooms));
  }, []);

  function getEmptyRoomsOptions() {
    if (emptyRooms.length === 0)
      return (
        <option disabled style={{ color: "red" }}>
          No hay habitaciones vacías
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
          className="form-control"
          defaultValue="default"
          name="room"
          {...register("room")}
        >
          <option value="default" disabled>
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
        <select className="form-control" name="triage" {...register("triage")}>
          <option value="/triages/1">Nivel 1</option>
          <option value="/triages/2">Nivel 2</option>
          <option value="/triages/3">Nivel 3</option>
          <option value="/triages/4">Nivel 4</option>
          <option value="/triages/5">Nivel 5</option>
        </select>
      </label>
    );
  }

  return (
    <Form
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
            {...register("symptoms")}
          />
        </label>
      </div>

      <div className="row">
        {waitingRoomSwitchCheked ? getTriageSelect() : getRoomSelect()}

        <div className="row">
          <div className="col">
            <Form.Check
              type="switch"
              label="sala de espera"
              id="waitingRoomSwitch"
              onChange={(e) => {
                console.log(e);
                setWaitingRoomSwitchChecked(e.target.checked);
              }}
            ></Form.Check>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-primary"
            value="Registrar"
            style={{ marginTop: 20 }}
          />
          <p>{infoMsg}</p>
        </div>
      </div>
    </Form>
  );
};

export default PatientForm;
