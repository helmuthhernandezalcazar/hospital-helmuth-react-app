import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const PatientMeasurements = (props) => {
  const [measurements, setMeasurements] = useState([]);
  const [measurementTypeRef, setMeasurementTypeRef] = useState();

  useEffect(() => {
    fetch(props.measurementsRef)
      .then((response) => response.json())
      .then((data) => {
        setMeasurements(data._embedded.measurements);
      });
  }, [props.measurementsRef]);

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
      <Col>
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

export default PatientMeasurements;
