export default function getEmptyRooms() {
  return fetch(`http://localhost:8080/rooms/search/findByPatientNull`)
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.rooms;
    });
}
