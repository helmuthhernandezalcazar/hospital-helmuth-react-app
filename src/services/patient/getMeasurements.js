import { authenticationService } from "../authentication/authenticationService";

export default function getMeasurements(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/measurements`, {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.measurements;
    });
}
