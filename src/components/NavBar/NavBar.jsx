import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import getMedicalSpecialty from "../../services/medicalFloor/getMedicalSpecialty";

const NavBar = () => {
  const [medicalFloors, setMedicalFloors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/medicalFloors")
      .then((response) => response.json())
      .then((data) => setMedicalFloors(data._embedded.medicalFloors));
  }, []);

  /*
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Hospital Alcázar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/plantas">Plantas médicas</Nav.Link>
          <Nav.Link href="/pacientes">Pacientes</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );*/
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Hospital Alcázar
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <NavDropdown title="Plantas">
              {medicalFloors.map((medicalFloor, index) => {
                const self = medicalFloor._links.self.href;
                const id = self
                  .split("http://localhost:8080/medicalFloors/")
                  .pop();
                return (
                  <MedicalFloorNavItem
                    key={index}
                    medicalFloor={medicalFloor}
                    medicalFloorId={id}
                  />
                );
              })}
            </NavDropdown>
            <li className="nav-item">
              <a className="nav-link" href="/pacientes">
                Pacientes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const MedicalFloorNavItem = (props) => {
  const medicalFloor = props.medicalFloor;
  const medicalFloorId = props.medicalFloorId;
  const [medicalSpecialty, setMedicalSpecialty] = useState({});
  useEffect(() => {
    getMedicalSpecialty(medicalFloorId).then((medicalSpecialty) =>
      setMedicalSpecialty(medicalSpecialty)
    );
  }, [medicalFloorId]);

  return (
    <NavDropdown.Item href={`/plantas/${medicalFloorId}/habitaciones`}>
      {medicalFloor.name} - {medicalSpecialty.name}
    </NavDropdown.Item>
  );
};
export default NavBar;
