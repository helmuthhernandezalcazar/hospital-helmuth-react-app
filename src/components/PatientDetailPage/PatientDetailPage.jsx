import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PatientDetailCard from "./PatientDetailCard";
import PatientMeasurements from "./PatientMeasurements";
import PatientNotes from "./PatientNotes";

const PatientDetailPage = () => {
  const { id } = useParams([]);

  return (
    <Tabs className="mb-3">
      <Tab eventKey="Detalles del paciente" title="Detalles del paciente">
        <PatientDetailCard patientId={id} />
      </Tab>
      <Tab eventKey="Notas del paciente" title="Notas del paciente">
        <PatientNotes patientId={id} />
      </Tab>
      <Tab eventKey="Mediciones del paciente" title="Mediciones del paciente">
        <PatientMeasurements patientId={id} />
      </Tab>
    </Tabs>
  );
};

export default PatientDetailPage;
