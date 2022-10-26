import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
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
            <li className="nav-item">
              <a className="nav-link" href="/plantas">
                Plantas
              </a>
            </li>
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

export default NavBar;
