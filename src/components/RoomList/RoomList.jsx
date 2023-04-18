import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getRooms from "../../services/medicalFloor/getRooms";
import { medicalFloorService } from "../../services/medicalFloor/medicalFloorService";
import RoomCard from "../RoomCard";

const RoomList = () => {
  const { id } = useParams([]);
  const [rooms, setRooms] = useState([]);
  const [medicalFloor, setMedicalFloor] = useState({});
  const [medicalSpecialty, setMedicalSpecialty] = useState({});
  useEffect(() => {
    console.log(id);

    medicalFloorService.getRooms(id).then((rooms) => setRooms(rooms));
  }, []);

  useEffect(() => {
    console.log(id);
    medicalFloorService
      .getById(id)
      .then((medicalFloor) => setMedicalFloor(medicalFloor));
  }, []);

  return (
    <>
      {rooms.length > 0 ? (
        <Container>
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
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default RoomList;
