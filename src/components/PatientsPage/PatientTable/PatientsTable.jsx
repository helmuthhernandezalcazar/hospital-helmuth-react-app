import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormControl,
  Pagination,
  Row,
  Table,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { authenticationService } from "../../../services/authentication/authenticationService";
import { patientService } from "../../../services/patient/patientService";

const PatientTable = (props) => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [url, setUrl] = useState(
    "http://localhost:8080/patients/search/findByRoomNotNull?projection=patientProjection"
  );
  const [links, setLinks] = useState({});
  const [nextPageDisabled, setNextPageDisabled] = useState(false);
  const [prevPageDisabled, setPrevPageDisabled] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: authenticationService.getSessionToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { size, totalPages, number } = data.page;
        setPatients(data._embedded.patients);
        setPage(number);
        setPageSize(size);
        setTotalPages(totalPages);
        setLinks(data._links);
        console.log(JSON.stringify(data._embedded.patients));
        console.log(
          "pages: " + page,
          " totalPages: " + totalPages,
          " pageSize: " + pageSize,
          " links: " + JSON.stringify(links),
          " url: " + url
        );

        data._links.next !== undefined
          ? setNextPageDisabled(false)
          : setNextPageDisabled(true);
        data._links.prev !== undefined
          ? setPrevPageDisabled(false)
          : setPrevPageDisabled(true);
      });
  }, [props.refreshToggle, url]);

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <ToggleButtonGroup
            type="radio"
            name="filter-buttons"
            defaultValue={"hospitalized"}
            style={{
              paddingBottom: "12px",
              display: "flex",
            }}
          >
            <ToggleButton
              id="toggleHospitalized"
              value={"hospitalized"}
              variant="secondary"
              onClick={() => {
                setUrl(
                  "http://localhost:8080/patients/search/findByRoomNotNull?projection=patientProjection"
                );
              }}
            >
              Hospitalizados
            </ToggleButton>
            <ToggleButton
              id="toggleDischarged"
              value={"discharged"}
              variant="secondary"
              onClick={() => {
                setUrl(
                  "http://localhost:8080/patients/search/findByDischargeDateNotNull?projection=patientProjection"
                );
              }}
            >
              Dados de alta
            </ToggleButton>
            <ToggleButton
              id="toggleWaitingRoom"
              value={"waiting room"}
              variant="secondary"
              onClick={() => {
                setUrl(
                  "http://localhost:8080/patients/search/findByRoomNullAndDischargeDateNull?projection=patientProjection"
                );
              }}
            >
              Sala de espera
            </ToggleButton>
            <ToggleButton
              id="toggleAll"
              value={"all"}
              variant="secondary"
              onClick={() => {
                setUrl(
                  "http://localhost:8080/patients?projection=patientProjection"
                );
              }}
            >
              Todos
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col>
          <Container
            inline
            style={{
              display: "flex",
              justifyContent: "right",
              marginLeft: "8px",
            }}
          >
            <FormControl
              type="text"
              placeholder="Buscar..."
              className="mr-sm-2"
              onChange={(event) => {
                console.log(event.target.value);
                setFilterText(event.target.value);
              }}
            />
            <Button
              type="button"
              variant="outline-primary"
              style={{ marginLeft: "8px" }}
              onClick={() => {
                document.getElementById("toggleAll").click();
                setUrl(
                  `http://localhost:8080/patients/search/findByFirstNameContainsIgnoreCaseOrLastNameContainsIgnoreCaseOrDniContainsIgnoreCase?firstName=${filterText}&lastName=${filterText}&dni=${filterText}&projection=patientProjection`
                );
              }}
            >
              Buscar
            </Button>
          </Container>
        </Col>
      </Row>

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
          {patients.map((patient, index) => {
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
      <Pagination
        size="lg"
        style={{ display: "flex", justifyContent: "right", marginTop: "16px" }}
      >
        <Pagination.Prev
          onClick={() => {
            setUrl(links.prev.href);
            console.log(links.prev.href);
          }}
          disabled={prevPageDisabled}
        ></Pagination.Prev>
        <Pagination.Next
          onClick={() => {
            setUrl(links.next.href);
            console.log(links.next.href);
          }}
          disabled={nextPageDisabled}
        ></Pagination.Next>
      </Pagination>
    </Container>
  );
};

export default PatientTable;
