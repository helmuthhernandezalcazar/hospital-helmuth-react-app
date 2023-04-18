import { authenticationService } from "../authentication/authenticationService";

export default function getTriage(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/triage`, {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((triage) => {
      return triage;
    });
}
