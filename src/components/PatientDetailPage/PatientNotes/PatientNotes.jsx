import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import { authenticationService } from "../../../services/authentication/authenticationService";
import getNotes from "../../../services/patient/getNotes";

const PatientNotes = (props) => {
  const patientId = props.patientId;
  const [notes, setNotes] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("date,desc");
  const [url, setUrl] = useState(
    `http://localhost:8080/notes/search/findByPatient?patient=/patients/${patientId}&sort=${sort}`
  );
  const [links, setLinks] = useState({});
  const [nextPageDisabled, setNextPageDisabled] = useState(false);
  const [prevPageDisabled, setPrevPageDisabled] = useState(true);
  /*
  useEffect(() => {
    getNotes(patientId).then((notes) =>
      setNotes([...notes].sort((a, b) => b.date.localeCompare(a.date)))
    );
  }, [refreshToggle]);

  */

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
        setNotes(data._embedded.notes);
        setLinks(data._links);
        data._links.next !== undefined
          ? setNextPageDisabled(false)
          : setNextPageDisabled(true);
        data._links.prev !== undefined
          ? setPrevPageDisabled(false)
          : setPrevPageDisabled(true);
      });
  }, [refreshToggle, url]);

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
            <th>Nota</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => {
            return (
              <tr key={index}>
                <td className="col-md-8">
                  <span
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  >
                    {note.note}
                  </span>
                </td>
                <td className="col-md-4">
                  {new Date(note.date).toUTCString()}
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
      <AddNoteSection
        style={{ marginTop: "16px" }}
        patientId={props.patientId}
        refreshTable={refreshTable}
      />
    </Container>
  );
};

const AddNoteSection = (props) => {
  const style = props.style;
  const patientId = props.patientId;
  const [response, setResponse] = useState({});
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 2));
    const body = {
      date: new Date(),
      note: data.note.trim(),
      patient: "/patients/" + patientId,
    };

    console.log(body);
    fetch("http://localhost:8080/notes", {
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

    reset();
  }
  return (
    <Form
      style={style}
      className="form-group shadow p-3 mb-5 bg-body rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>Nueva nota</h3>

      <Form.Group>
        <Form.Control
          as="textarea"
          cols={130}
          {...register("note")}
        ></Form.Control>
      </Form.Group>

      <Form.Group style={{ marginTop: "8px" }}>
        <Button className="float-right" type="submit" variant="primary">
          Añadir
        </Button>
      </Form.Group>
    </Form>
  );
};

export default PatientNotes;
