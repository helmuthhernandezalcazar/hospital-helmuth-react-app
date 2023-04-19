import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getRooms from "../../services/medicalFloor/getRooms";
import { medicalFloorService } from "../../services/medicalFloor/medicalFloorService";
import RoomCard from "../RoomCard";
import getMedicalSpecialty from "../../services/medicalFloor/getMedicalSpecialty";
import { authenticationService } from "../../services/authentication/authenticationService";

const RoomList = () => {
  const { id } = useParams([]);
  const [rooms, setRooms] = useState([]);
  const [medicalFloor, setMedicalFloor] = useState({});
  const [medicalSpecialty, setMedicalSpecialty] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/medicalFloors/" + id, {
      method: "GET",
      headers: {
        Authorization: authenticationService.getSessionToken(),
      },
    })
      .then((response) => response.json())
      .then((medicalFloor) => setMedicalFloor(medicalFloor));
    getMedicalSpecialty(id).then((medicalSpecialty) =>
      setMedicalSpecialty(medicalSpecialty)
    );
    getRooms(id).then((rooms) => setRooms(rooms));
  }, [id]);

  return (
    <>
      <Container>
        <h1>
          {medicalFloor.name} {medicalSpecialty.name}
        </h1>
        <Row className="row-cols-4">
          {rooms.map((room, index) => {
            const self = room._links.self.href;
            const roomId = self.split("http://localhost:8080/rooms/").pop();
            return (
              <Col key={index}>
                <RoomCard room={room} roomId={roomId} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default RoomList;
