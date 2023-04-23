import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import getMedicalSpecialty from "../../services/medicalFloor/getMedicalSpecialty";
import { medicalFloorService } from "../../services/medicalFloor/medicalFloorService";
import LogOut from "./LogOut/LogOut";
import { authenticationService } from "../../services/authentication/authenticationService";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [medicalFloors, setMedicalFloors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    medicalFloorService
      .getAll()
      .then((medicalFloors) => setMedicalFloors(medicalFloors));
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Hospital Alcázar
        </a>
        {authenticationService.getSessionToken() !== null ? (
          <>
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
            <LogOut />
          </>
        ) : (
          <Button variant="light" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
        )}
      </div>
    </nav>
  );
};

const MedicalFloorNavItem = (props) => {
  const medicalFloor = props.medicalFloor;
  const medicalFloorId = props.medicalFloorId;
  const [medicalSpecialty, setMedicalSpecialty] = useState({});
  useEffect(() => {
    medicalFloorService
      .getMedicalSpecialty(medicalFloorId)
      .then((medicalSpecialty) => setMedicalSpecialty(medicalSpecialty));
  }, [medicalFloorId]);

  return (
    <NavDropdown.Item href={`/plantas/${medicalFloorId}/habitaciones`}>
      {medicalFloor.name} - {medicalSpecialty.name}
    </NavDropdown.Item>
  );
};
export default NavBar;
