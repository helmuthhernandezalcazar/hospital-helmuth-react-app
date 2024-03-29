import React, { useEffect, useState } from "react";
import CarouselHospital from "./CarouselHospital/CarouselHospital";
import {
  Card,
  Col,
  Container,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import nurseAndPatientImg from "./nurseandpatient.png";
import doctorsImg from "./doctors.png";
import { authenticationService } from "../../services/authentication/authenticationService";

const MainPage = ({ userLogged }) => {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => {
    setShowA(!showA);
  };
  useEffect(() => {
    console.log("logged" + userLogged);
  }, [userLogged]);
  return (
    <>
      <CarouselHospital></CarouselHospital>
      <Container style={{ marginTop: "32px" }}>
        <h1
          className="text-center"
          style={{ fontFamily: "candara", fontWeight: "bold" }}
        >
          Su salud es nuestra prioridad
        </h1>

        <p className="lead mb-4" style={{ marginTop: "16px" }}>
          Hospital Alcázar es el centro médico líder en atención sanitaria de
          alta calidad. Estamos comprometidos en brindar una experiencia
          excepcional a nuestros pacientes y sus familias, desde el momento en
          que entran por nuestras puertas hasta el momento en que reciben el
          alta médica. Nuestro equipo de profesionales altamente capacitados
          trabaja sin descanso para garantizar que cada paciente reciba una
          atención personalizada y efectiva.
        </p>
        <hr></hr>
      </Container>

      <Container style={{ marginTop: "32px" }}>
        <Row style={{ marginTop: "32px" }}>
          <Col sm={8}>
            <h2 className="fw-bold" style={{ fontFamily: "candara" }}>
              Atención médica excepcional
            </h2>
            <p className="lead mb-4">
              Nuestra prioridad es la salud y el bienestar de nuestros
              pacientes. Con instalaciones de vanguardia, equipamiento de última
              generación y un enfoque en la innovación médica, estamos
              preparados para manejar una amplia gama de problemas de salud,
              desde procedimientos simples hasta cirugías complejas. Nuestro
              equipo médico multidisciplinario está altamente capacitado y
              experimentado en diversas áreas de especialización, lo que
              garantiza que cada paciente reciba la atención personalizada que
              necesita.
            </p>
          </Col>
          <Col sm={4}>
            <img src={nurseAndPatientImg} alt="img" width="100%" />
          </Col>
        </Row>
        <Row style={{ marginTop: "16px" }}>
          <Col sm={4}>
            <img src={doctorsImg} alt="img" width="100%" />
          </Col>
          <Col sm={8}>
            <h2 className="fw-bold" style={{ fontFamily: "candara" }}>
              Comprometidos con nuestra comunidad
            </h2>
            <p className="lead mb-4">
              Además de nuestras prestaciones médicas, en el Hospital Alcázar
              también nos preocupamos por la educación y el bienestar de nuestra
              comunidad. Ofrecemos programas de formación y capacitación en
              diferentes disciplinas médicas, así como talleres y charlas sobre
              temas de salud para el público en general. También apoyamos a
              organizaciones sin fines de lucro y contribuimos con la promoción
              de la salud en nuestra región. En definitiva, nuestra misión es
              mejorar la calidad de vida de las personas en todo momento y
              lugar.
            </p>
          </Col>
        </Row>

        <Col>
          <h2
            className="fw-bold"
            style={{ fontFamily: "candara", marginTop: "18px" }}
          >
            Nuestras especialidades médicas
          </h2>
          <ul className="lead mb-4">
            <li>Cardiología</li>
            <li>Neumología</li>
            <li>Urología</li>
            <li>Neurología</li>
          </ul>
        </Col>
      </Container>
      <Container
        fluid
        className="text-center text-white bg-dark"
        style={{ marginTop: "48px" }}
      >
        <Container style={{ paddingTop: "16px" }}>
          <Row>
            <Col>
              <h5>Dirección</h5>
              <p>C/ Nikola Tesla nº3</p>
            </Col>
            <Col>
              <h5>Teléfono</h5>
              <p>912 345 678</p>
            </Col>
            <Col>
              <h5>Email</h5>
              <p>contacto@hospitalalcazar.es</p>
            </Col>
          </Row>
        </Container>
      </Container>
      {sessionStorage.getItem("token") !== null ? (
        <ToastContainer
          position="top-end"
          style={{ marginRight: "72px", marginTop: "8px" }}
        >
          <Toast show={showA} onClose={toggleShowA} bg="success">
            <Toast.Header>
              <strong className="me-auto">
                Bienvenido{" "}
                {
                  authenticationService
                    .getUsernameFromToken()
                    .split("@hospitalalcazar.com")[0]
                }
                !
              </strong>
            </Toast.Header>
            <Toast.Body>
              Has iniciado sesión correctamente en el sistema de gestion
              hospitalario
            </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default MainPage;
