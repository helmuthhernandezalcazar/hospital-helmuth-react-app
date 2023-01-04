import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const PatientTable = (props) => {
  const [patients, setPatients] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetch("http://localhost:8080/patients?projection=patientProjection")
      .then((response) => response.json())
      .then((data) => {
        setPatients(data._embedded.patients);
        console.log(JSON.stringify(data));
      });
  }, [props.refreshToggle]);

  function hospitalizedFilter(patient) {
    return patient.dischargeDate === null;
  }
  const filters = {
    hospitalized: hospitalizedFilter,
  };

  function filterPatient(patient) {
    switch (filter) {
      case "all":
        return true == true;
      case "hospitalized":
        return (
          patient.dischargeDate === null && patient.roomName != "Sala de espera"
        );
      case "discharged":
        return patient.dischargeDate !== null;
      case "waiting room":
        return patient.roomName === "Sala de espera";
    }
  }
  return (
    <div>
      <ToggleButtonGroup
        type="radio"
        name="filter-buttons"
        defaultValue={"hospitalized"}
      >
        <ToggleButton
          id="toggleHospitalized"
          value={"hospitalized"}
          variant="secondary"
          onClick={() => setFilter("hospitalized")}
        >
          Hospitalizados
        </ToggleButton>
        <ToggleButton
          id="toggleDischarged"
          value={"discharged"}
          variant="secondary"
          onClick={() => setFilter("discharged")}
        >
          Dados de alta
        </ToggleButton>
        <ToggleButton
          id="toggleWaitingRoom"
          value={"waiting room"}
          variant="secondary"
          onClick={() => setFilter("waiting room")}
        >
          Sala de espera
        </ToggleButton>
        <ToggleButton
          id="toggleAll"
          value={"all"}
          variant="secondary"
          onClick={() => setFilter("all")}
        >
          Todos
        </ToggleButton>
      </ToggleButtonGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Habitación</th>
            <th>Triaje</th>
            <th>Más info.</th>
          </tr>
        </thead>
        <tbody>
          {patients
            .filter((patient) => filterPatient(patient))
            .map((patient, index) => {
              const self = patient._links.self.href;
              const id = self.split("http://localhost:8080/patients/").pop();
              return (
                <tr key={index}>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.dni}</td>
                  <td>{patient.roomName}</td>
                  <td>{patient.triageLevel}</td>
                  <td>
                    <Button variant="outline-primary" href={`/paciente/${id}`}>
                      Detalles
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div></div>
    </div>
  );
};

export default PatientTable;
