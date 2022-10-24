import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Hospital Helmuth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link href="#medicalSpecialties">Plantas médicas</Nav.Link>
          <Nav.Link href="#patients">Pacientes</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
