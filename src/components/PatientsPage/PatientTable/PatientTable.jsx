import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/patients?size=100")
      .then((response) => response.json())
      .then((data) => setPatients(data._embedded.patients));
  }, [refreshToggle]);

  const handleRefresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  return (
    <div className="table-responsive ">
      <table className="table align-middle table-edge table-hover table-nowrap mb-0">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Más info.</th>
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
                <td>
                  <Button variant="outline-primary">Detalles</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button className="btn btn-primary" onClick={handleRefresh}>
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default PatientTable;
