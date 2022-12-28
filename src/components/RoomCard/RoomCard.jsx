import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import getPatient from "../../services/room/getPatient";

const RoomCard = (props) => {
  const id = props.roomId;
  const [room, setRoom] = useState({});
  const [roomPatient, setRoomPatient] = useState({});
  const [roomPatientId, setRoomPatientId] = useState();
  useEffect(() => {
    setRoom(props.room);
  }, [props.room]);

  useEffect(() => {
    getPatient(id).then((patient) => {
      setRoomPatient(patient);
      const links = patient._links;
      const roomPatientId = links.self.href
        .split("http://localhost:8080/patients/")
        .pop();
      setRoomPatientId(roomPatientId);
    });
  }, [id]);

  return (
    <Card style={{ marginTop: "16px" }}>
      <Card.Header as="h3">Habitación: {room.name} </Card.Header>
      <Card.Body>
        <Card.Title>
          Paciente: {roomPatient.firstName} {roomPatient.lastName}
        </Card.Title>
      </Card.Body>
      <Button variant="primary" href={`/paciente/${roomPatientId}`}>
        Ver paciente
      </Button>
    </Card>
  );
};

export default RoomCard;
