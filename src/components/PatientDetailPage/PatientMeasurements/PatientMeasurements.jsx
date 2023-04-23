import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../services/authentication/authenticationService";
import getMeasurements from "../../../services/patient/getMeasurements";

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
                  <span>{new Date(measurement.date).toUTCString()}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
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
      />
    </Container>
  );
};

const AddMeasurementForm = (props) => {
  const patientId = props.patientId;
  const [measurementTypes, setMeasurementTypes] = useState([]);
  const [measurementTypeSelected, setMeasurementTypeSelected] = useState({});
  const [response, setResponse] = useState({});
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

  function onSubmit(data) {
    const body = {
      ...data,
      date: new Date(),
      patient: "/patients/" + patientId,
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
      setResponse(response);
      props.refreshTable();
      console.log(response);
    });

    //window.location.reload(false);
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
            Medición
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
            style={{ marginTop: 20 }}
          />
        </Col>
      </Row>
      <Row>
        {response.status === 400 ? (
          <Alert variant="danger">Error</Alert>
        ) : (
          <></>
        )}
      </Row>
    </form>
  );
};
export default PatientMeasurements;
