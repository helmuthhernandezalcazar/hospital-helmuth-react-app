import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PatientDetailCard from "./PatientDetailCard";
import PatientMeasurements from "./PatientMeasurements";
import PatientNotes from "./PatientNotes";

const PatientDetailPage = () => {
  const { id } = useParams([]);
  const [patient, setPatient] = useState({});
  const [notesRef, setNotesRef] = useState();
  const [measurementsRef, setMeasurementsRef] = useState();
  useEffect(() => {
    fetch(`http://localhost:8080/patients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPatient(data);
        setNotesRef(data._links.notes.href);
        setMeasurementsRef(data._links.measurements.href);
      });
  }, [id]);

  return (
    <Container>
      <PatientDetailCard patient={patient} />
      <PatientNotes notesRef={notesRef} />
      <PatientMeasurements measurementsRef={measurementsRef} />
    </Container>
  );
};

export default PatientDetailPage;
