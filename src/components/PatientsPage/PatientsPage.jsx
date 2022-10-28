import React from "react";
import { Col, Row } from "react-bootstrap";
import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";

const PatientsPage = () => {
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <h2>Registrar paciente</h2>
          <PatientForm />
        </Col>
        <Col>
          <h2>Pacientes ingresados</h2>
          <PatientTable />
        </Col>
      </Row>
    </div>
  );
};

export default PatientsPage;
