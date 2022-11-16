export default function getRoom(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/room`)
    .then((response) => response.json())
    .then((room) => {
      return room;
    });
}
