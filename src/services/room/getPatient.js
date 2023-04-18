import { authenticationService } from "../authentication/authenticationService";

export default function getPatient(roomId) {
  return fetch(`http://localhost:8080/rooms/${roomId}/patient`, {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((patient) => {
      return patient;
    });
}
