import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import { useForm } from "react-hook-form";
import getMeasurements from "../../../services/patient/getMeasurements";

const PatientMeasurements = (props) => {
  const patientId = props.patientId;
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    getMeasurements(patientId).then((measurements) =>
      setMeasurements(measurements)
    );
  }, []);

  return (
    <Container>
      <h2>Mediciones</h2>
      {measurements.map((measurement, index) => {
        return (
          <MeasurementRow
            key={index}
            measurement={measurement}
            measurementTypeRef={measurement._links.measurementType.href}
          ></MeasurementRow>
        );
      })}
      <AddMeasurementForm patientId={props.patientId} />
    </Container>
  );
};

const MeasurementRow = (props) => {
  const [measurement, setMeasurement] = useState(props.measurement);
  const [measurementType, setMeasurementType] = useState({});
  useEffect(() => {
    fetch(props.measurementTypeRef)
      .then((response) => response.json())
      .then((data) => setMeasurementType(data));
  }, [props.measurement]);

  return (
    <Row>
      <Col className="col-md-4">
        <span>{measurement.measurementValue}</span>
      </Col>
      <Col>
        <span>{measurementType.unit}</span>
      </Col>
      <Col>
        <span>{measurementType.measurementType}</span>
      </Col>
      <Col>
        <span>{new Date(measurement.date).toUTCString()}</span>
      </Col>
    </Row>
  );
};

const AddMeasurementForm = (props) => {
  const patientId = props.patientId;
  const [measurementTypes, setMeasurementTypes] = useState([]);
  const [measurementTypeSelected, setMeasurementTypeSelected] = useState({});
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch("http://localhost:8080/measurementTypes")
      .then((response) => response.json())
      .then((data) => {
        const { _embedded = {} } = data;
        setMeasurementTypes(_embedded.measurementTypes);
      });
  }, []);

  function onSubmit(data) {
    const body = {
      ...data,
      date: new Date(),
      patient: "/patients/" + patientId,
    };
    console.log(body);
    fetch("http://localhost:8080/measurements", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    window.location.reload(false);
  }

  function getMeasurementTypeOptions() {
    return measurementTypes.map((type, index) => {
      return (
        <option key={index} value={type._links.self.href}>
          {type.measurementType} ({type.unit})
        </option>
      );
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-group shadow p-3 mb-5 bg-body rounded"
    >
      <Row>
        <Col>
          <label>
            Valor
            <input
              type="text"
              className="form-control"
              {...register("measurementValue")}
            ></input>
          </label>
        </Col>
        <Col>
          <label>
            Medición
            <select
              name="measurementTypes"
              id="measurementTypeSelectBox"
              className="form-control"
              defaultValue="default"
              {...register("measurementType")}
            >
              <option value="default" disabled>
                Elegir medición
              </option>
              {getMeasurementTypeOptions()}
            </select>
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="submit"
            className="btn btn-primary"
            value="Añadir"
            style={{ marginTop: 20 }}
          />
        </Col>
      </Row>
    </form>
  );
};
export default PatientMeasurements;
