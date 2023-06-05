import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../services/authentication/authenticationService";
import getMeasurements from "../../../services/patient/getMeasurements";
import { employeeService } from "../../../services/employee/employeeService";

const PatientMeasurements = (props) => {
  const patientId = props.patientId;
  const [measurements, setMeasurements] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [sort, setSort] = useState("date,desc");
  const [links, setLinks] = useState({});
  const [nextPageDisabled, setNextPageDisabled] = useState(false);
  const [prevPageDisabled, setPrevPageDisabled] = useState(true);
  const [measurementTypeSelected, setMeasurementTypeSelected] = useState(
    "/measurementTypes/1"
  );
  const [url, setUrl] = useState(
    `http://localhost:8080/measurements/search/findByPatientAndMeasurementType?patient=/patients/${patientId}&measurementType=${measurementTypeSelected}&projection=measurementProjection&sort=${sort}`
  );

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: authenticationService.getSessionToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMeasurements(data._embedded.measurements);
        setLinks(data._links);
        data._links.next !== undefined
          ? setNextPageDisabled(false)
          : setNextPageDisabled(true);
        data._links.prev !== undefined
          ? setPrevPageDisabled(false)
          : setPrevPageDisabled(true);
      });
  }, [refreshToggle, url]);

  useEffect(() => {
    setUrl(
      `http://localhost:8080/measurements/search/findByPatientAndMeasurementType?patient=/patients/${patientId}&measurementType=${measurementTypeSelected}&projection=measurementProjection&sort=${sort}`
    );
  }, [measurementTypeSelected]);
  const refreshTable = () => {
    setRefreshToggle(!refreshToggle);
  };
  return (
    <Container>
      <Table
        striped
        bordered
        hover
        size="sm"
        className="table-responsive table-sm align-middle table-edge table-hover table-nowrap mb-0"
      >
        <thead>
          <tr>
            <th>Valor</th>
            <th>Unidad</th>
            <th>Tipo de medición</th>
            <th>Empleado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((measurement, index) => {
            return (
              <tr key={index}>
                <td className="col-md-auto">
                  <span>{measurement.measurementValue}</span>
                </td>
                <td>
                  <span>{measurement.measurementTypeUnit}</span>
                </td>
                <td>
                  <span>{measurement.measurementType}</span>
                </td>
                <td>
                  {measurement.employeeEmail.split("@hospitalalcazar.com")[0]}
                </td>
                <td>
                  <span>
                    {new Date(measurement.date).toLocaleString("es-ES")}
                  </span>
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
      <AddMeasurementForm
        patientId={props.patientId}
        setMeasurementTypeSelected={setMeasurementTypeSelected}
        refreshTable={refreshTable}
        discharged={props.discharged}
      />
    </Container>
  );
};

const AddMeasurementForm = (props) => {
  const patientId = props.patientId;
  const [measurementTypes, setMeasurementTypes] = useState([]);
  const [measurementTypeSelected, setMeasurementTypeSelected] = useState({});
  const [errorResponse, setErrorResponse] = useState(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch("http://localhost:8080/measurementTypes", {
      method: "GET",
      headers: {
        Authorization: authenticationService.getSessionToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { _embedded = {} } = data;
        setMeasurementTypes(_embedded.measurementTypes);
      });
  }, []);

  async function onSubmit(data) {
    setErrorResponse(null);
    const loggedEmployee = await employeeService.findEmployeeByEmailOnToken();
    let body = {
      ...data,
      date: new Date(),
      patient: "/patients/" + patientId,
      employee: loggedEmployee._links.self.href,
    };
    if (body.measurementType === "")
      body = {
        ...body,
        measurementType: "http://localhost:8080/measurementTypes/1",
      };
    console.log(body);
    fetch("http://localhost:8080/measurements", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: authenticationService.getSessionToken(),
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (!response.ok) {
        response
          .json()
          .then((responseError) => setErrorResponse(responseError));
      } else {
        setErrorResponse(null);
      }
      props.refreshTable();
    });

    //window.location.reload(false);
  }

  async function getEmployeeRef() {
    const username = authenticationService.getUsernameFromToken();
    return fetch(
      `http://localhost:8080/employees/search/findByEmail?email=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticationService.getSessionToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data._links.self.href);
  }
  function getMeasurementTypeOptions() {
    return measurementTypes.map((type, index) => {
      return (
        <option key={index} value={type._links.self.href}>
          {type.measurementType} ({type.unit})
        </option>
      );
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-group shadow p-3 mb-5 bg-body rounded"
    >
      <Row>
        <Col>
          <label>
            Valor
            <input
              type="text"
              className="form-control"
              {...register("measurementValue")}
            ></input>
          </label>
        </Col>
        <Col>
          <label>
            Tipo
            <select
              onChangeCapture={(e) => {
                props.setMeasurementTypeSelected(e.target.value);
                console.log(e.target.value.split("http://localhost:8080"));
              }}
              name="measurementTypes"
              id="measurementTypeSelectBox"
              className="form-control"
              defaultValue="http://localhost:8080/measurementTypes/1"
              {...register("measurementType")}
            >
              <option value="default" disabled>
                Elegir medición
              </option>
              {getMeasurementTypeOptions()}
            </select>
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="submit"
            className="btn btn-primary"
            value="Añadir"
            disabled={props.discharged}
            style={{ marginTop: 20 }}
          />
          {errorResponse !== null ? (
            <Alert variant="danger" style={{ marginTop: "8px" }}>
              {errorResponse.message}
            </Alert>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row></Row>
      <p> </p>
    </form>
  );
};
export default PatientMeasurements;
