import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/patients")
      .then((response) => response.json())
      .then((data) => setPatients(data._embedded.patients));
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Fecha de hospitalizaión</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => {
            return (
              <tr key={index}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.dni}</td>
                <td>{patient.phoneNumber}</td>
                <td>{patient.hospitalizationDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default PatientTable;
