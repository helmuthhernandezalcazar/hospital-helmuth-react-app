export default function getPatient(roomId) {
  return fetch(`http://localhost:8080/rooms/${roomId}/patient`)
    .then((response) => response.json())
    .then((patient) => {
      return patient;
    });
}
