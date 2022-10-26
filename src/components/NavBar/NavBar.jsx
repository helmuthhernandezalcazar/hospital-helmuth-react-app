import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
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
  );
};

export default NavBar;
