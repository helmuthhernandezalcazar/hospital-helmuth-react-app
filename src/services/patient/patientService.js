import { authenticationService } from "../authentication/authenticationService";

function getAll(params) {
  return fetch("http://localhost:8080/patients?projection=patientProjection", {
    params,
  });
}
function discharge(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: authenticationService.getSessionToken(),
    },
    body: JSON.stringify({
      dischargeDate: new Date(),
      discharged: true,
      room: null,
    }),
  });
}

function getMeasurements(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/measurements`, {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  });
}

export const patientService = { getAll, discharge, getMeasurements };
