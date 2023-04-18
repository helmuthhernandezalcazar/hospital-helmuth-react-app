import { authenticationService } from "../authentication/authenticationService";

export default function getRoom(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/room`, {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((room) => {
      return room;
    })
    .catch((error) => {
      return { name: "Sala de espera" };
    });
}
