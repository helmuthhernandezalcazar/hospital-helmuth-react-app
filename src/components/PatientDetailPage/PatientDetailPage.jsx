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
  const [notes, setNotes] = useState([]);
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

  useEffect(() => {
    fetch(notesRef)
      .then((response) => {
        return response.json();
      })
      .then((data) => setNotes(data._embedded.notes));
  }, [notesRef]);

  return (
    <Container>
      <PatientDetailCard patient={patient} />
      <PatientNotes notes={notes} patientId={id} />
      <PatientMeasurements measurementsRef={measurementsRef} patientId={id} />
    </Container>
  );
};

export default PatientDetailPage;
