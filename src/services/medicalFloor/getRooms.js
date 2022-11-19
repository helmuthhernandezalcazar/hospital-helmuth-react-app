export default function getRooms(medicalFloorId) {
  return fetch(`http://localhost:8080/medicalFloors/${medicalFloorId}/rooms`)
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.rooms;
    });
}
