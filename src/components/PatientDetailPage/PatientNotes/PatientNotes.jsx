import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const PatientNotes = (props) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch(props.notesRef)
      .then((response) => response.json())
      .then((data) => setNotes(data._embedded.notes));
  }, [props.notesRef]);

  return (
    <Container>
      <h2>Notas</h2>
      {notes.map((note, index) => {
        return (
          <Row key={index}>
            <Col>
              <span>{note.note}</span>
              <span>{new Date(note.date).toUTCString()}</span>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default PatientNotes;
