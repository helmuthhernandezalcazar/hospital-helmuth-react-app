import React from "react";
import { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";

const PatientsPage = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const refreshTable = () => {
    setRefreshToggle(!refreshToggle);
  };

  /*
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
  */
  return (
    <Tabs className="mb-3" defaultActiveKey="Lista pacientes">
      <Tab eventKey="Lista pacientes" title="Lista pacientes">
        <Container>
          <h1>Lista completa</h1>
          <PatientTable refreshToggle={refreshToggle}></PatientTable>
        </Container>
      </Tab>
      <Tab eventKey="Registrar paciente" title="Registrar paciente">
        <Container>
          <PatientForm refreshTable={refreshTable}></PatientForm>
        </Container>
      </Tab>
    </Tabs>
  );
};

export default PatientsPage;
