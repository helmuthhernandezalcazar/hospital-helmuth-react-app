import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";

const PatientsPage = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const refreshTable = () => {
    setRefreshToggle(!refreshToggle);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <h2>Registrar paciente</h2>
          <PatientForm refreshTable={refreshTable} />
        </Col>
        <Col>
          <h2>Pacientes ingresados</h2>
          <PatientTable refreshToggle={refreshToggle} />
        </Col>
      </Row>
    </div>
  );
};

export default PatientsPage;
