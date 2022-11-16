import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PatientDetailCard from "./PatientDetailCard";
import PatientMeasurements from "./PatientMeasurements";
import PatientNotes from "./PatientNotes";

const PatientDetailPage = () => {
  const { id } = useParams([]);

  return (
    <Container>
      <PatientDetailCard patientId={id} />
      <PatientNotes patientId={id} />
      <PatientMeasurements patientId={id} />
    </Container>
  );
};

export default PatientDetailPage;
