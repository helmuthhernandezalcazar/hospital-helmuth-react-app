import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getRooms from "../../services/medicalFloor/getRooms";
import RoomCard from "../RoomCard";

const RoomList = () => {
  const { id } = useParams([]);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getRooms(id).then((rooms) => setRooms(rooms));
  }, [id]);
  return (
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
  );
};

export default RoomList;
