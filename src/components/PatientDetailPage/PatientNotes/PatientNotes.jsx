import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const PatientNotes = (props) => {
  const notes = props.notes;

  return (
    <Container>
      <h2>Notas del paciente</h2>
      <Table className="table-responsive table-sm align-middle table-edge table-hover table-nowrap mb-0">
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
                <td className="col-md-4">
                  <span>{note.note}</span>
                </td>
                <td className="col-md-8">
                  {new Date(note.date).toUTCString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddNoteSection patientId={props.patientId} />
    </Container>
  );
};

const AddNoteSection = (props) => {
  const patientId = props.patientId;
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
      },
      body: JSON.stringify(body),
    });

    window.location.reload(false);
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
