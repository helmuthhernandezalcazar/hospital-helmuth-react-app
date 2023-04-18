import { authenticationService } from "../authentication/authenticationService";

export default function getNotes(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/notes`, {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.notes;
    });
}
