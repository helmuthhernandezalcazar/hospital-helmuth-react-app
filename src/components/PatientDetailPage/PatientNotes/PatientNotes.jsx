import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import { authenticationService } from "../../../services/authentication/authenticationService";
import getNotes from "../../../services/patient/getNotes";

const PatientNotes = (props) => {
  const patientId = props.patientId;
  const [notes, setNotes] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);
  useEffect(() => {
    getNotes(patientId).then((notes) => setNotes(notes));
  }, [refreshToggle]);

  const refreshTable = () => {
    setRefreshToggle(!refreshToggle);
  };
  return (
    <Container>
      <h2>Notas del paciente</h2>
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
      <AddNoteSection patientId={props.patientId} refreshTable={refreshTable} />
    </Container>
  );
};

const AddNoteSection = (props) => {
  const patientId = props.patientId;
  const [response, setResponse] = useState({});
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 2));
    const body = {
      date: new Date(),
      note: data.note,
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

    //window.location.reload(false);
  }
  return (
    <Container>
      <form
        className="form-group shadow p-3 mb-5 bg-body rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <textarea cols={100} {...register("note")}></textarea>
        </div>

        <div>
          <input
            type="submit"
            value="Añadir nota"
            className="btn btn-primary"
          ></input>
        </div>
      </form>
    </Container>
  );
};

export default PatientNotes;
