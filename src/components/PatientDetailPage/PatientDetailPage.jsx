import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PatientDetailCard from "./PatientDetailCard";
import PatientMeasurements from "./PatientMeasurements";
import PatientNotes from "./PatientNotes";

const PatientDetailPage = () => {
  const { id } = useParams([]);
  const [discharged, setDischarged] = useState(false);

  function handleDischargeState(discharge) {
    setDischarged(discharge);
    console.log(discharge);
  }
  return (
    <Tabs className="mb-3">
      <Tab eventKey="Detalles del paciente" title="Detalles del paciente">
        <PatientDetailCard
          patientId={id}
          setDischarged={(discharge) => handleDischargeState(discharge)}
        />
      </Tab>
      <Tab eventKey="Notas del paciente" title="Notas del paciente">
        <PatientNotes patientId={id} discharged={discharged} />
      </Tab>
      <Tab eventKey="Mediciones del paciente" title="Mediciones del paciente">
        <PatientMeasurements patientId={id} discharged={discharged} />
      </Tab>
    </Tabs>
  );
};

export default PatientDetailPage;
